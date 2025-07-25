import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

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
 * 1.  **요청 가로채기**: `/api/`로 시작하지만 `/api/auth/`가 아닌 모든 요청을 가로챕니다.
 * 2.  **토큰 추출 및 헤더 추가**: 브라우저가 보낸 HttpOnly 쿠키에서 `accessToken`을 추출하여 `Authorization` 헤더에 담아 실제 백엔드 API 서버로 요청을 보냅니다.
 * 3.  **성공적인 응답**: 백엔드 응답이 성공적이면 그대로 클라이언트에 전달합니다.
 * 4.  **Access Token 만료 처리 (401 에러)**:
 * - 백엔드에서 `401 Unauthorized` 에러를 받으면 `accessToken`이 만료된 것으로 간주합니다.
 * - 쿠키에 있는 `refreshToken`을 사용하여 백엔드의 토큰 갱신 엔드포인트(`/auth/token`)로 새로운 `accessToken`을 요청합니다.
 * 5.  **토큰 갱신 성공**:
 * - 새로운 `accessToken`을 받으면, 이를 새로운 HttpOnly 쿠키로 설정하여 클라이언트 응답에 포함시킵니다.
 * - 원래 실패했던 API 요청을 새로운 토큰으로 재시도하고, 그 결과를 클라이언트에 최종적으로 반환합니다.
 * 6.  **Refresh Token 만료 (갱신 실패)**:
 * - 토큰 갱신마저 실패하면 `refreshToken`도 만료된 것입니다.
 * - 이 경우, 원래의 `401` 에러를 클라이언트에 그대로 전달하며, 클라이언트는 로그아웃 처리를 해야 합니다.
 *
 * @param {NextRequest} request - 들어오는 클라이언트 요청 객체
 * @returns {Promise<NextResponse>} 처리된 응답 객체
 */
export async function middleware(request: NextRequest) {
  // 요청이 들어올 때마다 터미널에 로그가 찍힙니다.

  if (request.nextUrl.pathname.startsWith(`${BRIDGE_API.AUTH_PREFIX}/`)) {
    return NextResponse.next();
  }

  const path = request.nextUrl.pathname.replace(BRIDGE_API.PREFIX, '');
  const correctedPath = path.startsWith('/') ? path.substring(1) : path;
  const destinationUrl = new URL(correctedPath, BACKEND_URL);
  destinationUrl.search = request.nextUrl.search;

  console.log('path', path);
  console.log('correctedPath', correctedPath);
  console.log('destinationUrl', destinationUrl);

  const headers = new Headers(request.headers);
  headers.set('Host', destinationUrl.host);

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // [디버깅 로그 2] 쿠키에서 토큰을 제대로 읽었는지 확인
  console.log(`[Middleware Debug 2] Tokens Found in Cookie:`, {
    accessToken: accessToken
      ? `Exists (ends with ...${accessToken.slice(-6)})`
      : 'Not Found',
    refreshToken: refreshToken
      ? `Exists (ends with ...${refreshToken.slice(-6)})`
      : 'Not Found',
  });

  console.log('액세스 토큰 존재 여부:', accessToken);

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  // [디버깅 로그 3] 백엔드로 보내기 직전의 헤더 상태 확인
  console.log(
    `[Middleware Debug 3] Forwarding request to backend with Authorization header:`,
    headers.has('Authorization'),
  );

  const method = request.method;
  const contentType = request.headers.get('content-type') || '';
  const isMultipart = contentType.includes('multipart/form-data');
  const isSafeToClone = !isMultipart && method !== 'GET' && method !== 'HEAD';
  console.log('isMultipart', isMultipart);
  console.log('correctedPath', correctedPath);

  let rawBody: string | null = null;
  if (isSafeToClone && request.body) {
    rawBody = await request.text();
    // 폼 데이터가 있다면 로그를 찍어봅니다.
    console.log('요청 본문:', rawBody);
  }

  let response = await fetch(destinationUrl, {
    method,
    headers,
    body: isSafeToClone ? rawBody : request.body,
    ...(request.body &&
      !['GET', 'HEAD'].includes(method) && { duplex: 'half' }),
    signal: AbortSignal.timeout(30000),
  });
  // [디버깅 로그 4] 백엔드로부터 받은 첫 번째 응답 상태 확인
  console.log('Destination URL:', destinationUrl.href);
  console.log(
    `[Middleware Debug 4] Initial response from backend: ${response.status} ${response.statusText}`,
  );

  if (response.status === 401 && refreshToken) {
    // [디버깅 로그 5] 토큰 재발급 로직 진입 확인
    console.log(
      `[Middleware Debug 5] Access Token expired (401). Attempting refresh with refreshToken.`,
    );
    console.log('Access Token 만료, 재발급을 시도합니다.');

    const refreshResponse = await fetch(
      `${BACKEND_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      },
    );

    // [디버깅 로그 6] 토큰 재발급 API의 응답 상태 확인
    console.log(
      `[Middleware Debug 6] Refresh token response status: ${refreshResponse.status}`,
    );

    if (refreshResponse.ok) {
      const tokens = await refreshResponse.json();
      const newAccessToken = tokens.accessToken;
      console.log('새로운 Access Token 발급 성공');
      console.log(
        `[Middleware Debug 7] Token refresh SUCCESSFUL. Retrying original request.`,
      );

      headers.set('Authorization', `Bearer ${newAccessToken}`);

      response = await fetch(destinationUrl, {
        method,
        headers,
        body: isSafeToClone ? rawBody : request.body,
        ...(request.body &&
          !['GET', 'HEAD'].includes(method) && { duplex: 'half' }),
        signal: AbortSignal.timeout(30000),
      });
      // 백엔드 응답 상태 코드를 확인합니다.
      console.log('백엔드 응답 상태 코드:', response.status);

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
      console.log('Refresh Token 만료, 로그인이 필요합니다.');
      console.log(
        `[Middleware Debug 8] Token refresh FAILED. User must log in again.`,
      );
    }
  }
  console.log(
    `[Middleware Debug 9] Returning final response to client with status: ${response.status}`,
  );

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
