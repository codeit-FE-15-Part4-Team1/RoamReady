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
