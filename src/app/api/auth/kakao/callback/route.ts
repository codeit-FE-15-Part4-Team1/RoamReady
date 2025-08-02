import { NextRequest, NextResponse } from 'next/server';

import type { OAuthResponse } from '@/domain/Auth/schemas/response';
import { oauthResponseSchema } from '@/domain/Auth/schemas/response';
import setAuthCookies from '@/domain/Auth/utils/setAuthCookies';
import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { ERROR_CODES, ROUTES } from '@/shared/constants/routes';

/**
 * @function handleOauthSignUp
 * @description OAuth 회원가입을 처리하는 헬퍼 함수입니다. 백엔드 서버에 카카오 인가 코드와 닉네임을 전달하여 회원가입을 시도합니다.
 * @param {string} kakaoAuthCode - 카카오로부터 받은 인가 코드.
 * @param {string} nickname - 회원가입 시 사용할 임의의 닉네임.
 * @returns {Promise<OAuthSignupResponse>} 성공 시, Zod 스키마로 유효성이 검증된 사용자 정보와 토큰을 포함한 응답 객체를 반환합니다.
 * @throws {Error} 백엔드 API 요청이 실패하거나(예: 409 Conflict) 응답 데이터의 형식이 스키마와 일치하지 않을 경우, `status` 속성이 추가된 에러를 던집니다.
 */
async function handleOauthSignUp(
  kakaoAuthCode: string,
  nickname: string,
): Promise<OAuthResponse> {
  const signUpResponse = await fetch(
    `${process.env.API_BASE_URL}${API_ENDPOINTS.OAUTH.SIGNUP_PROVIDER('kakao')}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: kakaoAuthCode,
        nickname: nickname,
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
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
 * @function handleOauthSignIn
 * @description OAuth 로그인을 처리하는 헬퍼 함수입니다. 백엔드 서버에 카카오 인가 코드를 전달하여 로그인을 시도합니다.
 * @param {string} kakaoAuthCode - 카카오로부터 받은 인가 코드.
 * @returns {Promise<OAuthSigninResponse>} 성공 시, Zod 스키마로 유효성이 검증된 사용자 정보와 토큰을 포함한 응답 객체를 반환합니다.
 * @throws {Error} 백엔드 API 요청이 실패하거나(예: 404 Not Found) 응답 데이터의 형식이 스키마와 일치하지 않을 경우, `status` 속성이 추가된 에러를 던집니다.
 */
async function handleOauthSignIn(
  kakaoAuthCode: string,
): Promise<OAuthResponse> {
  const signInRes = await fetch(
    `${process.env.API_BASE_URL}${API_ENDPOINTS.OAUTH.SIGNIN_PROVIDER('kakao')}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: kakaoAuthCode,
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
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
 * 카카오 OAuth 인증 콜백을 처리하는 GET 요청 핸들러입니다.
 * 카카오로부터 받은 인가 코드(`code`)와 요청 의도(`state`, 'signin' 또는 'signup')를 추출합니다.
 * 'state' 값에 따라 `handleOauthSignUp` 또는 `handleOauthSignIn` 함수를 호출하여 회원가입 또는 로그인 프로세스를 진행합니다.
 * 성공 시 토큰을 쿠키에 저장하고 메인 페이지로 리디렉션합니다.
 *
 * ### 에러 처리 방식 (리디렉션과 에러 URL)
 * 일반적인 API 라우트와 달리, 이 핸들러는 전체 페이지 이동(리디렉션) 과정의 일부입니다.
 * 만약 여기서 JSON 에러만 반환하면 사용자는 빈 화면만 보게되므로 서버는 반드시 볼 수 있는 UI 페이지(로그인/회원가입)로 사용자를 다시 보내야 합니다.
 * 이때 "어떤 에러 때문에 돌아왔는지"를 알려주기 위한 유일한 방법이 바로 URL에 에러 코드를 실어 보내는 것입니다 (`?error=...`).
 *
 * `catch` 블록은 발생한 에러의 `status`와 `message`를 분석하여 다음과 같이 분기 처리합니다.
 * - **"이미 등록된 사용자" (400 에러 또는 409 에러)**: `state=signup`으로 회원가입을 시도했으나 이미 가입된 경우입니다. 로그인 페이지로 리디렉션합니다. (백엔드 `400` 반환)
 * - **"가입되지 않은 사용자" (403 또는 404 에러)**: `state=signin`으로 로그인을 시도했으나 가입되지 않은 경우입니다. 회원가입 페이지로 리디렉션합니다. (백엔드 `403` 반환)
 * - **그 외 모든 에러**: 유효하지 않은 `state` 값, 카카오 인증 실패 등 나머지 모든 경우는 일반적인 실패로 간주하고 로그인 페이지로 리디렉션합니다.
 *
 * ### 토스트 처리 흐름
 * 1. **서버 (현재 파일)**: 에러 발생 시, 에러 종류를 나타내는 `error` 코드와 백엔드가 보낸 `message`를 URL에 담아 클라이언트로 리디렉션합니다.
 * 2. **클라이언트 (리디렉션된 페이지)**: 로그인/회원가입 폼 컴포넌트(`SignInForm`, `SignUpForm`)는 페이지 로드 시 URL의 파라미터를 읽습니다.
 * 3. **클라이언트 (토스트 실행)**: `message` 파라미터가 있으면 그 내용을, 없으면 `error` 코드에 맞는 기본 메시지를 사용자에게 토스트로 보여줍니다.
 *
 * @param {NextRequest} request - Next.js의 요청 객체입니다. 쿼리 파라미터와 URL 정보를 포함합니다.
 * @returns {Promise<NextResponse>} 처리 결과에 따른 Next.js 응답 객체입니다.
 */
export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code');
    const intent = request.nextUrl.searchParams.get('state');

    if (!code) {
      throw Object.assign(new Error('카카오 인증 코드가 없습니다.'), {
        status: 400,
      });
    }

    let responseData;
    if (intent === 'signup') {
      const arbitraryNickname = `KakaoUser_${crypto.randomUUID().slice(0, 8)}`;
      responseData = await handleOauthSignUp(code, arbitraryNickname);
    } else if (intent === 'signin') {
      responseData = await handleOauthSignIn(code);
    } else {
      throw Object.assign(
        new Error(`잘못된 state 파라미터입니다. 받은 값: ${intent}`),
        {
          status: 400,
        },
      );
    }

    const response = NextResponse.redirect(
      new URL(ROUTES.ACTIVITIES.ROOT, request.url),
    );
    setAuthCookies(response, {
      accessToken: responseData.accessToken,
      refreshToken: responseData.refreshToken,
    });
    return response;
  } catch (error: unknown) {
    console.error('[Kakao Callback Error]:', error);

    const errorStatus =
      error instanceof Error && 'status' in error
        ? (error as Error & { status: number }).status
        : undefined;

    const errorMessage = error instanceof Error ? error.message : '';

    if (
      (errorStatus === 409 || errorStatus === 400) &&
      errorMessage.includes('이미 등록된 사용자')
    ) {
      const redirectUrl = new URL(
        `${ROUTES.SIGNIN}?error=${ERROR_CODES.OAUTH_ALREADY_EXISTS}`,
        request.url,
      );
      if (errorMessage) {
        redirectUrl.searchParams.append('message', errorMessage);
      }
      return NextResponse.redirect(redirectUrl);
    }

    switch (errorStatus) {
      case 403:
      case 404:
        const notMemberUrl = new URL(
          `${ROUTES.SIGNUP}?error=${ERROR_CODES.OAUTH_NOT_A_MEMBER}`,
          request.url,
        );
        if (errorMessage) {
          notMemberUrl.searchParams.append('message', errorMessage);
        }
        return NextResponse.redirect(notMemberUrl);
      default:
        const defaultErrorUrl = new URL(
          `${ROUTES.SIGNIN}?error=${ERROR_CODES.OAUTH_KAKAO_FAILED}`,
          request.url,
        );
        if (errorMessage) {
          defaultErrorUrl.searchParams.append('message', errorMessage);
        }
        return NextResponse.redirect(defaultErrorUrl);
    }
  }
}
