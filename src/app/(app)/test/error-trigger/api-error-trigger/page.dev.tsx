'use client';
import ky, { HTTPError } from 'ky';

import Button from '@/shared/components/Button';
import { BRIDGE_API } from '@/shared/constants/bridgeEndpoints';
import { ERROR_CODES, ROUTES } from '@/shared/constants/routes';
import { useToast } from '@/shared/hooks/useToast';
import { formatErrorResponseHooks } from '@/shared/libs/formatErrorResponseHooks';

/**
 * @description
 * 테스트용 API 클라이언트 인스턴스입니다.
 * `ky` 라이브러리를 직접 사용하여 `/api` 접두사를 가지는 별도의 클라이언트 인스턴스를 생성합니다.
 * `BRIDGE_API.PREFIX`를 `prefixUrl`로 설정하여 Next.js의 API 라우트(`api/error-test` 등)로 요청이 올바르게 전달되도록 합니다.
 * `formatErrorResponseHooks`를 적용하여 API 응답 에러 포맷팅 로직을 함께 테스트합니다.
 * `retry: 0`으로 설정하여 에러 발생 시 재시도를 방지하고, 토스트 메시지 중복 표시를 막습니다.
 */
const testApiClient = ky.create({
  prefixUrl: BRIDGE_API.PREFIX,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: formatErrorResponseHooks,
  retry: 0,
});

/**
 * @component ApiErrorTestPage
 * @description
 * 다양한 HTTP 상태 코드에 따른 API 에러 처리 로직을 테스트하기 위한 클라이언트 컴포넌트입니다.
 * 이 페이지는 의도적으로 특정 에러를 발생시켜 애플리케이션의 전역 및 개별 에러 핸들링이
 * 올바르게 작동하는지 검증하는 데 사용됩니다.
 *
 * @feature
 * - **에러 트리거 함수 (`triggerError`)**:
 * - 특정 HTTP 상태 코드(401, 409, 500)를 인자로 받아 `testApiClient`를 통해 `/api/error-test` API를 호출합니다.
 * - 이 API는 서버에서 해당 상태 코드를 반환하도록 의도적으로 설계되었습니다.
 * - **에러 처리 시나리오 테스트**:
 * - **401 (Unauthorized) 에러**:
 * - 미들웨어의 `refreshToken` 갱신 실패 시나리오를 시뮬레이션합니다.
 * - `window.location.href`를 사용하여 로그인 페이지(`ROUTES.SIGNIN`)로 직접 리다이렉트하며, `error=session_expired` 쿼리 파라미터를 추가합니다.
 * - 이 페이지에서는 토스트를 띄우지 않고, 리다이렉트된 로그인 페이지에서 토스트 메시지가 표시됩니다.
 * - **409 (Conflict) 에러**:
 * - `formatErrorResponseHooks`에 의해 에러 메시지가 가공된 후, `catch` 블록에서 `showError`를 호출하여 사용자 친화적인 토스트 메시지를 표시합니다. (예: 이메일 중복)
 * - **500 (Internal Server Error) 에러**:
 * - `formatErrorResponseHooks`를 통해 `getErrorMessageByStatus` (전역 에러 핸들러)가 호출되어 토스트 메시지를 표시합니다.
 * - `testApiClient`의 `retry: 0` 설정 덕분에 토스트 중복 표시가 발생하지 않습니다.
 * - **기타 에러**:
 * - `HTTPError` 인스턴스가 아니거나, 위에서 명시적으로 처리되지 않은 HTTP 에러(예: 400, 404)의 경우, `formatErrorResponseHooks`에서 가공된 메시지를 `showError`를 통해 토스트로 표시합니다.
 */
export default function ApiErrorTestPage() {
  const { showError } = useToast();

  const triggerError = async (status: number) => {
    try {
      await testApiClient.get(`test/error?status=${status}`);
    } catch (error: unknown) {
      console.error('[Test Triggered Error]:', error);

      if (error instanceof HTTPError && error.response.status === 401) {
        const redirectUrl = new URL(ROUTES.SIGNIN, window.location.origin);
        redirectUrl.searchParams.set('error', ERROR_CODES.SESSION_EXPIRED);
        window.location.href = redirectUrl.toString();
        return;
      }

      let messageToDisplay = '알 수 없는 오류가 발생했습니다.';

      if (error instanceof HTTPError) {
        const statusCode = error.response.status;

        if (statusCode >= 500 && statusCode < 600) {
          return;
        } else if (statusCode === 401) {
          return;
        }

        messageToDisplay = error.message;
      } else if (error instanceof Error) {
        messageToDisplay = error.message;
      }

      showError(messageToDisplay);
    }
  };

  return (
    <div className='font-size-20 flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-100'>
      <h1>API 에러 테스트</h1>
      <Button onClick={() => triggerError(401)}>
        401 에러 (강제 로그아웃 - 미들웨어 처리 확인)
      </Button>
      <Button onClick={() => triggerError(409)}>
        409 에러 (개별 처리 대상 - 이메일 중복 등)
      </Button>
      <Button onClick={() => triggerError(500)}>500 에러 (서버 에러)</Button>
    </div>
  );
}
