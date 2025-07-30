import { useInfiniteQuery } from '@tanstack/react-query';

import { getNotifications } from '@/domain/Notification/services';
import type { NotificationResponse } from '@/domain/Notification/types/type';

/**
 * 알림 목록을 무한 스크롤 방식으로 불러오는 tanstack Query 훅
 *
 * - 커서 기반 페이징(cursor-based pagination)을 사용
 * - 10초 간격으로 자동 새로고침(polling)
 * - 페이지네이션의 다음 커서 정보를 이용해 페이지 요청
 *
 * @returns {UseInfiniteQueryResult<NotificationResponse>} 알림 데이터와 상태를 포함한 쿼리 객체
 */
export const useInfiniteNotifications = () => {
  return useInfiniteQuery<NotificationResponse>({
    // 캐시와 식별을 위한 쿼리 키
    queryKey: ['notifications'],

    // 첫 호출 시 사용할 커서값 (undefined로 시작)
    initialPageParam: undefined,

    // 각 페이지 요청 시 호출되는 함수
    queryFn: ({ pageParam = undefined }) => {
      return getNotifications({ cursorId: pageParam as number | undefined });
    },

    // 다음 페이지의 커서값 반환
    getNextPageParam: (lastPage) =>
      lastPage.notifications.length > 0 && lastPage.cursorId != null
        ? lastPage.cursorId
        : undefined,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

    // 10초 간격으로 데이터를 새로 가져옴
    refetchInterval: 1000 * 10,

    // 앱이 백그라운드 상태여도 polling 유지
    refetchIntervalInBackground: true,

    // staleTime을 0으로 설정하여 매 요청 시 fresh로 간주
    staleTime: 0,
  });
};
