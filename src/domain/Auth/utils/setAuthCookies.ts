import type { NextResponse } from 'next/server';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * @description 인증 토큰(Access/Refresh)을 HttpOnly 쿠키로 설정하는 유틸리티 함수입니다.
 * 제네릭(<T>)을 사용하여 NextResponse의 바디 타입을 보존합니다.
 *
 * @param {NextResponse<T>} response - 쿠키를 추가할 NextResponse 객체.
 * @param {Tokens} tokens - 쿠키에 설정할 accessToken과 refreshToken.
 * @returns {NextResponse<T>} 쿠키가 추가된 NextResponse 객체.
 *
 * @property {boolean} httpOnly - `true`로 설정하여 JavaScript에서 쿠키에 접근하는 것을 막아 XSS 공격을 방지합니다.
 * @property {boolean} secure - `production` 환경에서만 `true`로 설정하여 HTTPS 연결에서만 쿠키가 전송되도록 합니다. 개발 환경(http)과의 호환성을 위함입니다.
 * @property {string} sameSite - 'lax'로 설정하여 CSRF(Cross-Site Request Forgery) 공격을 일부 방지합니다. 사용자가 외부 사이트에서 우리 사이트로 이동하는 GET 요청에는 쿠키가 전송됩니다.
 * @property {string} path - '/'로 설정하여 사이트의 모든 경로에서 쿠키를 사용할 수 있도록 합니다.
 * @property {number} maxAge - 토큰의 유효 기간(초 단위)입니다.
 * - `accessToken` (1시간): 탈취 시 피해를 최소화하기 위해 의도적으로 짧게 설정합니다.
 * - `refreshToken` (7일): 사용자의 로그인 세션을 편리하게 유지하기 위해 길게 설정합니다.
 */
export default function setAuthCookies<T>(
  response: NextResponse<T>,
  tokens: Tokens,
): NextResponse<T> {
  const { accessToken, refreshToken } = tokens;

  response.cookies.set({
    name: 'accessToken',
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    // maxAge: 60 * 60,
    maxAge: 15,
  });

  response.cookies.set({
    name: 'refreshToken',
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
