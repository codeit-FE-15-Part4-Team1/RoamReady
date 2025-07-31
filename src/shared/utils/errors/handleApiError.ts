import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

/**
 * API 라우트의 catch 블록에서 사용할 공통 에러 핸들러.
 * 서버 측에서 발생하는 모든 에러를 일관된 JSON 형태로 변환하여 클라이언트에 반환합니다.
 *
 * @description
 * ### 에러 처리 흐름:
 * 이 함수는 API 라우트의 `try...catch` 블록에서 호출되어, 다양한 종류의 에러를 처리합니다.
 * - **유효성 검사 실패 (ZodError)**: Zod 스키마 유효성 검사에 실패하면, `400 Bad Request` 상태 코드와 함께 구체적인 에러 메시지를 반환합니다.
 * - **백엔드 API 에러**: 백엔드 서버가 `4xx` 또는 `5xx` 상태 코드로 응답하여 던져진 커스텀 에러(status 속성 포함)를 받아, 해당 상태 코드와 메시지를 클라이언트에 그대로 전달합니다.
 * - **기타 서버 오류**: 그 외 예상치 못한 모든 에러는 `500 Internal Server Error`로 처리됩니다.
 *
 * @example
 * ### 전체 에러 전파 과정 (End-to-End):
 * 이 함수는 아래와 같은 전체 에러 처리 과정에서 서버 측의 첫 단계를 담당합니다.
 * 1. **API 라우트 (서버)**: `catch (error) { return handleApiError(error) }`를 통해 표준화된 JSON 에러 응답을 생성합니다. (예: 409 Conflict)
 * 2. **`authApiClient` (클라이언트)**: 이 409 에러 응답을 받고, `ky` 라이브러리가 `HTTPError`를 던집니다.
 * 3. **`formatErrorResponseHooks` (클라이언트)**: 던져진 `HTTPError`를 가로채, 응답 본문의 메시지를 사용자 친화적으로 가공합니다. (예: "이미 사용 중인 이메일입니다.")
 * 4. **서비스 함수 (클라이언트)**: `authApiClient`가 에러를 던졌으므로, 이 함수가 반환하는 `Promise`는 실패(reject) 상태가 됩니다.
 * 5. **`use...Mutation` 훅 (클라이언트)**: `mutationFn`으로 전달된 함수가 실패했음을 감지하고, `onError` 콜백을 실행합니다.
 * 6. **`onError` 콜백 (UI)**: 최종적으로 `toast.show(error.message)`를 실행하여 사용자에게 에러 메시지를 보여줍니다.
 *
 * @param error - catch 블록에서 받은 에러 객체
 * @param context - (선택사항) 에러가 발생한 컨텍스트 (예: 'signin', 'signup')
 * @returns {NextResponse} 클라이언트에게 보낼 표준화된 JSON 에러 응답
 */
export function handleApiError(error: unknown, context?: string): NextResponse {
  const logContext = context ? `[API ${context} Error]` : '[API Error]';
  console.error(logContext, error);

  let errorMessage = '서버 내부 오류가 발생했습니다.';
  let errorStatus = 500;

  if (error instanceof ZodError) {
    errorMessage = error.errors[0]?.message || '입력값이 올바르지 않습니다.';
    errorStatus = 400;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    if (
      typeof error === 'object' &&
      error &&
      'status' in error &&
      typeof error.status === 'number'
    ) {
      errorStatus = error.status;
    }
  }

  return NextResponse.json({ message: errorMessage }, { status: errorStatus });
}
