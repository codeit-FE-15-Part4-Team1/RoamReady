import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef } from 'react';

import {
  Activity,
  GetActivitiesRequestQuery,
} from '@/domain/Activity/schemas/main';
import { getActivities } from '@/domain/Activity/services/main/getActivities';

interface UseInfiniteActivitiesParams {
  keyword?: string;
  size: number;
  category?: GetActivitiesRequestQuery['category'];
  sort?: GetActivitiesRequestQuery['sort'];
}

interface QueryParams {
  page: number;
  size: number;
  keyword?: string;
  category?: GetActivitiesRequestQuery['category'];
  sort?: GetActivitiesRequestQuery['sort'];
}

/**
 * 무한 스크롤 방식으로 활동 목록을 가져오는 훅
 */
export function useInfiniteActivities({
  keyword,
  size,
  category,
  sort,
}: UseInfiniteActivitiesParams) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['activities-search', { keyword, size, category, sort }],
      queryFn: async ({ pageParam = 1 }) => {
        const params: QueryParams = { page: pageParam, size };
        if (keyword) params.keyword = keyword;
        if (category) params.category = category;
        if (sort) params.sort = sort;

        return await getActivities(params);
      },
      getNextPageParam: (lastPage, allPages) => {
        const loaded = allPages.reduce(
          (acc, page) => acc + page.activities.length,
          0,
        );
        if (loaded < lastPage.totalCount) {
          return allPages.length + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
    });

  // 모든 activities 합치기
  const activities: Activity[] = useMemo(
    () => (data ? data.pages.flatMap((page) => page.activities) : []),
    [data],
  );

  const totalCount = data?.pages?.[0]?.totalCount ?? 0;

  // Intersection Observer로 마지막 요소 감지
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const currentLoader = loaderRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    activities,
    totalCount,
    isLoading,
    isFetchingNextPage,
    loaderRef,
  };
}
