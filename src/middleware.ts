import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ERROR_CODES, ROUTES } from '@/shared/constants/routes';

import { BRIDGE_API } from './shared/constants/bridgeEndpoints';
import { API_ENDPOINTS } from './shared/constants/endpoints';

const BACKEND_URL = process.env.API_BASE_URL;

/**
 * @file middleware.ts - API 요청 프록시 및 인증 토큰 관리 미들웨어
 * @description
 * 이 미들웨어는 클라이언트의 API 요청을 가로채 백엔드 서버로 안전하게 전달하는 BFF(Backend for Frontend) 역할을 합니다.
 * HttpOnly 쿠키에 저장된 인증 토큰을 관리하여 클라이언트 측의 부담을 줄이고 보안을 강화합니다.
 *
 * ### 인증 흐름:
 * 1. **요청 가로채기**: `/api/`로 시작하지만 `/api/auth/`가 아닌 모든 요청을 가로챕니다. (테스트용 `/api/test/`경로는 제외)
 * 2. **토큰 추출 및 헤더 추가**: 브라우저가 보낸 HttpOnly 쿠키에서 `accessToken`을 추출하여 `Authorization` 헤더에 담아 실제 백엔드 API 서버로 요청을 보냅니다.
 * 3. **성공적인 응답**: 백엔드 응답이 성공적이면 그대로 클라이언트에 전달합니다.
 * 4. **Access Token 만료 처리 (401 에러)**:
 * - 백엔드에서 `401 Unauthorized` 에러를 받으면 `accessToken`이 만료된 것으로 간주합니다.
 * - 쿠키에 있는 `refreshToken`을 사용하여 백엔드의 토큰 갱신 엔드포인트(`/auth/token`)로 새로운 `accessToken`을 요청합니다.
 * 5. **토큰 갱신 성공**:
 * - 새로운 `accessToken`을 받으면, 이를 새로운 HttpOnly 쿠키로 설정하여 클라이언트 응답에 포함시킵니다.
 * - 원래 실패했던 API 요청을 새로운 토큰으로 재시도하고, 그 결과를 클라이언트에 최종적으로 반환합니다.
 * 6. **Refresh Token 만료 (갱신 실패)**:
 * - 토큰 갱신마저 실패하면 `refreshToken`도 만료된 것입니다.
 * - 이 경우, 미들웨어에서 직접 로그인 페이지로 리다이렉트하여 사용자에게 세션 만료를 알립니다. `?error=session_expired` 쿼리 파라미터를 URL에 추가하여 로그인 페이지에서 토스트 메시지를 표시할 수 있도록 합니다.
 * 7. **테스트 API 경로 제외**: `/api/test/`로 시작하는 모든 요청은 이 미들웨어의 인증 및 프록시 로직에서 제외되어 Next.js의 자체 API 라우트 핸들러로 직접 전달됩니다. 이는 테스트 환경의 유연성을 위한 것입니다.
 *
 * ### 토큰 생명주기 (Token Lifecycle):
 * - **로그인 시**: `api/auth/signin` 또는 `api/auth/signup`을 통해 완전히 새로운 토큰 세트(Access/Refresh)가 발급됩니다.
 * - **로그인 유지 시**: 이 미들웨어는 현재 세션의 토큰이 유효한 동안에만 `accessToken`의 자동 갱신을 처리합니다.
 * - **로그아웃 시**: `api/auth/signout`을 통해 쿠키의 모든 토큰이 삭제되며, 현재 세션은 완전히 종료됩니다.
 * 로그아웃은 이전 세션의 모든 인증 정보를 파기하므로, 재로그인 시에는 과거와 무관한 새로운 세션이 시작됩니다.
 *
 * ### 에러 처리 흐름:
 * - 이 미들웨어는 모든 에러를 기본적으로 '통과'시키지만, **오직 `401 Unauthorized` 에러에 대해서만 특별한 조치(토큰 재발급 또는 직접 리다이렉트)**를 시도합니다.
 * - `401` 이외의 모든 백엔드 에러(4xx, 5xx)는 클라이언트의 `apiClient`로 그대로 전달되어 최종적으로 처리됩니다.
 * - `try...catch` 블록은 백엔드 서버 다운, 네트워크 문제 등 `fetch` 호출 자체가 실패하는 **네트워크 레벨의 에러**를 처리합니다.
 * 이 경우, 클라이언트에게 `502 Bad Gateway` 상태 코드와 함께 일관된 JSON 에러를 반환합니다.
 *
 *
 * @param {NextRequest} request - 들어오는 클라이언트 요청 객체
 * @returns {Promise<NextResponse>} 처리된 응답 객체
 */
export async function middleware(request: NextRequest) {

  if (request.nextUrl.pathname.startsWith('/api/test/')) {
    return NextResponse.next();
  }


  if (request.nextUrl.pathname.startsWith(`${BRIDGE_API.AUTH_PREFIX}/`)) {
    return NextResponse.next();
  }

  const path = request.nextUrl.pathname.replace(BRIDGE_API.PREFIX, '');
  const correctedPath = path.startsWith('/') ? path.substring(1) : path;
  const destinationUrl = new URL(correctedPath, BACKEND_URL);
  destinationUrl.search = request.nextUrl.search;

  const headers = new Headers(request.headers);
  headers.set('Host', destinationUrl.host);

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

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

    if (response.status === 401 && refreshToken) {
      const refreshResponse = await fetch(
        `${BACKEND_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
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


    if (refreshResponse.ok) {
      const tokens = await refreshResponse.json();
      const newAccessToken = tokens.accessToken;

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
  matcher: '/api/:path*',
};

