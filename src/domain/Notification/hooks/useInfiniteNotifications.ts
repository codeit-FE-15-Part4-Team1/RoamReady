import { useInfiniteQuery } from '@tanstack/react-query';

import { getNotifications } from '@/domain/Notification/services';
import type { NotificationResponse } from '@/domain/Notification/types/type';

export const useInfiniteNotifications = () => {
  return useInfiniteQuery<NotificationResponse>({
    queryKey: ['notifications'],

    // ✅ 필수: 첫 호출 시 사용할 초기 커서값
    initialPageParam: undefined,

    queryFn: ({ pageParam = undefined }) =>
      getNotifications({ cursorId: pageParam as number | undefined }),

    getNextPageParam: (lastPage) =>
      lastPage.notifications.length > 0 && lastPage.cursorId != null
        ? lastPage.cursorId
        : undefined,

    // ✅ polling 옵션
    refetchInterval: 1000 * 30,
    refetchIntervalInBackground: true,
    staleTime: 0,
  });
};
