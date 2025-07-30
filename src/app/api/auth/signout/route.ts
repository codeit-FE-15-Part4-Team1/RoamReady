import { NextResponse } from 'next/server';

/**
 * @file /api/auth/signout/route.ts
 * @description 사용자의 로그아웃 요청을 처리하여 인증 쿠키를 삭제하는 API 라우트 핸들러입니다.
 * @see /src/shared/hooks/useSignout.ts - 이 API를 호출하는 클라이언트 훅
 *
 * @description
 * 클라이언트의 로그아웃 요청을 받아 서버에 저장된 인증 관련 쿠키를 삭제합니다.
 * 이 API는 멱등성(Idempotency)을 가집니다. 즉, 여러 번 호출해도 결과는 항상 동일한 '로그아웃 상태'가 됩니다.
 *
 * ### 주요 로직:
 * 1. 클라이언트로부터 `POST` 요청을 받습니다.
 * 2. `NextResponse` 객체를 생성합니다.
 * 3. `response.cookies.delete()`를 사용하여 `accessToken`과 `refreshToken` 쿠키를 삭제합니다. 쿠키가 존재하지 않더라도 에러 없이 안전하게 동작합니다.
 * 4. 쿠키가 삭제된 응답을 클라이언트에 반환하여 로그아웃 절차를 완료합니다.
 *
 * ### 에러 처리 흐름:
 * - `try...catch` 블록은 쿠키 삭제 과정 등에서 발생할 수 있는 예기치 못한 서버 오류를 처리합니다.
 * - 에러 발생 시, `500 Internal Server Error` 상태 코드와 함께 일관된 JSON 에러 메시지를 반환합니다.
 *
 * ### 전체 에러 전파 과정 (End-to-End):
 * 1.  **API 라우트 (현재 파일)**: `return NextResponse.json({ message: '...' }, { status: 500 })`와 같이 표준화된 JSON 에러 응답을 클라이언트에게 보냅니다.
 * 2.  **`authApiClient` (클라이언트)**: 이 500 에러 응답을 받고, `ky` 라이브러리가 `HTTPError`를 던집니다(throw).
 * 3.  **`formatErrorResponseHooks` (클라이언트)**: 던져진 `HTTPError`를 가로채, `error.message`를 "서버 내부 오류가 발생했습니다."와 같이 가공합니다.
 * 4.  **`signout` 서비스 함수 (클라이언트)**: `authApiClient`가 에러를 던졌기 때문에, `Promise`는 실패(reject) 상태가 됩니다.
 * 5.  **`useSignoutMutation` (클라이언트)**: `mutationFn`으로 전달된 `signout` 함수가 실패했음을 감지하고, `onError` 콜백을 실행합니다.
 * 6.  **`onError` 콜백**: 바로 이곳에서 `toast.show(error.message, { type: 'error' })` 코드가 실행되어, 최종적으로 사용자에게 토스트 메시지가 보이게 됩니다.
 *
 * @returns {Promise<NextResponse>} 처리 결과에 따른 응답 객체.
 */
export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: '성공적으로 로그아웃되었습니다.',
    });

    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    return response;
  } catch (error) {
    console.error('[API Signout Error]:', error);
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
