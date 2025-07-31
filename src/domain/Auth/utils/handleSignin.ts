import { NextResponse } from 'next/server';

import { API_ENDPOINTS } from '@/shared/constants/endpoints';

import type { SigninRequest } from '../schemas/request';
import setAuthCookies from './setAuthCookies';

/**
 * 백엔드에 로그인을 요청하고, 성공 시 토큰 쿠키를 설정하는 유틸리티 함수
 * @param credentials - email과 password를 포함하는 객체
 * @returns {Promise<{response: NextResponse, user: any}>} 쿠키가 설정된 NextResponse 객체
 */
export default async function handleSignin(credentials: SigninRequest) {
  const signinApiResponse = await fetch(
    `${process.env.API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNIN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    },
  );

  const signinResponseBody = await signinApiResponse.json();

  if (!signinApiResponse.ok) {
    throw Object.assign(
      new Error(signinResponseBody.message || '로그인에 실패했습니다.'),
      { status: signinApiResponse.status },
    );
  }

  const { accessToken, refreshToken, user } = signinResponseBody;

  if (!accessToken || !refreshToken) {
    throw new Error('로그인 응답에 토큰이 포함되지 않았습니다.');
  }

  let responseWithCookies = NextResponse.json({ user });
  responseWithCookies = setAuthCookies(responseWithCookies, {
    accessToken,
    refreshToken,
  });

  return responseWithCookies;
}
