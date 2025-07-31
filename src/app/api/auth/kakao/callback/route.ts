import { NextRequest, NextResponse } from 'next/server';

import type { OAuthResponse } from '@/domain/Auth/schemas/response';
import { authResponseSchema } from '@/domain/Auth/schemas/response';
import setAuthCookies from '@/domain/Auth/utils/setAuthCookies';
import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { ERROR_CODES, ROUTES } from '@/shared/constants/routes';

/**
 * @file /api/auth/kakao/callback/route.ts
 * @description 카카오 인증 후 리다이렉트되는 콜백을 처리하고, 로그인 또는 자동 회원가입을 수행하는 API 라우트입니다.
 *
 * ### 주요 로직:
 * 1.  카카오로부터 받은 `code`(인증 코드)로 백엔드에 **로그인을 먼저 시도**합니다.
 * 2.  백엔드가 성공적으로 응답하면, **Zod 스키마로 데이터 형식을 검증**합니다. 검증 성공 시 토큰을 쿠키에 저장하고 메인 페이지로 리다이렉트합니다.
 * 3.  백엔드가 "가입되지 않은 사용자"라는 의미의 `404 Not Found` 에러를 반환하면, `catch` 블록이 이를 감지하고 **자동으로 회원가입을 이어서 시도**합니다.
 * 4.  회원가입이 성공하면, 응답 데이터를 **Zod로 검증**하고 토큰을 쿠키에 저장한 뒤 메인 페이지로 리다이렉트합니다.
 * 5.  그 외 모든 에러(유효하지 않은 코드, 서버 오류, Zod 검증 실패 등)는 로그인 실패로 간주하고 로그인 페이지로 리다이렉트합니다.
 *
 * ### 에러 처리 방식 (리디렉션과 에러 URL)
 * 이 핸들러는 전체 페이지 이동(리디렉션) 과정의 일부이므로, 에러 발생 시 JSON을 반환하는 대신 UI가 있는 페이지로 사용자를 다시 보내야 합니다.
 * 이때 "어떤 에러 때문에 돌아왔는지"를 URL 쿼리 파라미터(`?error=...`)에 담아 전달합니다.
 * `catch` 블록은 로그인 시도 중 발생한 에러를 처리하며, 다음과 같이 동작합니다.
 * - **404 (Not Found)**: 가입되지 않은 사용자로 판단하고, 자동으로 회원가입을 시도합니다. 회원가입마저 실패하면 최종 실패로 처리됩니다.
 * - **default**: 그 외 모든 에러(카카오 인증 실패, 서버 오류 등)는 최종적으로 로그인 페이지로 리디렉션하여 실패를 알립니다.
 *
 * ### 토스트 처리 흐름
 * 1. **서버 (현재 파일)**: 최종적으로 에러 발생 시 `?error=oauth_kakao_failed`와 같은 쿼리 파라미터를 포함하여 로그인 페이지로 리디렉션합니다.
 * 2. **클라이언트 (리디렉션된 페이지)**: 로그인 페이지(`signin/page.tsx`)는 페이지 로드 시 URL의 에러 파라미터를 읽습니다.
 * 3. **클라이언트 (토스트 실행)**: 해당 에러 코드에 맞는 메시지(예: "카카오 로그인에 실패했습니다.")를 `useToast` 훅을 사용하여 사용자에게 보여줍니다.
 *
 * @param {NextRequest} request - Next.js가 받는 요청 객체
 * @returns {Promise<NextResponse>} 처리 결과에 따른 리다이렉트 응답
 */
export async function GET(request: NextRequest) {
  const authCode = request.nextUrl.searchParams.get('code');

  if (!authCode) {
    const redirectUrl = new URL(
      `${ROUTES.SIGNIN}?error=${ERROR_CODES.OAUTH_KAKAO_FAILED}`,
      request.url,
    );
    return NextResponse.redirect(redirectUrl);
  }

  try {
    const signInRes = await fetch(
      `${process.env.API_BASE_URL}${API_ENDPOINTS.OAUTH.SIGNIN_PROVIDER('kakao')}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: authCode,
          redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
        }),
      },
    );

    if (!signInRes.ok) {
      const errorBody = await signInRes.json();
      throw Object.assign(new Error(errorBody.message || '로그인 실패'), {
        status: signInRes.status,
      });
    }

    const responseBody = await signInRes.json();
    const validatedData: OAuthResponse = authResponseSchema.parse(responseBody);
    const { accessToken, refreshToken } = validatedData;

    const redirectResponse = NextResponse.redirect(
      new URL(ROUTES.ACTIVITIES.ROOT, request.url),
    );
    setAuthCookies(redirectResponse, { accessToken, refreshToken });
    return redirectResponse;
  } catch (error: unknown) {
    const errorStatus =
      error instanceof Error && 'status' in error
        ? (error as { status: number }).status
        : 500;

    if (errorStatus === 404) {
      try {
        const arbitraryNickname = `KakaoUser_${Date.now().toString().slice(-6)}`;
        const signUpRes = await fetch(
          `${process.env.API_BASE_URL}${API_ENDPOINTS.OAUTH.SIGNUP_PROVIDER('kakao')}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token: authCode,
              nickname: arbitraryNickname,
              redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
            }),
          },
        );

        if (!signUpRes.ok) {
          const errorBody = await signUpRes.json();
          throw new Error(errorBody.message || '회원가입에 실패했습니다.');
        }

        const responseBody = await signUpRes.json();
        const validatedData: OAuthResponse =
          authResponseSchema.parse(responseBody);
        const { accessToken, refreshToken } = validatedData;

        const redirectResponse = NextResponse.redirect(
          new URL(ROUTES.ACTIVITIES.ROOT, request.url),
        );
        setAuthCookies(redirectResponse, { accessToken, refreshToken });
        return redirectResponse;
      } catch (signupError) {
        console.error('[Kakao Signup Error]', signupError);
      }
    }

    console.error('[Kakao Callback Error]', error);
    const redirectUrl = new URL(
      `${ROUTES.SIGNIN}?error=${ERROR_CODES.OAUTH_KAKAO_FAILED}`,
      request.url,
    );
    return NextResponse.redirect(redirectUrl);
  }
}
