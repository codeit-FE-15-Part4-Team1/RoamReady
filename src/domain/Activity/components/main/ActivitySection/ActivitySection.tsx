'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import ActivityCard from '@/domain/Activity/components/main/ActivityCard';
import ActivityCardSkeleton from '@/domain/Activity/components/main/ActivityCard/ActivityCardSkeleton';
import ActivityFilter from '@/domain/Activity/components/main/ActivityFilter';
import { useResponsiveSize } from '@/domain/Activity/hooks/main/useResponsiveSize';
import { GetActivitiesRequestQuery } from '@/domain/Activity/schemas/main';
import { getActivities } from '@/domain/Activity/services/main/getActivities';
import Pagination from '@/shared/components/ui/Pagination';

export type SortOption = NonNullable<GetActivitiesRequestQuery['sort']>;

export default function ActivitySection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageSize = useResponsiveSize();

  const currentPage = Number(searchParams.get('page') ?? 1);
  const category = searchParams.get(
    'category',
  ) as GetActivitiesRequestQuery['category'];
  const sort = (searchParams.get('sort') ?? 'latest') as SortOption;

  const { data, error, isPending } = useQuery({
    queryKey: ['activities', 'list', currentPage, category, sort, pageSize],

    queryFn: () => {
      const apiParams: {
        method: 'offset';
        page: number;
        size: number;
        sort: SortOption;
        category?: GetActivitiesRequestQuery['category'];
      } = {
        method: 'offset',
        page: currentPage,
        size: pageSize,
        sort,
      };

      if (category) {
        apiParams.category = category;
      }

      return getActivities(apiParams);
    },
  });

  const handleFilterChange = useCallback(
    (key: 'category' | 'sort', value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.set('page', '1');
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams.toString()],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(page));
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams.toString()],
  );

  const activities = data?.activities ?? [];
  const totalPages = data ? Math.ceil((data?.totalCount ?? 0) / pageSize) : 1;

  return (
    <article>
      <section className='mb-5'>
        <h2 className='font-size-24 desktop:font-size-26 mb-10 font-bold text-gray-900'>
          🕺 모든 체험
        </h2>
      </section>
      <ActivityFilter
        category={category}
        sort={sort}
        onCategoryChange={(newCategory) =>
          handleFilterChange('category', newCategory)
        }
        onSortChange={(newSort) => handleFilterChange('sort', newSort)}
      />
      <section className='grid grid-cols-2 gap-20 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'>
        {isPending
          ? Array.from({ length: pageSize }).map((_, i) => (
              <ActivityCardSkeleton key={`skeleton-${i}`} />
            ))
          : activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
      </section>
      <div className='my-40 mt-60'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </article>
  );
}
