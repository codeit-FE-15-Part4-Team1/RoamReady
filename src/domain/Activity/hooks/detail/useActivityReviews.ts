// hooks/useActivityReviews.ts
import { useQuery } from '@tanstack/react-query';

import { getActivityReviews } from '@/domain/Activity/services/detail';
import type { ReviewList } from '@/domain/Activity/types/detail/types';

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
    staleTime: 0,
    enabled: !!activityId,
  });
};
