import type { Hooks } from 'ky';
import { HTTPError } from 'ky';

import { errorResponseSchema } from '@/shared/schemas/error';
import { handleErrorByStatus } from '@/shared/utils/errors/handleErrorByStatus';

/**
 * @description API 에러 응답을 가로채 일관된 메시지 형태로 포맷팅하는 공용 ky 훅입니다.
 * 이 훅은 `ky` 요청 실패 시 호출되어 에러 메시지를 사용자 친화적인 형태로 가공하고,
 * 특정 에러 상태에 대해 전역적인 처리를 위임합니다.
 *
 * @param {HTTPError} error - `ky` 라이브러리에서 발생한 HTTP 에러 객체입니다.
 * `handleErrorByStatus`를 통해 전역적으로 처리할 에러인지 먼저 확인하고 처리됩니다.
 *
 * @details
 * - **서버 응답 형식 유효성 검사**: 서버 응답을 JSON으로 파싱한 후 `errorResponseSchema`를 사용하여 유효성을 검사합니다.
 * - `parsedError.success`가 `true`인 경우: `parsedError.data.message`에 있는 서버 정의 에러 메시지를 `error.message`에 할당합니다.
 * - `parsedError.success`가 `false`인 경우: `[${response.status}] 서버 응답 형식이 올바르지 않습니다.`라는 메시지를 설정하여 서버 응답 형식 자체에 문제가 있음을 알립니다.
 * - **네트워크 및 파싱 오류 처리**: `response.json()` 처리 중 오류가 발생할 경우(예: 네트워크 연결 끊김, 타임아웃, 유효하지 않은 JSON 응답 등) `catch` 블록에서 에러를 처리합니다.
 * - 개발자 콘솔에 상세 에러(err.name 포함)를 로깅하여 디버깅을 돕습니다.
 * - 에러 이름이 `AbortError` 또는 `Timeout`을 포함하는 경우: '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.'라는 사용자 친화적인 타임아웃 메시지를 설정합니다.
 * - 그 외의 파싱 또는 네트워크 오류의 경우: `[${response.status}] ${response.statusText || '서버와 통신 중 오류가 발생했습니다.'}`와 같이 응답 상태를 포함한 일반적인 통신 오류 메시지를 설정합니다. 이때 `response` 객체가 없을 경우를 대비하여 안전하게 처리합니다.
 *
 * @returns {Promise<HTTPError>} - 처리되고 메시지가 포맷팅된 HTTP 에러 객체를 반환합니다.
 */
export const formatErrorResponseHooks: Hooks = {
  beforeError: [
    async (error: HTTPError) => {
      handleErrorByStatus(error);

      const { response } = error;
      try {
        const errorData = await response.json();
        const parsedError = errorResponseSchema.safeParse(errorData);

        if (parsedError.success) {
          error.message = parsedError.data.message;
        } else {
          error.message = `[${response.status}] 서버 응답 형식이 올바르지 않습니다.`;
        }
      } catch (err: unknown) {
        const errorName = err instanceof Error ? err.name : 'UnknownError';
        console.error(`API Response Parsing Error [${errorName}]:`, err);

        if (errorName === 'AbortError' || errorName.includes('Timeout')) {
          error.message =
            '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.';
        } else {
          const statusPart = response ? `[${response.status}] ` : '';
          const statusTextPart = response ? response.statusText || '' : '';
          error.message = `${statusPart}${statusTextPart || '서버와 통신 중 오류가 발생했습니다.'}`;
        }
      }
      return error;
    },
  ],
};
