'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback } from 'react';

import ActivityCard from '@/domain/Activity/components/main/ActivityCard';
import ActivityCardSkeleton from '@/domain/Activity/components/main/ActivityCard/ActivityCardSkeleton';
import ActivityFilter from '@/domain/Activity/components/main/ActivityFilter';
import { useResponsiveSize } from '@/domain/Activity/hooks/main/useResponsiveSize';
import { GetActivitiesRequestQuery } from '@/domain/Activity/schemas/main';
import { getActivities } from '@/domain/Activity/services/main/getActivities';
import Pagination from '@/shared/components/ui/Pagination';

export type SortOption = NonNullable<GetActivitiesRequestQuery['sort']>;

function ActivitySectionContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageSize = useResponsiveSize();

  const currentPage = Number(searchParams.get('page') ?? 1);
  const category = searchParams.get(
    'category',
  ) as GetActivitiesRequestQuery['category'];
  const sort = (searchParams.get('sort') ?? 'latest') as SortOption;

  const { data, isPending } = useQuery({
    queryKey: ['activities', 'list', currentPage, category, sort, pageSize],
    queryFn: () =>
      getActivities({
        method: 'offset',
        page: currentPage,
        size: pageSize,
        category,
        sort,
      }),
    refetchOnWindowFocus: false,
  });

  const activities = data?.activities ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleFilterChange = useCallback(
    (key: 'category' | 'sort', value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      // 필터 변경 시 페이지를 첫 번째로 리셋
      params.delete('page');

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  return (
    <section className='space-y-40'>
      <h2 className='font-size-36 font-bold text-black'>🏃 모든 체험</h2>

      <ActivityFilter
        category={category}
        sort={sort}
        onCategoryChange={(newCategory) =>
          handleFilterChange('category', newCategory)
        }
        onSortChange={(newSort) => handleFilterChange('sort', newSort)}
      />

      {isPending ? (
        <div className='tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 grid grid-cols-1 gap-24'>
          {Array.from({ length: pageSize }).map((_, index) => (
            <ActivityCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className='tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 grid grid-cols-1 gap-24'>
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>

          {totalCount > 0 && (
            <div className='flex justify-center pt-40'>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default function ActivitySection() {
  return (
    <Suspense fallback={<div className='h-400'>로딩 중...</div>}>
      <ActivitySectionContent />
    </Suspense>
  );
}
