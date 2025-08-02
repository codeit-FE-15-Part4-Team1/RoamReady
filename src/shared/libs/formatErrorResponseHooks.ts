import type { Hooks } from 'ky';
import { HTTPError } from 'ky';

import { errorResponseSchema } from '@/shared/schemas/error';
import getErrorMessageByStatus from '@/shared/utils/errors/getErrorMessageByStatus';

/**
 * @description API 에러 응답을 가로채 사용자 친화적인 메시지로 포맷팅하고 전역적으로 토스트를 표시하는 공용 `ky` 훅입니다.
 * 이 훅은 `ky` 요청 실패 시 호출되어 다음과 같은 로직으로 에러를 처리합니다.
 *
 * @details
 * 1. **서버 응답 파싱 및 메시지 우선순위**:
 * - 서버 응답이 유효한 JSON 형식일 경우: 서버에서 제공하는 `parsedError.data.message`를 기본 메시지로 사용합니다.
 * - 응답 형식이 올바르지 않거나 JSON이 아닐 경우: 파싱 오류에 대한 일반적인 메시지를 설정합니다.
 * - `getErrorMessageByStatus` 함수를 통해 `403` 또는 `5xx`와 같이 미리 정의된 공통 메시지가 있는 경우, 이를 서버 응답 메시지보다 우선하여 최종 메시지로 결정합니다.
 *
 * 2. **네트워크 및 기타 오류 처리**:
 * - `response.json()` 처리 중 발생할 수 있는 네트워크 오류(타임아웃, 연결 끊김 등)를 `catch` 블록에서 처리합니다.
 * - `AbortError` 또는 `Timeout`과 같은 네트워크 오류 발생 시: '요청 시간이 초과되었습니다.'라는 사용자 친화적인 메시지를 설정합니다.
 * - 그 외의 파싱 오류 또는 네트워크 오류의 경우: 응답 상태를 포함한 일반적인 통신 오류 메시지를 설정합니다.
 *
 * @param {HTTPError} error - `ky` 라이브러리에서 발생한 HTTP 에러 객체입니다.
 * @returns {Promise<HTTPError>} - 처리되고 메시지가 포맷팅된 HTTP 에러 객체를 반환합니다.
 */
export const formatErrorResponseHooks: Hooks = {
  beforeError: [
    async (error: HTTPError) => {
      const { response } = error;
      let formattedMessage = null;

      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          const parsedError = errorResponseSchema.safeParse(errorData);

          if (parsedError.success) {
            formattedMessage = parsedError.data.message;
          } else {
            formattedMessage = `[${response.status}] 서버 응답 형식이 올바르지 않습니다.`;
          }
        } else {
          formattedMessage = `[${response.status}] 서버에서 예상치 않은 응답을 받았습니다.`;
        }
      } catch (err: unknown) {
        const errorName = err instanceof Error ? err.name : 'UnknownError';
        console.error(`API Response Parsing Error [${errorName}]:`, err);

        if (errorName === 'AbortError' || errorName.includes('Timeout')) {
          formattedMessage =
            '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.';
        } else {
          const statusPart = response ? `[${response.status}] ` : '';
          const statusTextPart = response ? response.statusText || '' : '';
          formattedMessage = `${statusPart}${statusTextPart || '서버와 통신 중 오류가 발생했습니다.'}`;
        }
      }

      const commonErrorMessage = getErrorMessageByStatus(error);
      if (commonErrorMessage) {
        formattedMessage = commonErrorMessage;
      }

      error.message = formattedMessage || error.message;

      return error;
    },
  ],
};
