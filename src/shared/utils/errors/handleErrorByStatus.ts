import { HTTPError } from 'ky';

import { ROUTES } from '@/shared/constants/routes';
import type { ToastSlice } from '@/shared/slices/toastSlice';
import { useRoamReadyStore } from '@/shared/store';

/**
 * @description HTTP 상태 코드에 따라 전역적으로 특정 에러(401, 403, 5xx)를 판별하고 처리합니다.
 * - 401 (Unauthorized): 미들웨어가 처리하지 못한 최종 401 에러는 세션 만료로 간주하며, 사용자에게 토스트 메시지를 표시하고 로그인 페이지로 리다이렉트합니다.
 * - 403 (Forbidden): 이 작업을 수행할 권한이 없음을 알리는 토스트 메시지를 표시합니다.
 * - 500, 502, 503, 504 (Server Errors): 서버에 문제가 발생했음을 알리고 잠시 후 다시 시도해달라는 토스트 메시지를 표시합니다.
 * - 그 외의 에러(예: 400, 404, 409)는 여기서 처리하지 않고, 각 상황에 맞는 UI 피드백이 필요한 경우 개별 useMutation의 onError 등에서 처리되도록 합니다.
 * @param {HTTPError} error - ky 라이브러리의 HTTPError 객체
 * @returns {void}
 */
export const handleErrorByStatus = (error: HTTPError): void => {
  const status = error.response.status;
  const { addToast } = useRoamReadyStore.getState() as ToastSlice;

  switch (status) {
    case 401:
      addToast({
        message: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.',
        type: 'error',
      });
      window.location.href = ROUTES.SIGNIN;
      break;

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
