import type { Hooks } from 'ky';
import { HTTPError } from 'ky';

import { errorResponseSchema } from '@/shared/schemas/error';
import { handleErrorByStatus } from '@/shared/utils/errors/handleErrorByStatus';

/**
 * @description API 에러 응답을 가로채 일관된 메시지 형태로 포맷팅하는 공용 ky 훅
 * @param {HTTPError} error - HTTP 에러 객체. `handleErrorByStatus`를 통해 전역에서 처리할 에러인지 먼저 확인하고 처리합니다.
 * - 서버 응답 형식이 `errorResponseSchema`에 맞지 않을 경우, 에러 메시지는 `[${response.status}] 서버 응답 형식이 올바르지 않습니다.`로 설정되어 서버 응답 형식 자체의 문제로 인한 에러로 처리됩니다.
 * - `response.json()` 처리 중 오류가 발생하여 에러가 발생할 경우 (예: 네트워크 오류, 타임아웃, 유효하지 않은 JSON 응답 등), 다음 로직에 따라 메시지를 포맷합니다:
 * - 콘솔에 상세 에러(err.name 포함)를 로깅하여 디버깅을 돕습니다.
 * - `AbortError` 또는 `Timeout`을 포함하는 에러 이름인 경우, '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.' 메시지로 설정합니다.
 * - 그 외의 파싱/네트워크 오류의 경우, `[${response.status}] ${response.statusText || '서버와 통신 중 오류가 발생했습니다.'}`와 같이 응답 상태를 포함한 일반적인 통신 오류 메시지를 설정합니다. 이때 `response` 객체가 없을 경우를 대비하여 안전하게 처리합니다.
 * @returns {Promise<HTTPError>} - 처리된 HTTP 에러 객체
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
        // ky의 타임아웃 에러는 주로 AbortError 또는 특정 Timeout 관련 이름으로 발생
        if (errorName === 'AbortError' || errorName.includes('Timeout')) {
          error.message =
            '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.';
        } else {
          // 기타 파싱/네트워크 오류의 경우 기존 메시지 사용
          // response 객체가 없을 경우를 대비하여 안전하게 접근
          const statusPart = response ? `[${response.status}] ` : '';
          const statusTextPart = response ? response.statusText || '' : '';
          error.message = `${statusPart}${statusTextPart || '서버와 통신 중 오류가 발생했습니다.'}`;
        }
      }
      return error;
    },
  ],
};
