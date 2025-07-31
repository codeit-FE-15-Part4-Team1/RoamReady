import type { NextRequest } from 'next/server';

import { signupRequestSchema } from '@/domain/Auth/schemas/request';
import handleSignin from '@/domain/Auth/utils/handleSignin';
import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { handleApiError } from '@/shared/utils/errors/handleApiError';

/**
 * @file /api/auth/signup/route.ts
 * @description 클라이언트의 회원가입 요청을 처리하고, 성공 시 자동 로그인시키는 API 라우트 핸들러입니다.
 * @see /src/app/(auth)/signup/page.tsx - 이 API를 호출하는 클라이언트 페이지
 * @see /src/shared/constants/endpoints.ts - `API_ENDPOINTS` 상수 정의
 *
 * @description
 * 클라이언트의 회원가입 요청을 BFF(Backend for Frontend) 서버에서 처리합니다.
 * 백엔드 API가 회원가입 시 토큰을 반환하지 않으므로, 회원가입 성공 후 즉시 로그인 API를 호출하여 토큰을 받아옵니다.
 *
 * ### 주요 로직:
 * 1.  클라이언트로부터 받은 `email`, `password`, `nickname`의 유효성을 Zod 스키마로 검사합니다.
 * 2.  유효한 데이터로 백엔드 서버에 회원가입을 요청합니다.
 * 3.  회원가입이 성공하면, 회원가입 시 사용했던 정보로 즉시 백엔드 로그인 API를 호출합니다.
 * 4.  로그인 API로부터 받은 `accessToken`과 `refreshToken`을 안전한 `HttpOnly` 쿠키로 설정하여 사용자에게 즉시 로그인 상태를 제공합니다.
 * 5.  최종적으로 클라이언트에는 사용자 정보(`user`)를 반환합니다.
 *
 * ### 에러 처리 흐름:
 * - 모든 로직은 `try...catch` 블록으로 감싸져 있어, 어떤 단계에서든 에러 발생 시 일관된 JSON 에러를 반환합니다.
 * - **유효성 검사 실패**: `signupRequestSchema.parse()`에서 Zod 유효성 검사에 실패하면,
 * `catch` 블록이 이를 `z.ZodError`로 인지하여 `400 Bad Request` 상태 코드와 함께 구체적인 에러 메시지를 반환합니다.
 * - **백엔드 API 에러**: 백엔드 서버가 `4xx` 또는 `5xx` 상태 코드로 응답하면, 해당 에러 정보(`message`, `status`)를 담은 에러를 던집니다(`throw`).
 * `catch` 블록은 이 에러를 받아 클라이언트에게 동일한 상태 코드와 메시지로 전달합니다.
 * - **기타 서버 오류**: 그 외 예상치 못한 모든 에러는 `500 Internal Server Error`로 처리됩니다.
 *
 * ### 전체 에러 전파 과정 (End-to-End):
 * 1.  **API 라우트 (현재 파일)**: `return NextResponse.json({ message: '...' }, { status: 409 })`와 같이 표준화된 JSON 에러 응답을 클라이언트에게 보냅니다.
 * 2.  **`authApiClient` (클라이언트)**: 이 409 에러 응답을 받고, `ky` 라이브러리가 `HTTPError`를 던집니다(throw).
 * 3.  **`formatErrorResponseHooks` (클라이언트)**: 던져진 `HTTPError`를 가로채, 응답 본문의 `{ message: '...' }`를 파싱하여 `error.message`를 "이미 사용 중인 이메일입니다."와 같이 사용자 친화적으로 가공합니다.
 * 4.  **`signup` 서비스 함수 (클라이언트)**: `authApiClient`가 에러를 던졌기 때문에, 이 함수가 반환하는 `Promise`는 실패(reject) 상태가 됩니다.
 * 5.  **`useSignupMutation` (클라이언트)**: `mutationFn`으로 전달된 `signup` 함수가 실패했음을 감지하고, `onError` 콜백을 실행합니다.
 * 6.  **`onError` 콜백**: 바로 이곳에서 `toast.show(error.message, { type: 'error' })` 코드가 실행되어, 최종적으로 사용자에게 토스트 메시지가 보이게 됩니다.
 *
 * @param {NextRequest} request - 클라이언트의 요청 객체. `email`, `password`, `nickname`을 포함합니다.
 * @returns {Promise<NextResponse>} 처리 결과에 따른 응답 객체.
 */
export default async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedBody = signupRequestSchema.parse(body);

    const signupApiResponse = await fetch(
      `${process.env.API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNUP}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedBody),
      },
    );

    if (!signupApiResponse.ok) {
      const errorBody = await signupApiResponse.json();
      throw Object.assign(
        new Error(errorBody.message || '회원가입에 실패했습니다.'),
        { status: signupApiResponse.status },
      );
    }

    const signinResponse = await handleSignin({
      email: validatedBody.email,
      password: validatedBody.password,
    });

    return signinResponse;
  } catch (error) {
    return handleApiError(error, 'Signup');
  }
}
