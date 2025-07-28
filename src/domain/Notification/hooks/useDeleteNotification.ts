'use client';

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { deleteNotification } from '@/domain/Notification/services';
import { NotificationResponse } from '@/domain/Notification/types/type';
import { useToast } from '@/shared/hooks/useToast';

export const useDeleteNotification = () => {
  const { showSuccess, showError } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteNotification(id),
    onSuccess: (_, id) => {
      showSuccess('알림이 삭제되었습니다.');

      // 알림 목록 캐시에서 해당 항목 제거
      queryClient.setQueryData(
        ['notifications'],
        (oldData: InfiniteData<NotificationResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page, idx) => ({
              ...page,
              notifications: page.notifications.filter((n) => n.id !== id),
              // 첫 페이지에만 totalCount 수정
              totalCount: idx === 0 ? page.totalCount - 1 : page.totalCount,
            })),
          };
        },
      );
    },
    onError: async (error: Error & { status?: number }) => {
      const status = error.status;
      console.log(status);

      switch (status) {
        case 401:
          showError('로그인이 필요합니다.');
          break;
        case 403:
          showError('본인의 알림만 삭제할 수 있습니다.');
          break;
        case 404:
          showError('존재하지 않는 알림입니다.');
          break;
        default:
          showError('알림 삭제에 실패했습니다.');
      }
    },
  });
};
