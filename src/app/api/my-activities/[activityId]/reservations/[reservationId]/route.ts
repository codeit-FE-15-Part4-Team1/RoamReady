// app/api/my-activities/[activityId]/reservations/[reservationId]/route.ts
import { NextRequest, NextResponse } from 'next/server';

import { API_ENDPOINTS } from '@/shared/constants/endpoints';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ activityId: string; reservationId: string }> },
) {
  const { activityId, reservationId } = await context.params;
  const { status } = await request.json();

  if (!activityId || !reservationId) {
    return NextResponse.json({ error: '필수 파라미터 누락' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}${API_ENDPOINTS.MY_ACTIVITIES.RESERVATION(
        parseInt(activityId, 10),
        parseInt(reservationId, 10),
      )}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: request.headers.get('Authorization') || '',
        },
        body: JSON.stringify({ status }),
      },
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('예약 상태 업데이트 실패:', error);
    return NextResponse.json({ error: '백엔드 요청 실패' }, { status: 500 });
  }
}
