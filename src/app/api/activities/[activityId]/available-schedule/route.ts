import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * GET /api/activities/[activityId]/available-schedule/route.ts
 *
 * 특정 체험(activityId)의 예약 가능한 날짜 정보를 조회하기 위한 BFF API 라우트입니다.
 * 클라이언트는 year, month를 쿼리 파라미터로 전달해야 하며,
 * 해당 정보를 기반으로 백엔드에 GET 요청을 전달합니다.
 *
 * @query year - 연도 (필수)
 * @query month - 월 (필수)
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ activityId: string }> },
) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const { params } = context;
  const { activityId } = await params;

  // year 또는 month 누락 시 400 Bad Request 응답
  if (!year || !month) {
    return NextResponse.json(
      { message: 'year 또는 month 값이 누락되었습니다.' },
      { status: 400 },
    );
  }

  try {
    // 백엔드 API로 예약 가능한 날짜 요청
    const apiResponse = await fetch(
      `${process.env.API_BASE_URL}activities/${activityId}/available-schedule?year=${year}&month=${month}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await apiResponse.json();

    //  백엔드 응답이 실패인 경우, 에러 메시지를 그대로 전달
    if (!apiResponse.ok) {
      return NextResponse.json(
        { message: data.message || '예약 가능한 날짜 조회 실패' },
        { status: apiResponse.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    // 네트워크 에러 또는 예외 발생 시 500 Internal Server Error 응답
    console.error('예약 가능 일정 API 에러:', error);
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
