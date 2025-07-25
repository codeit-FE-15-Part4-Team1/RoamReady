import { NextResponse } from 'next/server';

/**
 * @file /api/auth/signout/route.ts
 * @description 사용자의 로그아웃 요청을 처리하여 인증 쿠키를 삭제하는 API 라우트 핸들러입니다.
 * @see /src/shared/hooks/useSignout.ts - 이 API를 호출하는 클라이언트 훅
 *
 * @description
 * 클라이언트의 로그아웃 요청을 받아 서버에 저장된 인증 관련 쿠키를 삭제합니다.
 *
 * ### 주요 로직:
 * 1.  클라이언트로부터 `POST` 요청을 받습니다.
 * 2.  `NextResponse` 객체를 생성합니다.
 * 3.  `response.cookies.delete()`를 사용하여 `accessToken`과 `refreshToken` 쿠키를 삭제합니다.
 * 4.  쿠키가 삭제된 응답을 클라이언트에 반환하여 로그아웃 절차를 완료합니다.
 *
 * @returns {Promise<NextResponse>} 쿠키가 삭제된 성공 응답 객체.
 */
export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');

  return response;
}
