import { RefObject } from 'react';

import { Breakpoint } from '@/domain/Activity/hooks/main/useBreakpoint';
import { useDynamicStickyHeight } from '@/domain/Activity/hooks/main/useDynamicStickyHeight';
import { Activity } from '@/domain/Activity/schemas/main';

import ActivityList from './ActivityList';
import MapPlaceholder from './MapPlaceholder';
import SearchHeader from './SearchHeader';

interface DesktopSearchViewProps {
  breakpoint: Breakpoint;
  activities: Activity[];
  totalCount: number;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  loaderRef: RefObject<HTMLDivElement | null>;
}

/**
 * 데스크톱 및 XL 화면용 검색 뷰 (좌우 분할)
 */
export default function DesktopSearchView({
  breakpoint,
  activities,
  totalCount,
  isLoading,
  isFetchingNextPage,
  loaderRef,
}: DesktopSearchViewProps) {
  // 동적 sticky 높이 계산 - 새로운 SearchHeader 높이에 맞춰 offset 조정
  const { heightValue } = useDynamicStickyHeight({
    additionalOffset: 70, // SearchHeader(메인 132px + 필터 72px) 높이 고려
    bottomMargin: 0,
  });

  // laptop 이상: grid 2개, desktop 이상: grid 3개
  const gridClass =
    breakpoint === 'desktop' || breakpoint === 'wide'
      ? 'grid-cols-3'
      : 'grid-cols-2';

  return (
    <div>
      <div className='flex flex-row gap-30'>
        {/* 왼쪽: 카드 리스트 - 스크롤 가능 */}
        <div className='min-h-screen flex-1'>
          <SearchHeader totalCount={totalCount} />
          <ActivityList
            activities={activities}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            loaderRef={loaderRef}
            gridClass={gridClass}
          />
        </div>

        {/* 오른쪽: 지도 - sticky로 고정, 동적 높이 계산 */}
        <div className='flex-1'>
          <div
            className='sticky'
            style={{
              top: 204, // 새로운 SearchHeader 총 높이에 맞춘 조정
              height: heightValue,
            }}
          >
            <MapPlaceholder />
          </div>
        </div>
      </div>
    </div>
  );
}
