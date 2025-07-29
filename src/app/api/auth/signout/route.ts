import { NextRequest, NextResponse } from 'next/server';

/**
 * @file /api/auth/signout/route.ts
 * @description 사용자의 로그아웃 요청을 처리하여 인증 쿠키를 삭제하는 API 라우트 핸들러입니다.
 * @see /src/shared/hooks/useSignout.ts - 이 API를 호출하는 클라이언트 훅
 *
 * @description
 * 클라이언트의 로그아웃 요청을 받아 서버에 저장된 인증 관련 쿠키를 삭제합니다.
 *
 * ### 주요 로직:
 * 1. 클라이언트로부터 `POST` 요청을 받습니다.
 * 2. 선택적 검증: `accessToken`이 없는 요청은 이미 로그아웃 상태로 간주하여 특정 응답을 반환합니다.
 * 3. `NextResponse` 객체를 생성합니다.
 * 4. `response.cookies.delete()`를 사용하여 `accessToken`과 `refreshToken` 쿠키를 삭제합니다.
 * 5. 쿠키가 삭제된 응답을 클라이언트에 반환하여 로그아웃 절차를 완료합니다.
 *
 * @param {NextRequest} request - 클라이언트의 요청 객체. (쿠키 접근을 위해 추가됨)
 * @returns {Promise<NextResponse>} 처리 결과에 따른 응답 객체.
 */
export async function POST(request: NextRequest) {
  //! 에러 처리는 별도의 브랜치에서 다시 다듬을 예정
  try {
    const cookies = request.cookies;

    if (!cookies.has('accessToken')) {
      console.log(
        '[Signout API Route] Already logged out: accessToken not found.',
      );
      return NextResponse.json(
        { message: '이미 로그아웃 상태입니다.' },
        { status: 400 },
      );
    }

    const response = NextResponse.json({
      success: true,
      message: '로그아웃되었습니다.',
    });

    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    console.log(
      '[Signout API Route] Successfully logged out and deleted cookies.',
    );
    return response;
  } catch (error) {
    console.error(
      '[Signout API Route] Error during signout API route processing:',
      error,
    );
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
