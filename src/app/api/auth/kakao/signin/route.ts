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
 * @description
 * 백엔드에 카카오 인가 코드를 전달하여 로그인 시도 후 사용자 정보를 반환합니다.
 * 실패 시 에러 객체에 HTTP 상태 코드를 포함하여 던집니다.
 *
 * @param kakaoAuthCode - 카카오에서 발급받은 인가 코드
 * @returns 유효성 검증된 OAuth 로그인 응답 데이터
 * @throws 로그인 실패 또는 응답 형식이 올바르지 않을 경우 오류
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
      signal: AbortSignal.timeout(60000),
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
 * 카카오 OAuth 로그인 콜백을 처리하는 라우트입니다.
 *
 * 1. 인가 코드로 백엔드에 로그인 요청
 * 2. 성공 시 토큰 쿠키 저장 및 메인 페이지로 이동
 * 3. 실패 시 에러 코드에 따라 적절한 리디렉션 처리
 *
 * ### 에러별 리디렉션 전략:
 * - 403 또는 404 → `/kakao/transition?status=need-signup`
 * - 그 외 → `/signin?error=...&message=...`
 *
 * @param request - Next.js 서버 요청 객체
 * @returns 리디렉션 응답
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

    if (errorStatus === 404 || errorStatus === 403) {
      const redirectToTransition = new URL(
        '/kakao/transition',
        request.nextUrl.origin,
      );
      redirectToTransition.searchParams.set('status', 'need-signup');
      redirectToTransition.searchParams.set(
        'message',
        error instanceof Error ? error.message : '회원가입 먼저 해주세요.',
      );
      return NextResponse.redirect(redirectToTransition);
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
