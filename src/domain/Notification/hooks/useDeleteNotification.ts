'use client';

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { deleteNotification } from '@/domain/Notification/services';
import { NotificationResponse } from '@/domain/Notification/types/type';
import { useToast } from '@/shared/hooks/useToast';

/**
 * 알림을 삭제 커스텀 훅
 *
 * - 성공 시: 알림 목록 캐시에서 해당 알림을 제거하고 성공 메시지를 표시함
 * - 실패 시: 상태 코드에 따라 적절한 에러 메시지를 표시함
 *
 * @returns {UseMutationResult<void, Error & { status?: number }, number>} 삭제 뮤테이션 훅
 */
export const useDeleteNotification = () => {
  const { showSuccess, showError } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    // 실제 삭제 API 호출
    mutationFn: (id: number) => deleteNotification(id),

    // 캐시된 알림 목록에서 해당 ID의 알림을 제거
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

    // 실패 시 실행되는 콜백
    onError: async (error: Error & { status?: number }) => {
      const status = error.status;
      console.log(status);

      // 상태 코드에 따라 다른 메시지 표시
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
