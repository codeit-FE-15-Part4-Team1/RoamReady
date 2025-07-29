'use client';
import ky, { HTTPError } from 'ky';

import Button from '@/shared/components/Button';
import { BRIDGE_API } from '@/shared/constants/bridgeEndpoints';
import { ERROR_CODES, ROUTES } from '@/shared/constants/routes';
import { useToast } from '@/shared/hooks/useToast';
import { formatErrorResponseHooks } from '@/shared/libs/formatErrorResponseHooks';

const testApiClient = ky.create({
  prefixUrl: BRIDGE_API.PREFIX,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: formatErrorResponseHooks,
  retry: 0,
});

export default function ApiErrorTestPage() {
  const { showError } = useToast();

  const triggerError = async (status: number) => {
    try {
      // API 라우트 경로를 '/api/error-test'로 변경했다고 가정하고 호출합니다.
      // (만약 'src/app/api/test/error/route.ts'로 다시 옮겼다면, 'api/test/error'로 변경)
      await testApiClient.get(`test/error?status=${status}`);
    } catch (error: unknown) {
      // error 타입을 unknown으로 명시
      console.error('[Test Triggered Error]:', error);

      // 401 에러는 미들웨어의 리다이렉트 시나리오를 직접 시뮬레이션합니다.
      if (error instanceof HTTPError && error.response.status === 401) {
        const redirectUrl = new URL(ROUTES.SIGNIN, window.location.origin);
        redirectUrl.searchParams.set('error', ERROR_CODES.SESSION_EXPIRED);
        // window.location.href를 사용하여 직접 리다이렉트합니다.
        // 이는 useRouter가 마운트되지 않았을 때 발생하는 에러를 회피하기 위함입니다.
        window.location.href = redirectUrl.toString();
        return;
      }

      let messageToDisplay = '알 수 없는 오류가 발생했습니다.'; // 기본 폴백 메시지

      // HTTPError 인스턴스일 경우에만 상태 코드를 확인하여 토스트 표시 여부를 결정합니다.
      if (error instanceof HTTPError) {
        const statusCode = error.response.status;

        // 5xx 에러는 handleErrorByStatus에서 이미 토스트를 띄우므로, 여기서는 추가 토스트를 띄우지 않습니다.
        if (statusCode >= 500 && statusCode < 600) {
          return;
        } else if (statusCode === 401) {
          return;
        }
        // 그 외의 HTTP 에러 (예: 400, 404, 409)는 HTTPError의 메시지를 사용
        messageToDisplay = error.message;
      }
      // HTTPError가 아니고 일반 Error 인스턴스일 경우
      else if (error instanceof Error) {
        messageToDisplay = error.message;
      }
      // 그 외 알 수 없는 타입의 에러는 기본 폴백 메시지 사용

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
