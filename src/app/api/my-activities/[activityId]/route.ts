import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * DELETE /api/my-activities/[activityId]
 *
 * 클라이언트로부터 전달된 activityId를 이용해 체험을 삭제하는 API 라우트입니다.
 * 내부적으로 BFF를 통해 백엔드 API로 DELETE 요청을 보냅니다.
 */
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ activityId: string }> },
) {
  const { params } = context;
  const { activityId } = await params;

  try {
    // 백엔드 체험 삭제 API 호출
    const apiResponse = await fetch(
      `${process.env.API_BASE_URL}my-activities/${activityId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    // 삭제 실패한 경우: 에러 메시지를 파싱하여 프론트에 전달
    if (!apiResponse.ok) {
      let message = '삭제 요청에 실패했습니다.';
      try {
        const errorBody = await apiResponse.json();
        console.error('백엔드 삭제 응답:', errorBody);
        if (typeof errorBody === 'object' && errorBody?.message) {
          message = errorBody.message;
        }
      } catch (jsonErr) {
        console.error('JSON 파싱 실패:', jsonErr);
      }

      // 실패 응답 반환 (예: 404, 403 등 백엔드 응답 상태 그대로 유지)
      return NextResponse.json({ message }, { status: apiResponse.status });
    }

    // 성공적으로 삭제된 경우: 204 No Content 반환
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('체험 삭제 API 라우트 처리 중 에러 발생:', error);
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
