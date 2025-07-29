// hooks/useActivityReviews.ts
import { useQuery } from '@tanstack/react-query';

import { getActivityReviews } from '@/domain/Activity/services/detail';
import type { ReviewList } from '@/domain/Activity/types/detail/types';

/**
 * 체험 리뷰 목록을 조회하는 React Query 훅
 *
 * @param activityId - 조회할 체험 ID
 * @param page - 페이지 번호
 * @param size - 페이지당 리뷰 개수 (기본값: 3)
 * @param initialData - 초기 데이터 (1페이지에서만 사용됨)
 * @returns 리뷰 목록 데이터와 상태 정보를 포함한 React Query 객체
 *
 * @remarks
 * - ISR 방식: 리뷰 데이터는 주기적으로 갱신되지 않고, 리뷰 등록 등의 이벤트 이후 수동 무효화로 갱신됨.
 * - `staleTime`은 3분이며, 3분 이내 재요청 시 캐시된 데이터가 사용됩니다.
 * - `initialData`는 첫 페이지(`page === 1`)에만 적용되어 SSG/ISR 시 초기 렌더 성능을 높입니다.
 * - 이후 리뷰 등록 시, `queryClient.invalidateQueries(['activity-reviews', activityId, 1])`를 통해 **1페이지 데이터만 수동 무효화**하여 갱신합니다.
 */
export const useActivityReviews = (
  activityId: number,
  page: number,
  size = 3,
  initialData?: ReviewList,
) => {
  return useQuery<ReviewList>({
    queryKey: ['activity-reviews', activityId, page],
    queryFn: () => getActivityReviews(activityId, page, size),
    initialData: page === 1 ? initialData : undefined,
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5, // 5분
    enabled: !!activityId,
  });
};
