import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { API_ENDPOINTS } from '@/shared/constants/endpoints';

export async function GET() {
  return NextResponse.json({ message: 'API 라우트 작동 확인' });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { activityId: string } },
) {
  console.log('✅ PARAMS:', params);
  const { activityId } = params;

  try {
    const apiResponse = await fetch(
      `${process.env.API_BASE_URL}my-activities/${activityId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log(
      `${process.env.API_BASE_URL}${API_ENDPOINTS.MY_ACTIVITIES.ACTIVITY_DETAIL(Number(activityId))}`,
    );

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

      // ✅ 실패 응답을 클라이언트에 전달해야 함
      return NextResponse.json({ message }, { status: apiResponse.status });
    }

    // ✅ 정상적인 삭제인 경우에만 204 반환
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('체험 삭제 API 라우트 처리 중 에러 발생:', error);
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
