import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';


/**
 * @file /api/activities/[activityId]/available-schedule/route.ts
 * @description 예약 가능한 날짜를 백엔드에 요청하고, 결과를 클라이언트에 전달하는 BFF API 라우트입니다.
 * @query year - 연도 (필수)
 * @query month - 월 (필수)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { activityId: string } },
) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const { activityId } = params;

  if (!year || !month) {
    return NextResponse.json(
      { message: 'year 또는 month 값이 누락되었습니다.' },
      { status: 400 },
    );
  }

  try {
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

    if (!apiResponse.ok) {
      return NextResponse.json(
        { message: data.message || '예약 가능한 날짜 조회 실패' },
        { status: apiResponse.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('예약 가능 일정 API 에러:', error);
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
