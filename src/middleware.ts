import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { BRIDGE_API } from './shared/constants/bridgeEndpoints';
import { API_ENDPOINTS } from './shared/constants/endpoints';

const BACKEND_URL = process.env.API_BASE_URL;

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log('🌐 [middleware] Incoming Request:', {
    method: request.method,
    pathname,
    fullUrl: request.nextUrl.href,
  });

  // AUTH 경로는 미들웨어를 통과
  if (pathname.startsWith(`${BRIDGE_API.AUTH_PREFIX}/`)) {
    console.log('🔓 [middleware] Auth path bypassed:', pathname);
    return NextResponse.next();
  }

  const path = pathname.replace(BRIDGE_API.PREFIX, '');
  const correctedPath = path.startsWith('/') ? path.substring(1) : path;
  const destinationUrl = new URL(correctedPath, BACKEND_URL);
  destinationUrl.search = request.nextUrl.search;

  const headers = new Headers(request.headers);
  headers.set('Host', destinationUrl.host);

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
    console.log('🪪 [middleware] Access token found');
  } else {
    console.warn('⚠️ [middleware] Access token missing');
  }

  const method = request.method;
  const contentType = request.headers.get('content-type') || '';
  const isMultipart = contentType.includes('multipart/form-data');
  const isSafeToClone = !isMultipart && method !== 'GET' && method !== 'HEAD';

  let rawBody: string | null = null;
  if (isSafeToClone && request.body) {
    rawBody = await request.text();
    console.log('📦 [middleware] Request body captured');
  }

  console.log(
    '➡️ [middleware] Proxying request to:',
    destinationUrl.toString(),
  );

  let response = await fetch(destinationUrl, {
    method,
    headers,
    body: isSafeToClone ? rawBody : request.body,
    ...(request.body &&
      !['GET', 'HEAD'].includes(method) && { duplex: 'half' }),
    signal: AbortSignal.timeout(30000),
  });

  console.log('📥 [middleware] Initial response status:', response.status);

  if (response.status === 401 && refreshToken) {
    console.warn('🔁 [middleware] Access token expired, attempting refresh...');

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

      console.log(
        '✅ [middleware] Token refreshed. Retrying original request.',
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
      console.error('❌ [middleware] Token refresh failed');
    }
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
