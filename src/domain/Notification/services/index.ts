import type { NotificationResponse } from '@/domain/Notification/types/type';
import { apiClient } from '@/shared/libs/apiClient';

/**
 * 알림 GET api 함수
 *
 * @param {Object} params - 요청에 필요한 파라미터
 * @param {number} [params.cursorId] - 다음 페이지를 위한 커서 ID (기존 마지막 알림의 ID)
 * @param {number} [params.size=10] - 한 번에 가져올 알림 개수
 * @returns {Promise<NotificationResponse>} 알림 목록 응답
 */
export const getNotifications = async ({
  cursorId,
  size = 10,
}: {
  cursorId?: number;
  size?: number;
}): Promise<NotificationResponse> => {
  const params = new URLSearchParams();

  if (cursorId != null) params.append('cursorId', cursorId.toString());
  if (size != null) params.append('size', size.toString());

  const res = await apiClient.get(`my-notifications?${params.toString()}`);
  return res.json();
};

/**
 * 알림 삭제 api 함수
 *
 * @param {number} notificationId - 삭제할 알림 ID
 * @throws {Error & { status?: number }} 알림 삭제 실패 시 에러 발생
 * @returns {Promise<void>} 반환값 없음
 */
export const deleteNotification = async (
  notificationId: number,
): Promise<void> => {
  const res = await apiClient.delete(`my-notifications/${notificationId}`);

  if (!res.ok) {
    const err = new Error('알림 삭제 실패') as Error & {
      status?: number;
    };
    err.status = res.status;
    throw err;
  }
};
