import { NextRequest, NextResponse } from 'next/server';

/**
 * @function GET
 * @description
 * API 에러 처리 로직을 테스트하기 위해 특정 HTTP 상태 코드를 의도적으로 반환하는 Next.js API 라우트 핸들러입니다.
 * 클라이언트에서 `status` 쿼리 파라미터를 통해 원하는 HTTP 상태 코드를 요청할 수 있습니다.
 *
 * @param {NextRequest} request - Next.js의 요청 객체입니다. URL 쿼리 파라미터(`status`)를 포함합니다.
 * @returns {Promise<NextResponse>}
 * - **프로덕션 환경에서의 동작**: `process.env.NODE_ENV`가 'production'인 경우, 이 API 라우트는 테스트 목적으로 비활성화되며, `404 Not Found` 상태 코드와 함께 비활성화 메시지를 JSON 형태로 반환합니다. 이 경로는 빌드에서 제외되진 않고, 런타임에 비활성화됩니다.
 * - `status` 파라미터가 401, 409, 500 중 하나인 경우 (개발 환경에서만): 해당 `status` 코드와 함께 테스트용 메시지를 JSON 형태로 반환합니다.
 * - `status` 파라미터가 유효하지 않거나 누락된 경우 (개발 환경에서만): `400 Bad Request` 상태 코드와 함께 '지원되지 않는 상태 코드입니다.' 메시지를 JSON 형태로 반환합니다.
 *
 * @example
 * 401 Unauthorized 에러 시뮬레이션 (개발 환경에서만 동작)
 * GET /api/test/error?status=401
 *
 * 409 Conflict 에러 시뮬레이션 (개발 환경에서만 동작)
 * GET /api/test/error?status=409
 *
 * 500 Internal Server Error 시뮬레이션 (개발 환경에서만 동작)
 * GET /api/test/error?status=500
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

  const status = Number(statusParam);

  if (![401, 409, 500].includes(status)) {
    return NextResponse.json(
      { message: '지원되지 않는 상태 코드입니다.' },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { message: `${status} 테스트용 에러입니다.` },
    { status },
  );
}
