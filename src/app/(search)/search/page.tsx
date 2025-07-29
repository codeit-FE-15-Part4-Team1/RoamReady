'use client';

import { useSearchParams } from 'next/navigation';

import DesktopSearchView from '@/domain/Activity/components/search/DesktopSearchView';
import MobileSearchView from '@/domain/Activity/components/search/MobileSearchView';
import TabletSearchView from '@/domain/Activity/components/search/TabletSearchView';
import { useBreakpoint } from '@/domain/Activity/hooks/main/useBreakpoint';
import { useInfiniteActivities } from '@/domain/Activity/hooks/main/useInfiniteActivities';
import { GetActivitiesRequestQuery } from '@/domain/Activity/schemas/main';

export type SortOption = NonNullable<GetActivitiesRequestQuery['sort']>;

/**
 * 활동 검색 페이지
 */
export default function ActivitySearchPage() {
  const breakpoint = useBreakpoint();
  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword') || undefined;
  const category = searchParams.get(
    'category',
  ) as GetActivitiesRequestQuery['category'];
  const sort = (searchParams.get('sort') ?? 'latest') as SortOption;

  // 브레이크포인트에 따른 페이지 사이즈 설정
  const size =
    breakpoint === 'desktop' || breakpoint === 'wide'
      ? 12
      : breakpoint === 'laptop'
        ? 9
        : 8;

  // 무한 스크롤 데이터 가져오기
  const { activities, totalCount, isLoading, isFetchingNextPage, loaderRef } =
    useInfiniteActivities({
      keyword,
      category,
      sort,
      size,
    });

  const commonProps = {
    activities,
    totalCount,
    isLoading,
    isFetchingNextPage,
    loaderRef,
  };

  // 브레이크포인트에 따른 뷰 렌더링
  if (
    breakpoint === 'laptop' ||
    breakpoint === 'desktop' ||
    breakpoint === 'wide'
  ) {
    return <DesktopSearchView breakpoint={breakpoint} {...commonProps} />;
  }

  if (breakpoint === 'tablet') {
    return <TabletSearchView {...commonProps} />;
  }

  return <MobileSearchView {...commonProps} />;
}
