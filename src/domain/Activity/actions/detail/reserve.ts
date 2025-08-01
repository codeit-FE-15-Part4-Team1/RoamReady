'use server';

import { cookies } from 'next/headers';

// 커스텀 에러 클래스
class SerializableError extends Error {
  toJSON() {
    return { message: this.message };
  }
}

// 공통 에러 핸들러
async function handleFetchError(
  error: unknown,
): Promise<{ statusCode: number; message: string }> {
  if (error instanceof SerializableError) {
    return { statusCode: 400, message: error.message };
  }

  if (error instanceof Error) {
    return { statusCode: 500, message: error.message };
  }

  return { statusCode: 500, message: '알 수 없는 서버 오류가 발생했습니다.' };
}

/**
 * 체험 예약 요청을 처리하는 서버 액션 함수
 *
 * @param activityId - 예약할 체험 ID
 * @param scheduleId - 선택된 예약 일정 ID (없으면 null)
 * @param headCount - 예약 인원 수
 * @returns statusCode, message 포함한 응답 객체
 */
export async function reserveAction(
  activityId: number,
  scheduleId: number | null,
  headCount: number,
): Promise<{ statusCode: number; message: string }> {
  try {
    const accessToken = (await cookies()).get('accessToken')?.value;

    if (!accessToken) {
      throw new SerializableError('로그인이 필요합니다.');
    }

    const res = await fetch(
      `${process.env.API_BASE_URL}/activities/${activityId}/reservations`,
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
      const message = errorBody?.message || '예약에 실패했습니다.';
      throw new SerializableError(message);
    }

    return { statusCode: 200, message: '예약이 완료되었습니다.' };
  } catch (error) {
    return await handleFetchError(error);
  }
}
