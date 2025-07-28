'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import ActivityCard from '@/domain/Activity/components/main/ActivityCard';
import ActivityCardSkeleton from '@/domain/Activity/components/main/ActivityCardSkeleton';
import { activitiesKeys } from '@/domain/Activity/libs/main/queryKeys';
import { getActivities } from '@/domain/Activity/services/main/getActivities';
import Pagination from '@/shared/components/ui/Pagination';

export default function ActivitySection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? 1);

  const { data, isPending } = useQuery({
    queryKey: activitiesKeys.list({ page: currentPage }),
    queryFn: () =>
      getActivities({ method: 'offset', page: currentPage, size: 10 }),
  });

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(page));
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const activities = data?.activities ?? [];
  const totalPages = data ? Math.ceil((data?.totalCount ?? 0) / 10) : 1;

  return (
    <article>
      <section className='mb-5'>
        <h2 className='font-size-18 desktop:font-size-20 font-bold text-gray-900'>
          🕺 모든 체험
        </h2>
      </section>
      <section className='grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'>
        {isPending
          ? Array.from({ length: 10 }).map((_, i) => (
              <ActivityCardSkeleton key={`skeleton-${i}`} />
            ))
          : activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
      </section>
      <div className='mt-30'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </article>
  );
}
