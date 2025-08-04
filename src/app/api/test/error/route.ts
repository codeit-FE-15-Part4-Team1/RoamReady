import { NextRequest, NextResponse } from 'next/server';

/**
 * @function GET
 * @description
 * API 에러 처리 로직을 테스트하기 위해 특정 HTTP 상태 코드를 의도적으로 반환하는 Next.js API 라우트 핸들러입니다.
 * 이 API는 모든 에러 응답에 대해 일관된 JSON 형식을 유지하여, 클라이언트의 에러 파싱 로직이 실패하지 않도록 합니다.
 *
 * @details
 * - **프로덕션 환경**: `process.env.NODE_ENV`가 'production'인 경우, 테스트용 API가 비활성화되며 `404 Not Found`와 함께 메시지를 반환합니다.
 * - **개발 환경**: `status` 쿼리 파라미터에 따라 다음과 같은 응답을 반환합니다.
 * - `400`, `401`, `403`, `409`, `500`: 각 상태 코드에 맞는 JSON 응답을 반환합니다.
 * - `json-parse-error`: 의도적으로 유효하지 않은 JSON 형식을 반환하여 클라이언트에서 JSON 파싱 오류를 테스트할 수 있게 합니다.
 * - 그 외 유효하지 않은 `status` 값에 대해서는 `400 Bad Request`와 함께 '지원되지 않는 상태 코드입니다.' 메시지를 반환합니다.
 *
 * @param {NextRequest} request - Next.js의 요청 객체입니다. URL 쿼리 파라미터(`status`)를 포함합니다.
 * @returns {Promise<NextResponse>} - 테스트 시나리오에 맞는 HTTP 상태 코드와 JSON 응답을 포함하는 `NextResponse` 객체입니다.
 *
 */
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      {
        message:
          '이 API는 테스트 용도로만 제공되며, 프로덕션에서는 비활성화됩니다.',
      },
      { status: 404 },
    );
  }

  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get('status');

  switch (statusParam) {
    case '400':
      return NextResponse.json(
        { message: '서버가 보낸 400 에러입니다.' },
        { status: 400 },
      );
    case '401':
      return NextResponse.json(
        { message: '인증되지 않았습니다. 다시 로그인해주세요.' },
        { status: 401 },
      );
    case '403':
      // 서버 메시지를 일반적인 것으로 반환하여, 클라이언트의 getErrorMessageByStatus가 우선적으로 적용되는지 확인
      return NextResponse.json(
        { message: '접근이 거부되었습니다.' },
        { status: 403 },
      );
    case '409':
      return NextResponse.json(
        { message: '이미 사용 중인 이메일입니다.' },
        { status: 409 },
      );
    case '500':
      // 서버 메시지를 일반적인 것으로 반환하여, 클라이언트의 getErrorMessageByStatus가 우선적으로 적용되는지 확인
      return NextResponse.json(
        { message: '서버 내부 오류 발생.' },
        { status: 500 },
      );
    case 'json-parse-error':
      // 의도적으로 유효하지 않은 JSON을 반환하여, 클라이언트에서 파싱 오류를 유도합니다.
      const invalidJson = '{"test": "value" "anotherKey": 123}';
      return new NextResponse(invalidJson, {
        status: 200, // 상태 코드는 200 OK로 설정하여 ky가 파싱을 시도하게 만듭니다.
        headers: {
          'Content-Type': 'application/json',
        },
      });
    default:
      return NextResponse.json(
        { message: '지원되지 않는 상태 코드입니다.' },
        { status: 400 },
      );
  }
}
