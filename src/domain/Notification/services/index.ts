import type { NotificationResponse } from '@/domain/Notification/types/type';
import { apiClient } from '@/shared/libs/apiClient';

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
