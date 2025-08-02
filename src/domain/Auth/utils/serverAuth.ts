import 'server-only';

import { cookies } from 'next/headers';

import type { User } from '@/domain/Auth/schemas/response';

/**
 * @description
 * 서버 컴포넌트에서만 실행되어야 하는 함수로,
 * HttpOnly 쿠키의 `accessToken`을 사용하여 백엔드 API에서 현재 사용자 정보를 조회합니다.
 * 토큰이 없거나 API 호출에 실패하면 `null`을 반환합니다.
 * 실시간 사용자 정보를 위해 API 호출 시 캐시를 비활성화합니다. cache: 'no-store'
 * @returns {Promise<User | null>} 현재 로그인된 사용자의 정보 또는 `null`.
 */
export async function getCurrentUser(): Promise<User | null> {
  const token = (await cookies()).get('accessToken')?.value;

  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const user: User = await res.json();
    return user;
  } catch (error) {
    console.error('사용자 정보 조회 실패 (백엔드 서버 문제 가능):', error);
    return null;
  }
}
