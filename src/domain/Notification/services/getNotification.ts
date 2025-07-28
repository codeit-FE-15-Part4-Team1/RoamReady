import type { NotificationResponse } from '@/domain/Notification/types/type';
import { apiClient } from '@/shared/libs/apiClient';

export const getNotifications = async (): Promise<NotificationResponse> => {
  const res = await apiClient('my-notifications');
  const data: NotificationResponse = await res.json();
  return data;
};
