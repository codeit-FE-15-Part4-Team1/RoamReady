'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import MyActivityList from '@/domain/Reservation/components/my-activity-section/MyActivityList';
import MyActivitySectionSkeleton from '@/domain/Reservation/components/skeleton/MyActivitySectionSkeleton';
import { getMyActivities } from '@/domain/Reservation/services/activity';
import Nothing from '@/shared/components/ui/nothing';

/**
 * 내 체험 관리 섹션 컴포넌트
 */
export default function MyActivitySection() {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['my-activities'],
    queryFn: ({ pageParam }) => {
      const params: { size: number; cursorId?: number } = { size: 10 };
      if (pageParam !== undefined) {
        params.cursorId = pageParam;
      }
      return getMyActivities(params);
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.cursorId || undefined,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  // 모든 페이지의 체험 데이터를 평탄화
  const allActivities = data?.pages?.flatMap((page) => page.activities) ?? [];

  return (
    <div>
      {isLoading ? (
        <MyActivitySectionSkeleton />
      ) : isError ? (
        <div className='flex-center my-200 flex-1'>
          <p>에러가 발생했습니다: {error?.message}</p>
        </div>
      ) : (
        <>
          {allActivities.length > 0 ? (
            <MyActivityList
              activities={allActivities}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              onLoadMore={fetchNextPage}
            />
          ) : (
            <div className='flex-center my-200 flex-1'>
              <Nothing type='activity' />
            </div>
          )}
        </>
      )}
    </div>
  );
}
