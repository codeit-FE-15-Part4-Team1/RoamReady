import type { Hooks } from 'ky';
import { HTTPError } from 'ky';

import { ERROR_CODES, ROUTES } from '@/shared/constants/routes';
import { queryClient } from '@/shared/libs/queryClient';
import { errorResponseSchema } from '@/shared/schemas/error';
import { useRoamReadyStore } from '@/shared/store';
import getErrorMessageByStatus from '@/shared/utils/errors/getErrorMessageByStatus';

const beforeErrorHook = async (error: HTTPError) => {
  const { response } = error;
  const protectedPageRoutes = [ROUTES.MYPAGE.ROOT];
  let formattedMessage = null;

  if (response.status === 401) {
    console.error('클라이언트 측에서 401 에러 감지. 세션이 만료되었습니다.');
    const { clearUser } = useRoamReadyStore.getState();
    clearUser();

    queryClient.invalidateQueries({ queryKey: ['user', 'me'] });

    const currentPathname = window.location.pathname;
    const isCurrentlyOnProtectedPage = protectedPageRoutes.some((route) =>
      currentPathname.startsWith(route),
    );

    if (response.status === 401 && isCurrentlyOnProtectedPage) {
      console.error(
        '클라이언트 측에서 401 에러 감지. 보호된 페이지에서 세션이 만료되었습니다.',
      );
      const redirectUrl = new URL(
        ROUTES.ACTIVITIES.ROOT,
        window.location.origin,
      );
      redirectUrl.searchParams.set('error', ERROR_CODES.SESSION_EXPIRED);
      window.location.href = redirectUrl.toString();
    }
  }

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
};

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
 * 3. **인증 에러(`401`) 전역 처리**:
 * - API 요청이 `401 Unauthorized`를 반환하면, 클라이언트의 전역 사용자 상태(`useRoamReadyStore`)를 즉시 초기화하여 헤더 UI가 로그아웃 상태로 변경되도록 합니다.
 * - 또한, 현재 페이지가 `mypage`와 같은 보호된 라우트일 경우, 사용자를 메인 페이지로 리디렉션하여 세션 만료를 알립니다.
 *
 * @param {HTTPError} error - `ky` 라이브러리에서 발생한 HTTP 에러 객체입니다.
 * @returns {Promise<HTTPError>} - 처리되고 메시지가 포맷팅된 HTTP 에러 객체를 반환합니다.
 */
export const formatErrorResponseHooks: Hooks = {
  beforeError: [beforeErrorHook],
};
