import { RefObject } from 'react';

import { Activity } from '@/domain/Activity/schemas/main';
import { BottomSheet } from '@/shared/components/ui/bottom-sheet';

import ActivityList from './ActivityList';
import MapPlaceholder from './MapPlaceholder';

interface MobileSearchViewProps {
  activities: Activity[];
  totalCount: number;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  loaderRef: RefObject<HTMLDivElement | null>;
}

/**
 * 모바일 화면용 검색 뷰 (지도 + 바텀시트)
 */
export default function MobileSearchView({
  activities,
  totalCount,
  isLoading,
  isFetchingNextPage,
  loaderRef,
}: MobileSearchViewProps) {
  return (
    <div className='relative h-screen overflow-hidden'>
      {/* 지도가 메인 컨텐츠 - 화면 전체 차지 */}
      <div className='absolute inset-0 h-full w-full'>
        <MapPlaceholder />
      </div>

      {/* 바텀시트: 카드 렌더링 */}
      <BottomSheet.Root open>
        <BottomSheet.Content>
          <BottomSheet.Header>
            <div className='flex items-center justify-between'>
              <span className='font-size-20 font-bold'>체험 목록</span>
              <span className='font-size-14 text-neutral-400'>
                총 {totalCount}건
              </span>
            </div>
          </BottomSheet.Header>

          <div className='py-12'>
            <ActivityList
              activities={activities}
              isLoading={isLoading}
              isFetchingNextPage={isFetchingNextPage}
              loaderRef={loaderRef}
              gridClass='grid-cols-2'
            />
          </div>
        </BottomSheet.Content>
      </BottomSheet.Root>
    </div>
  );
}
