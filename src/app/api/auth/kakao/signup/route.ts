import { NextRequest, NextResponse } from 'next/server';

import {
  OAuthResponse,
  oauthResponseSchema,
} from '@/domain/Auth/schemas/response';
import setAuthCookies from '@/domain/Auth/utils/setAuthCookies';
import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { ERROR_CODES, ROUTES } from '@/shared/constants/routes';

/**
 * @function handleOauthSignUp
 * @description
 * 백엔드에 카카오 인가 코드와 랜덤 닉네임을 전달하여 회원가입을 시도합니다.
 * 실패 시 HTTP 상태 코드와 함께 오류를 던집니다.
 *
 * @param kakaoAuthCode - 카카오로부터 받은 인가 코드
 * @param nickname - 자동 생성된 임의 닉네임
 * @returns 백엔드 응답 (accessToken, refreshToken 등 포함)
 * @throws 백엔드 API 실패 또는 응답 스키마 불일치 시 에러 발생
 */
async function handleOauthSignUp(
  kakaoAuthCode: string,
  nickname: string,
): Promise<OAuthResponse> {
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI;
  if (!redirectUri) {
    throw new Error(
      'NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI가 설정되지 않았습니다.',
    );
  }

  const signUpResponse = await fetch(
    `${process.env.API_BASE_URL}${API_ENDPOINTS.OAUTH.SIGNUP_PROVIDER('kakao')}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: kakaoAuthCode,
        nickname: nickname,
        redirectUri,
      }),
    },
  );

  const responseData = await signUpResponse.json();
  if (!signUpResponse.ok) {
    throw Object.assign(
      new Error(responseData.message || '회원가입에 실패했습니다.'),
      {
        status: signUpResponse.status,
      },
    );
  }
  return oauthResponseSchema.parse(responseData);
}

/**
 * @function GET
 * @description
 * 카카오 OAuth 회원가입 콜백을 처리하는 라우트입니다.
 *
 * 1. 인가 코드(code)를 쿼리에서 추출
 * 2. 자동 생성된 랜덤 닉네임으로 회원가입 시도
 * 3. 성공 시 토큰을 쿠키에 저장하고 `/activities`로 이동
 * 4. 실패 시 상태에 따라 리디렉션 분기
 *
 * ### 리디렉션 분기
 * - 409 또는 400: 이미 가입된 사용자 → `/kakao/transition?status=already-exists`
 * - 기타 오류: `/signup?error=...&message=...` 으로 리디렉션 (토스트 처리용)
 *
 * @param request - Next.js GET 요청 객체
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

    const arbitraryNickname = `K_${crypto.randomUUID().replace(/-/g, '').slice(0, 7)}`;
    const responseData = await handleOauthSignUp(code, arbitraryNickname);

    const response = NextResponse.redirect(
      new URL(ROUTES.ACTIVITIES.ROOT, request.url),
    );

    setAuthCookies(response, {
      accessToken: responseData.accessToken,
      refreshToken: responseData.refreshToken,
    });

    return response;
  } catch (error: unknown) {
    console.error('[Kakao Signup Error]:', error);

    // const errorStatus =
    //   error instanceof Error && 'status' in error
    //     ? (error as Error & { status: number }).status
    //     : undefined;

    // if (errorStatus === 409 || errorStatus === 400) {
    //   const redirectToTransition = new URL(
    //     '/kakao/transition',
    //     request.nextUrl.origin,
    //   );
    //   redirectToTransition.searchParams.set('status', 'already-exists');
    //   redirectToTransition.searchParams.set(
    //     'message',
    //     error instanceof Error
    //       ? error.message
    //       : '이미 가입된 회원입니다. 로그인해주세요.',
    //   );
    //   return NextResponse.redirect(redirectToTransition);
    // }

    const defaultErrorUrl = new URL(
      `${ROUTES.SIGNUP}?error=${ERROR_CODES.OAUTH_KAKAO_FAILED}`,
      request.url,
    );
    if (error instanceof Error) {
      defaultErrorUrl.searchParams.append('message', error.message);
    }
    return NextResponse.redirect(defaultErrorUrl);
  }
}
