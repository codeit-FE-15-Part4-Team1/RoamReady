'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState, useTransition } from 'react';

import ActivityCard from '@/domain/Activity/components/main/ActivityCard';
import ActivityCardSkeleton from '@/domain/Activity/components/main/ActivityCard/ActivityCardSkeleton';
import ActivityFilter from '@/domain/Activity/components/main/ActivityFilter';
import { useResponsiveSize } from '@/domain/Activity/hooks/main/useResponsiveSize';
import { activitiesKeys } from '@/domain/Activity/libs/main/queryKeys';
import { GetActivitiesRequestQuery } from '@/domain/Activity/schemas/main';
import { getActivities } from '@/domain/Activity/services/main/getActivities';
import Pagination from '@/shared/components/ui/Pagination';
import { cn } from '@/shared/libs/cn';

type SortOption = NonNullable<GetActivitiesRequestQuery['sort']>;

interface ActivitySectionClientProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ActivitySectionClient({
  searchParams,
}: ActivitySectionClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const pageSize = useResponsiveSize();
  const [isPending, startTransition] = useTransition();

  // 내부 상태로 관리
  const [internalParams, setInternalParams] = useState(() => {
    const page = Math.max(1, Number(searchParams?.page ?? 1));
    const category =
      (searchParams?.category as GetActivitiesRequestQuery['category']) ||
      undefined;
    const sort = ((searchParams?.sort as SortOption) || 'latest') ?? 'latest';
    return { page, category, sort };
  });

  // searchParams가 변경되면 내부 상태 업데이트
  useEffect(() => {
    const page = Math.max(1, Number(searchParams?.page ?? 1));
    const category =
      (searchParams?.category as GetActivitiesRequestQuery['category']) ||
      undefined;
    const sort = ((searchParams?.sort as SortOption) || 'latest') ?? 'latest';
    setInternalParams({ page, category, sort });
  }, [searchParams]);

  const queryParams = {
    ...internalParams,
    size: pageSize,
    method: 'offset' as const,
  };

  const { data, isFetching, isLoading } = useQuery({
    queryKey: activitiesKeys.list(queryParams),
    queryFn: () => getActivities(queryParams),
    staleTime: 0,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const activities = data?.activities ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const safeCurrentPage = Math.min(
    internalParams.page,
    Math.max(1, totalPages),
  );

  const createURLWithParams = useCallback(
    (newParams: Record<string, string>) => {
      const urlSearchParams = new URLSearchParams();

      // 기존 파라미터 중에서 필요한 것만 복사 (중복 인코딩 방지)
      const validParams = [
        'page',
        'category',
        'sort',
        'keyword',
        'date',
        'location',
      ];
      Object.entries(searchParams).forEach(([key, value]) => {
        if (validParams.includes(key)) {
          if (typeof value === 'string') {
            urlSearchParams.set(key, value);
          } else if (Array.isArray(value)) {
            // 배열의 첫 번째 값만 사용
            if (value.length > 0) {
              urlSearchParams.set(key, value[0]);
            }
          }
        }
      });

      // 새로운 파라미터 적용
      Object.entries(newParams).forEach(([key, value]) => {
        if (value) {
          urlSearchParams.set(key, value);
        } else {
          urlSearchParams.delete(key);
        }
      });

      return `${pathname}?${urlSearchParams.toString()}`;
    },
    [pathname, searchParams],
  );

  const handleCategoryChange = useCallback(
    (category: GetActivitiesRequestQuery['category']) => {
      setInternalParams((prev) => ({ ...prev, category, page: 1 }));
      startTransition(() => {
        const newUrl = createURLWithParams({
          category: category || '',
          page: '1',
        });
        router.push(newUrl, { scroll: false });
      });
    },
    [createURLWithParams, router],
  );

  const handleSortChange = useCallback(
    (sort: SortOption) => {
      setInternalParams((prev) => ({ ...prev, sort, page: 1 }));
      startTransition(() => {
        const newUrl = createURLWithParams({
          sort,
          page: '1',
        });
        router.push(newUrl, { scroll: false });
      });
    },
    [createURLWithParams, router],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setInternalParams((prev) => ({ ...prev, page }));
      startTransition(() => {
        const newUrl = createURLWithParams({ page: page.toString() });
        router.push(newUrl, { scroll: false });
      });
    },
    [createURLWithParams, router],
  );

  // 초기 로딩일 때만 스켈레톤 표시
  if (isLoading) {
    return (
      <section className=''>
        {/* 헤더 스켈레톤 */}
        <div className='bg-brand-1 desktop:h-40 desktop:w-137 h-36 w-127 animate-pulse rounded-2xl' />

        {/* 필터 스켈레톤 */}
        <div className='py-8 pb-12'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-8 px-4 py-12'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className='bg-brand-1 h-36 w-80 animate-pulse rounded-full'
                />
              ))}
            </div>
            <div className='bg-brand-1 h-36 w-120 animate-pulse rounded-full' />
          </div>
        </div>

        {/* 카드 그리드 스켈레톤 */}
        <div className='grid grid-cols-2 gap-24 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'>
          {Array.from({ length: pageSize }).map((_, index) => (
            <ActivityCardSkeleton key={index} />
          ))}
        </div>

        {/* 페이지네이션 스켈레톤 */}
        <div className='bg-brand-1 mx-auto mt-80 mb-40 h-40 w-1/3 animate-pulse rounded' />
      </section>
    );
  }

  return (
    <section className=''>
      <h2 className='font-size-24 desktop:font-size-26 w-fit font-bold text-neutral-800'>
        🏃 모든 체험
      </h2>

      <ActivityFilter
        category={internalParams.category}
        sort={internalParams.sort}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />

      <div
        className={cn('relative transition-opacity', {
          'opacity-50 duration-300': isPending || isFetching,
        })}
      >
        {activities.length > 0 ? (
          <>
            <div className='grid grid-cols-2 gap-24 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'>
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className='mt-80 mb-40 flex justify-center'>
                <Pagination
                  currentPage={safeCurrentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <div className='flex-center py-80'>
            <p className='text-gray-500'>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}
