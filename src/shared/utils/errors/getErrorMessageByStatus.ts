import { HTTPError } from 'ky';

/**
 * @description HTTP 상태 코드에 따라 전역적으로 특정 에러(403, 5xx)에 대한 사용자 친화적인 메시지를 반환합니다.
 * 이 함수는 주로 서버 응답 메시지가 없거나, 서버 측 에러 메시지를 사용자에게 그대로 노출하기 부적절한 경우에 사용됩니다.
 * UI 로직에 대한 의존성이 없이 순수하게 에러 메시지를 생성하는 역할만 수행합니다.
 * @details
 * - 403 (Forbidden): '이 작업을 수행할 권한이 없습니다.'라는 메시지를 반환합니다.
 * - 500, 502, 503, 504 (Server Errors): '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'라는 메시지를 반환합니다.
 * - 그 외의 에러(예: 400, 404, 409)는 `switch` 문의 `default` 케이스로 분류되며, `null`을 반환하여
 * 각 API를 호출하는 useMutation 또는 useQuery 훅의 onError 콜백에서 구체적인 UI 피드백을 제공하도록 위임합니다.
 * - **참고 (401 Unauthorized)**: 401 에러는 미들웨어(`middleware.ts`)에서 `refreshToken` 갱신이 실패했을 경우 직접 로그인 페이지로 리다이렉트하여 처리됩니다. 따라서 이 함수에서는 401 에러를 직접 처리하지 않습니다.
 * @param {HTTPError} error - ky 라이브러리의 HTTPError 객체
 * @returns {string | null} - 상태 코드에 맞는 에러 메시지(`string`) 또는 메시지가 필요 없는 경우(`null`)
 */
const getErrorMessageByStatus = (error: HTTPError): string | null => {
  const status = error.response.status;

  switch (status) {
    case 403:
      return '이 작업을 수행할 권한이 없습니다.';
    case 500:
    case 502:
    case 503:
    case 504:
      return '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
    default:
      return null;
  }
};

export default getErrorMessageByStatus;
