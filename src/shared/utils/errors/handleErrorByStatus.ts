import { HTTPError } from 'ky';

import type { ToastSlice } from '@/shared/slices/toastSlice';
import { useRoamReadyStore } from '@/shared/store';

/**
 * @description HTTP 상태 코드에 따라 전역적으로 특정 에러(401, 403, 5xx)를 판별하고 처리합니다.
 * @details
 * - 403 (Forbidden): 이 작업을 수행할 권한이 없음을 알리는 토스트 메시지를 표시합니다.
 * - 500, 502, 503, 504 (Server Errors): 서버에 문제가 발생했음을 알리고 잠시 후 다시 시도해달라는 토스트 메시지를 표시합니다.
 * - 그 외의 에러(예: 400, 404, 409)는 `switch` 문의 `default` 케이스로 분류됩니다.
 * 이러한 에러는 각 API를 호출하는 useMutation 또는 useQuery 훅의 onError 콜백에서 해당 상황에 맞는 구체적인 UI 피드백을 제공하도록 위임됩니다.
 * - **참고 (401 Unauthorized)**: 401 에러는 미들웨어(`middleware.ts`)에서 `refreshToken` 갱신이 실패했을 경우 직접 로그인 페이지로 리다이렉트하여 처리됩니다. 따라서 이 함수에서는 401 에러를 직접 처리하지 않습니다.
 * @param {HTTPError} error - ky 라이브러리의 HTTPError 객체
 * @returns {void}
 */
export const handleErrorByStatus = (error: HTTPError): void => {
  const status = error.response.status;
  const { addToast } = useRoamReadyStore.getState() as ToastSlice;

  switch (status) {
    case 403:
      addToast({ message: '이 작업을 수행할 권한이 없습니다.', type: 'error' });
      break;

    case 500:
    case 502:
    case 503:
    case 504:
      addToast({
        message: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
        type: 'error',
      });
      break;

    default:
      break;
  }
};
