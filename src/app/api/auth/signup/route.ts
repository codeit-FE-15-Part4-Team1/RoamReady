import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { API_ENDPOINTS } from '@/shared/constants/endpoints';

/**
 * @file /api/auth/signup/route.ts
 * @description 클라이언트의 회원가입 요청을 처리하고, 성공 시 자동 로그인시키는 API 라우트 핸들러입니다.
 * @see /src/app/(auth)/signup/page.tsx - 이 API를 호출하는 클라이언트 페이지
 * @see /src/shared/constants/endpoints.ts - `API_ENDPOINTS` 상수 정의
 *
 * @description
 * 클라이언트의 회원가입 요청을 BFF(Backend for Frontend) 서버에서 처리합니다.
 *
 * ### 주요 로직:
 * 1.  클라이언트로부터 받은 `email`, `password`, `nickname`으로 백엔드 서버에 회원가입을 요청합니다.
 * 2.  백엔드 응답이 성공적이고 `accessToken`과 `refreshToken`이 포함된 경우,
 * 이를 안전한 `HttpOnly` 쿠키로 설정하여 사용자에게 즉시 로그인 상태를 제공합니다.
 * 3.  백엔드 응답에 토큰이 없는 경우(회원가입만 성공), 로그인 페이지로 이동하라는 메시지를 반환합니다.
 * 4.  최종적으로 클라이언트에는 사용자 정보(`user`) 또는 에러 메시지를 반환합니다.
 *
 * @param {NextRequest} request - 클라이언트의 요청 객체. `email`, `password`, `nickname`을 포함합니다.
 * @returns {Promise<NextResponse>} 처리 결과에 따른 응답 객체.
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password, nickname } = await request.json();

    const apiResponse = await fetch(
      `${process.env.API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNUP}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, nickname }),
      },
    );

    const responseBody = await apiResponse.json();

    if (!apiResponse.ok) {
      return NextResponse.json(
        { message: responseBody.message || '회원가입에 실패했습니다.' },
        { status: apiResponse.status },
      );
    }

    const { accessToken, refreshToken, user } = responseBody;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        {
          message: '회원가입 성공! 로그인 페이지로 이동합니다.',
          user: responseBody,
        },
        { status: 201 },
      );
    }

    const responseWithCookies = NextResponse.json({ user });

    responseWithCookies.cookies.set({
      name: 'accessToken',
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });

    responseWithCookies.cookies.set({
      name: 'refreshToken',
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return responseWithCookies;
  } catch (error) {
    console.error('회원가입 API 라우트 처리 중 에러 발생:', error);
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
