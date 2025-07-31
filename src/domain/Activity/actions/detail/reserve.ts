'use server';

import { cookies } from 'next/headers';

class SerializableError extends Error {
  toJSON() {
    return { message: this.message };
  }
}

/**
 * 체험 예약 요청을 처리하는 서버 액션 함수
 *
 * @param {number} activityId - 예약할 체험(액티비티) ID
 * @param {number | null} scheduleId - 선택된 예약 일정 ID (없으면 null)
 * @param {number} headCount - 예약 인원 수
 *
 * @throws 로그인하지 않은 경우 '로그인이 필요합니다.' 에러 발생
 * @throws 예약 실패 시 API 응답 메시지 또는 기본 메시지로 에러 발생
 *
 * @returns {Promise<void>} 예약 성공 시 반환 값 없음
 *
 * @example
 * await reserveAction(123, 456, 2);
 */
export async function reserveAction(
  activityId: number,
  scheduleId: number | null,
  headCount: number,
) {
  // 요청 쿠키에서 accessToken 가져오기
  const accessToken = (await cookies()).get('accessToken')?.value;

  // 로그인 상태 확인 (토큰 없으면 에러 발생)
  if (!accessToken) {
    throw new SerializableError('로그인이 필요합니다.');
  }

  // 예약 API 호출
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

  // 응답 실패 시 에러 메시지 파싱 후 예외 처리
  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new SerializableError(errorBody?.message || '예약에 실패했습니다.');
  }
}
