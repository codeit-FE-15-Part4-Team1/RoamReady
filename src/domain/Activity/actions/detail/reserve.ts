'use server';

import { cookies } from 'next/headers';

export async function reserveAction(
  activityId: number,
  scheduleId: number | null,
  headCount: number,
) {
  const accessToken = (await cookies()).get('accessToken')?.value;

  if (!accessToken) {
    throw new Error('로그인이 필요합니다.');
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/activities/${activityId}/reservations`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ scheduleId, headCount }),
    },
  );

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.message || '예약에 실패했습니다.');
  }
}
