import { NextRequest, NextResponse } from 'next/server';

import type {
  OAuthSigninResponse,
  OAuthSignupResponse,
} from '@/domain/Auth/schemas/response';
import { setAuthCookies } from '@/domain/Auth/utils/setAuthCookies';

/**
 * @function handleOauthSignUp
 * @description
 * OAuth 회원가입을 처리하는 비동기 함수입니다.
 * 카카오 인가 코드를 백엔드로 전달하여 회원가입을 진행하고, 성공 시 사용자에게 인증 쿠키를 설정한 후 메인 페이지로 리디렉션합니다.
 * 백엔드에서 409(Conflict) 에러 발생 시 이미 가입된 계정임을 알리는 메시지와 함께 로그인 페이지로 리디렉션하며,
 * 그 외의 에러 발생 시 회원가입 실패 메시지와 함께 회원가입 페이지로 리디렉션합니다.
 *
 * @param {string} kakaoAuthCode - 카카오로부터 받은 인가 코드입니다.
 * @param {string} nickname - 회원가입 시 백엔드로 전달할 임의로 생성된 사용자 닉네임입니다.
 * @param {NextRequest} req - Next.js의 요청 객체입니다. 리디렉션 URL을 구성하는 데 사용됩니다.
 * @returns {Promise<NextResponse>} 처리 결과에 따른 Next.js 응답 객체입니다.
 */
async function handleOauthSignUp(
  kakaoAuthCode: string,
  nickname: string,
  req: NextRequest,
) {
  const signUpRes = await fetch(
    `${process.env.API_BASE_URL}/oauth/sign-up/kakao`,
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

  if (signUpRes.ok) {
    const responseData: OAuthSignupResponse = await signUpRes.json();
    const response = NextResponse.redirect(new URL('/', req.url));
    setAuthCookies(response, {
      accessToken: responseData.accessToken,
      refreshToken: responseData.refreshToken,
    });
    return response;
  }

  const errorData = await signUpRes.json();
  console.error('Signup API Error:', {
    status: signUpRes.status,
    statusText: signUpRes.statusText,
    message: errorData?.message || 'Unknown error',
  });

  if (signUpRes.status === 409) {
    return NextResponse.redirect(
      new URL('/signin?error=already_exists', req.url),
    );
  }

  return NextResponse.redirect(new URL('/signup?error=signup_failed', req.url));
}

/**
 * @function handleOauthSignIn
 * @description
 * OAuth 로그인을 처리하는 비동기 함수입니다.
 * 카카오 인가 코드를 백엔드로 전달하여 로그인을 진행하고, 성공 시 사용자에게 인증 쿠키를 설정한 후 메인 페이지로 리디렉션합니다.
 * 백엔드에서 404(Not Found) 에러 발생 시 가입되지 않은 계정임을 알리는 메시지와 함께 회원가입 페이지로 리디렉션하며,
 * 그 외의 에러 발생 시 로그인 실패 메시지와 함께 로그인 페이지로 리디렉션합니다.
 *
 * @param {string} kakaoAuthCode - 카카오로부터 받은 인가 코드입니다.
 * @param {NextRequest} req - Next.js의 요청 객체입니다. 리디렉션 URL을 구성하는 데 사용됩니다.
 * @returns {Promise<NextResponse>} 처리 결과에 따른 Next.js 응답 객체입니다.
 */
async function handleOauthSignIn(kakaoAuthCode: string, req: NextRequest) {
  const signInRes = await fetch(
    `${process.env.API_BASE_URL}/oauth/sign-in/kakao`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: kakaoAuthCode,
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
      }),
    },
  );

  if (signInRes.ok) {
    const responseData: OAuthSigninResponse = await signInRes.json();
    const response = NextResponse.redirect(new URL('/', req.url));
    setAuthCookies(response, {
      accessToken: responseData.accessToken,
      refreshToken: responseData.refreshToken,
    });
    return response;
  }

  const errorData = await signInRes.json();
  console.error('Signin API Error:', {
    status: signInRes.status,
    statusText: signInRes.statusText,
    message: errorData?.message || 'Unknown error',
  });

  if (signInRes.status === 404) {
    return NextResponse.redirect(
      new URL('/signup?error=not_a_member', req.url),
    );
  }

  return NextResponse.redirect(new URL('/signin?error=auth_failed', req.url));
}

/**
 * @function GET
 * @description
 * 카카오 OAuth 인증 콜백을 처리하는 GET 요청 핸들러입니다.
 * 카카오로부터 받은 인가 코드(`code`)와 요청 의도(`state`, 'signin' 또는 'signup')를 추출합니다.
 * 'state' 값에 따라 `handleOauthSignUp` 또는 `handleOauthSignIn` 함수를 호출하여
 * 회원가입 또는 로그인 프로세스를 진행합니다.
 *
 * 인가 코드가 없거나 콜백 처리 중 예외 발생 시 적절한 에러 메시지와 함께 로그인 페이지로 리디렉션합니다.
 * 회원가입 시에는 임의의 닉네임을 생성하여 백엔드로 함께 전달합니다.
 *
 * @param {NextRequest} req - Next.js의 요청 객체입니다. 쿼리 파라미터와 URL 정보를 포함합니다.
 * @returns {Promise<NextResponse>} 처리 결과에 따른 Next.js 응답 객체입니다.
 */
export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code');
    const intent = req.nextUrl.searchParams.get('state');

    if (!code) {
      return NextResponse.redirect(
        new URL('/signin?error=invalid_code', req.url),
      );
    }

    if (intent === 'signup') {
      const arbitraryNickname = `KakaoUser_${Date.now().toString().slice(-6)}`;
      return await handleOauthSignUp(code, arbitraryNickname, req);
    } else if (intent === 'signin') {
      return await handleOauthSignIn(code, req);
    } else {
      console.error('Invalid or missing state parameter:', intent);
      return NextResponse.redirect(
        new URL('/signin?error=invalid_state', req.url),
      );
    }
  } catch (error) {
    console.error('Callback-level error:', error);
    return NextResponse.redirect(
      new URL('/signin?error=kakao_failed', req.url),
    );
    //! url에는 에러메시지라고 뜨긴 하지만 화면에 사용자에게 제공하는게 없어서 왜 갑자기 로그인 화면이 보이는지 어리둥절할 수 있음
    //! 에러처리할때 전체적으로 UX고려한 토스트나 에러 UI를 보이도록 할 예정
  }
}
