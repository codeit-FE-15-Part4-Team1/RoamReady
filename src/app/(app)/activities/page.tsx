import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import ActivitySearchBar from '@/domain/Activity/components/main/ActivitySearch/ActivitySearchBar';
import ActivityCarousel from '@/domain/Activity/components/main/ActivitySection/ActivityCarousel';
import ActivitySection from '@/domain/Activity/components/main/ActivitySection/ActivitySection';
import { activitiesKeys } from '@/domain/Activity/libs/main/queryKeys';
import { GetActivitiesOffsetResponse } from '@/domain/Activity/schemas/main';
import { getActivities } from '@/domain/Activity/services/main/getActivities';

interface ActivityPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

// 서버에서 사용할 기본 사이즈 (모바일 기준)
const DEFAULT_PAGE_SIZE = 8;

export default async function ActivityPage({
  searchParams,
}: ActivityPageProps) {
  const queryClient = new QueryClient();
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page ?? 1);

  await Promise.all([
    // 캐러셀 데이터 (리뷰 순)
    queryClient.prefetchQuery({
      queryKey: activitiesKeys.list({ sort: 'most_reviewed' }),
      queryFn: () =>
        getActivities({
          method: 'offset',
          page: 1,
          size: 10,
          sort: 'most_reviewed',
        }),
    }),

    // 페이지네이션 목록 데이터 (현재 페이지) - 기본 사이즈로 prefetch
    queryClient.prefetchQuery({
      queryKey: activitiesKeys.list({ page: currentPage }),
      queryFn: () =>
        getActivities({
          method: 'offset',
          page: currentPage,
          size: DEFAULT_PAGE_SIZE,
        }),
    }),
  ]);

  // 서버에서 prefetch한 데이터를 가져와 캐러셀 props로 전달
  const carouselData = (await queryClient.getQueryData(
    activitiesKeys.list({ sort: 'most_reviewed' }),
  )) as GetActivitiesOffsetResponse;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='space-y-60'>
        <div className='flex-col-center gap-20 py-40'>
          <h1 className='font-size-30 font-bold text-neutral-800'>
            무엇을 체험하고 싶으신가요?
          </h1>
          <ActivitySearchBar />
        </div>
        <ActivityCarousel
          activities={carouselData?.activities?.slice(0, 10) ?? []}
        />
        <ActivitySection />
      </div>
    </HydrationBoundary>
  );
}
