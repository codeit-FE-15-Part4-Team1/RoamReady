// app/api/my-activities/reservation-dashboard/route.ts
import { NextRequest, NextResponse } from 'next/server';

import { API_ENDPOINTS } from '@/shared/constants/endpoints';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const activityId = searchParams.get('activityId');
  const year = searchParams.get('year');
  const month = searchParams.get('month');

  if (!activityId || !year || !month) {
    return NextResponse.json({ error: '필수 파라미터 누락' }, { status: 400 });
  }

  try {
    const backendResponse = await fetch(
      `${process.env.API_BASE_URL}${API_ENDPOINTS.MY_ACTIVITIES.DASHBOARD(
        activityId,
        year,
        month,
      )}`,
      {
        headers: {
          Authorization: request.headers.get('Authorization') || '',
        },
      },
    );

    const data = await backendResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('월별 예약 현황 조회 실패:', error);
    return NextResponse.json({ error: '백엔드 요청 실패' }, { status: 500 });
  }
}
