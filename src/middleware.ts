import { NextRequest, NextResponse } from 'next/server';

import { ERROR_CODES, ROUTES } from '@/shared/constants/routes';

import { BRIDGE_API } from './shared/constants/bridgeEndpoints';
import { API_ENDPOINTS } from './shared/constants/endpoints';

const BACKEND_URL = process.env.API_BASE_URL;

const protectedPageRoutes = [ROUTES.MYPAGE.ROOT];

/**
 * @file middleware.ts - 페이지 보호, API 요청 프록시 및 인증 토큰 관리 미들웨어
 * @description
 * 이 미들웨어는 클라이언트의 페이지 요청과 API 요청을 모두 처리하여, HttpOnly 쿠키에 저장된 인증 토큰을 관리하고 보안을 강화하는 BFF(Backend for Frontend) 역할을 합니다.
 *
 * ### 페이지 라우트 보호 로직:
 * - `protectedPageRoutes`에 정의된 보호된 페이지에 대한 접근을 제어합니다.
 * - 사용자의 `accessToken` 쿠키가 없는 경우, 메인 페이지로 리디렉션하여 로그인이 필요함을 알립니다.
 * - 로그인 후 원래 가려던 페이지로 돌아갈 수 있도록 `redirect_url` 쿼리 파라미터를 추가하며, 토스트 메시지 표시를 위한 `toast_message`도 함께 전달합니다.
 *
 * ### API 요청 프록시 및 토큰 관리:
 * - `/api/`로 시작하지만 `/api/auth/`가 아닌 모든 요청을 가로채 백엔드 서버로 안전하게 전달합니다.
 * - 브라우저가 보낸 HttpOnly 쿠키에서 `accessToken`을 추출하여 `Authorization` 헤더에 담아 백엔드로 요청을 보냅니다.
 * - 백엔드에서 `401 Unauthorized` 에러를 받으면 `refreshToken`을 사용해 `accessToken`을 자동으로 갱신합니다.
 * - 토큰 갱신마저 실패하면 로그인 페이지로 리다이렉션하여 세션 만료를 사용자에게 알립니다.
 *
 * ### 토큰 생명주기 (Token Lifecycle):
 * - **로그인 시**: `api/auth/signin` 또는 `api/auth/signup`을 통해 완전히 새로운 토큰 세트(Access/Refresh)가 발급됩니다.
 * - **로그인 유지 시**: 이 미들웨어는 현재 세션의 토큰이 유효한 동안에만 `accessToken`의 자동 갱신을 처리합니다.
 * - **로그아웃 시**: `api/auth/signout`을 통해 쿠키의 모든 토큰이 삭제되며, 현재 세션은 완전히 종료됩니다. 로그아웃은 이전 세션의 모든 인증 정보를 파기하므로, 재로그인 시에는 과거와 무관한 새로운 세션이 시작됩니다.
 *
 * ### 에러 처리 흐름:
 * - `401` 에러에 대해서만 특별한 조치(토큰 재발급 또는 리다이렉트)를 시도합니다.
 * - `401` 이외의 모든 백엔드 에러(4xx, 5xx)는 클라이언트의 `apiClient`로 그대로 전달됩니다.
 * - `try...catch` 블록은 백엔드 서버 다운, 네트워크 문제 등 `fetch` 호출 자체가 실패하는 네트워크 레벨의 에러를 처리하며, 이 경우 `502 Bad Gateway` 상태 코드와 함께 일관된 JSON 에러를 반환합니다.
 *
 * ### 미들웨어 실행 경로 (`config`):
 * - `matcher`는 `/api/:path*`와 같이 API 경로에만 적용되는 것이 아니라,
 * `/((?!_next/static|_next/image|favicon.ico).*)` 정규 표현식을 통해 정적 파일을 제외한 모든 요청에 대해 실행됩니다.
 * 페이지 라우팅 로직은 `if (!pathname.startsWith('/api/'))` 조건문을 통해 API 요청과 페이지 요청을 분리하여 처리합니다.
 *
 * @param {NextRequest} request - 들어오는 클라이언트 요청 객체
 * @returns {Promise<NextResponse>} 처리된 응답 객체
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  if (!pathname.startsWith(`${BRIDGE_API.PREFIX}/`)) {
    const isProtectedRoute = protectedPageRoutes.some((route) =>
      pathname.startsWith(route),
    );

    if (isProtectedRoute && !accessToken) {
      const redirectUrl = new URL(ROUTES.ACTIVITIES.ROOT, request.url);
      redirectUrl.searchParams.set('redirect_url', pathname);
      redirectUrl.searchParams.set('toast_message', '로그인이 필요합니다.');
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }

  if (pathname.startsWith(BRIDGE_API.AUTH_PREFIX)) {
    return NextResponse.next();
  }

  if (pathname.startsWith(`${BRIDGE_API.TEST_PREFIX}/`)) {
    return NextResponse.next();
  }

  const path = pathname.replace(BRIDGE_API.PREFIX, '');
  const correctedPath = path.startsWith('/') ? path.substring(1) : path;
  const destinationUrl = new URL(correctedPath, BACKEND_URL);
  destinationUrl.search = request.nextUrl.search;

  const headers = new Headers(request.headers);
  headers.set('Host', destinationUrl.host);

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const method = request.method;
  const contentType = request.headers.get('content-type') || '';
  const isMultipart = contentType.includes('multipart/form-data');
  const isSafeToClone = !isMultipart && method !== 'GET' && method !== 'HEAD';

  let rawBody: string | null = null;
  if (isSafeToClone && request.body) {
    rawBody = await request.text();
  }

  try {
    let response = await fetch(destinationUrl, {
      method,
      headers,
      body: isSafeToClone ? rawBody : request.body,
      ...(request.body &&
        !['GET', 'HEAD'].includes(method) && { duplex: 'half' }),
      signal: AbortSignal.timeout(30000),
    });

    if (response.status === 401 && request.cookies.get('refreshToken')?.value) {
      const refreshToken = request.cookies.get('refreshToken')!.value;
      const refreshResponse = await fetch(
        `${BACKEND_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      if (refreshResponse.ok) {
        const tokens = await refreshResponse.json();
        const newAccessToken = tokens.accessToken;
        console.log('[Middleware] 새로운 Access Token 발급 성공');

        headers.set('Authorization', `Bearer ${newAccessToken}`);

        response = await fetch(destinationUrl, {
          method,
          headers,
          body: isSafeToClone ? rawBody : request.body,
          ...(request.body &&
            !['GET', 'HEAD'].includes(method) && { duplex: 'half' }),
          signal: AbortSignal.timeout(30000),
        });

        const finalResponse = new NextResponse(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        });

        finalResponse.cookies.set('accessToken', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 60 * 60,
          sameSite: 'lax',
        });

        return finalResponse;
      } else {
        console.log(
          '[Middleware] Refresh Token 만료 또는 갱신 실패. 로그인 페이지로 리다이렉트합니다.',
        );
        const redirectUrl = new URL(ROUTES.SIGNIN, request.url);
        redirectUrl.searchParams.set('error', ERROR_CODES.SESSION_EXPIRED);
        return NextResponse.redirect(redirectUrl);
      }
    }

    return response;
  } catch (error) {
    console.error('[Middleware] Fetch Error:', error);

    return new NextResponse(
      JSON.stringify({ message: '백엔드 서버와 통신할 수 없습니다.' }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
