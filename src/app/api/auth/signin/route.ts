import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { setAuthCookies } from '@/domain/Auth/utils/authCookies';
import { API_ENDPOINTS } from '@/shared/constants/endpoints';

/**
 * @file /api/auth/signin/route.ts
 * @description 클라이언트의 로그인 요청을 처리하고, 성공 시 인증 쿠키를 발급하는 API 라우트 핸들러입니다.
 * @see /src/app/(auth)/signin/page.tsx - 이 API를 호출하는 클라이언트 페이지
 * @see /src/shared/constants/endpoints.ts - `API_ENDPOINTS` 상수 정의
 *
 * @description
 * 클라이언트의 로그인 요청을 BFF(Backend for Frontend) 서버에서 처리합니다.
 *
 * ### 주요 로직:
 * 1.  클라이언트로부터 `email`, `password`를 받아 백엔드 서버로 로그인을 요청합니다.
 * 2.  백엔드 응답이 성공하면, 응답에 포함된 `accessToken`과 `refreshToken`을 안전한 `HttpOnly` 쿠키로 설정합니다.
 * 3.  클라이언트에는 민감한 토큰 정보를 제외한 사용자 정보(`user`)만 반환합니다.
 * 4.  **매번 로그인 시, 이전 세션과 무관한 완전히 새로운 토큰 세트를 발급하여 새로운 로그인 세션을 시작합니다.**
 *
 * @param {NextRequest} request - 클라이언트의 요청 객체. `email`, `password`를 포함합니다.
 * @returns {Promise<NextResponse>} 처리 결과에 따른 응답 객체.
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const apiResponse = await fetch(
      `${process.env.API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNIN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      },
    );

    const responseBody = await apiResponse.json();

    if (!apiResponse.ok) {
      return NextResponse.json(
        { message: responseBody.message || '로그인에 실패했습니다.' },
        { status: apiResponse.status },
      );
    }

    const { accessToken, refreshToken, user } = responseBody;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { message: '인증 토큰이 제공되지 않았습니다.' },
        { status: 400 },
      );
    }

    let responseWithCookies = NextResponse.json({ user });

    responseWithCookies = setAuthCookies(responseWithCookies, {
      accessToken,
      refreshToken,
    });

    return responseWithCookies;
  } catch (error) {
    console.error('로그인 API 라우트 처리 중 에러 발생:', error);
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
