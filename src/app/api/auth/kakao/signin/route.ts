import { NextRequest, NextResponse } from 'next/server';

import {
  OAuthResponse,
  oauthResponseSchema,
} from '@/domain/Auth/schemas/response';
import setAuthCookies from '@/domain/Auth/utils/setAuthCookies';
import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { ERROR_CODES, ROUTES } from '@/shared/constants/routes';

/**
 * @function handleOauthSignIn
 * @description OAuth 로그인을 처리하는 헬퍼 함수입니다. 백엔드 서버에 카카오 인가 코드를 전달하여 로그인을 시도합니다.
 * @param {string} kakaoAuthCode - 카카오로부터 받은 인가 코드.
 * @returns {Promise<OAuthSigninResponse>} 성공 시, Zod 스키마로 유효성이 검증된 사용자 정보와 토큰을 포함한 응답 객체를 반환합니다.
 * @throws {Error} 백엔드 API 요청이 실패하거나(예: 404 Not Found) 응답 데이터의 형식이 스키마와 일치하지 않을 경우, `status` 속성이 추가된 에러를 던집니다.
 */
async function handleOauthSignIn(
  kakaoAuthCode: string,
): Promise<OAuthResponse> {
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_SIGNIN_REDIRECT_URI;
  if (!redirectUri) {
    throw new Error(
      'NEXT_PUBLIC_KAKAO_SIGNIN_REDIRECT_URI가 설정되지 않았습니다.',
    );
  }

  const signInRes = await fetch(
    `${process.env.API_BASE_URL}${API_ENDPOINTS.OAUTH.SIGNIN_PROVIDER('kakao')}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: kakaoAuthCode,
        redirectUri,
      }),
    },
  );

  const responseData = await signInRes.json();
  if (!signInRes.ok) {
    throw Object.assign(
      new Error(responseData.message || '로그인에 실패했습니다.'),
      {
        status: signInRes.status,
      },
    );
  }
  return oauthResponseSchema.parse(responseData);
}

/**
 * @function GET
 * @description
 * 카카오 OAuth 로그인 콜백을 처리하는 GET 요청 핸들러입니다.
 *
 * 1. 쿼리 파라미터에서 카카오 인가 코드(`code`)를 추출합니다.
 * 2. 해당 코드를 백엔드로 전달하여 로그인 처리를 시도합니다.
 * 3. 성공 시 발급받은 토큰을 쿠키에 저장한 뒤 메인 페이지(`/activities`)로 리디렉션합니다.
 *
 * ### 에러 처리 및 리디렉션
 * - 인가 코드가 누락되었거나, 백엔드 응답이 실패한 경우 적절한 에러 페이지로 리디렉션합니다.
 * - 백엔드가 403 또는 404를 반환한 경우 → 아직 회원가입이 되지 않은 사용자로 간주하고 `/signup` 페이지로 리디렉션합니다.
 * - 그 외 모든 에러는 `/signin` 페이지로 리디렉션하며, URL 쿼리로 `error`, `message`를 함께 전달해 클라이언트에서 토스트로 처리할 수 있도록 합니다.
 *
 * ### 클라이언트에서의 토스트 처리 흐름
 * 1. 서버에서 발생한 에러 메시지를 URL 쿼리 파라미터(`?error=...&message=...`)에 담아 전달합니다.
 * 2. 클라이언트 로그인 폼 컴포넌트(`SignInForm`)가 URL을 읽고 적절한 메시지를 토스트로 표시합니다.
 *
 * @param {NextRequest} request - Next.js 요청 객체입니다. 쿼리 파라미터와 URL 정보를 포함합니다.
 * @returns {Promise<NextResponse>} 응답 객체 (리디렉션)
 */
export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code');

    if (!code) {
      throw Object.assign(new Error('카카오 인증 코드가 없습니다.'), {
        status: 400,
      });
    }

    const responseData = await handleOauthSignIn(code);
    const response = NextResponse.redirect(
      new URL(ROUTES.ACTIVITIES.ROOT, request.url),
    );
    setAuthCookies(response, {
      accessToken: responseData.accessToken,
      refreshToken: responseData.refreshToken,
    });
    return response;
  } catch (error: unknown) {
    console.error('[Kakao Signin Error]:', error);

    const errorStatus =
      error instanceof Error && 'status' in error
        ? (error as Error & { status: number }).status
        : undefined;

    if (errorStatus === 403 || errorStatus === 404) {
      const notMemberUrl = new URL(
        `${ROUTES.SIGNUP}?error=${ERROR_CODES.OAUTH_NOT_A_MEMBER}`,
        request.url,
      );
      if (error instanceof Error) {
        notMemberUrl.searchParams.append('message', error.message);
      }
      return NextResponse.redirect(notMemberUrl);
    }

    const defaultErrorUrl = new URL(
      `${ROUTES.SIGNIN}?error=${ERROR_CODES.OAUTH_KAKAO_FAILED}`,
      request.url,
    );
    if (error instanceof Error) {
      defaultErrorUrl.searchParams.append('message', error.message);
    }
    return NextResponse.redirect(defaultErrorUrl);
  }
}
