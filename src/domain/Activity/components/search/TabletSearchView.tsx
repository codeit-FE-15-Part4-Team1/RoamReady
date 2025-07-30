import { RefObject, useEffect, useState } from 'react';

import { Activity } from '@/domain/Activity/schemas/main';
import Button from '@/shared/components/Button';

import ActivityList from './ActivityList';
import MapPlaceholder from './MapPlaceholder';
import SearchHeader from './SearchHeader';

interface TabletSearchViewProps {
  activities: Activity[];
  totalCount: number;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  loaderRef: RefObject<HTMLDivElement | null>;
}

/**
 * 태블릿 화면용 검색 뷰 (지도/목록 토글)
 */
export default function TabletSearchView({
  activities,
  totalCount,
  isLoading,
  isFetchingNextPage,
  loaderRef,
}: TabletSearchViewProps) {
  const [view, setView] = useState<'map' | 'list'>('list');

  // 브레이크포인트가 변경되면 목록 뷰로 리셋
  useEffect(() => {
    setView('list');
  }, []);

  if (view === 'map') {
    return (
      <div className='fixed inset-0 z-40 h-screen w-screen overflow-hidden'>
        {/* 화면에 꽉찬 지도 */}
        <div className='h-full w-full'>
          <MapPlaceholder />
        </div>

        {/* floating toggle button for map view */}
        <div className='pointer-events-none fixed bottom-100 left-0 z-50 flex w-full justify-center'>
          <div className='pointer-events-auto flex rounded-2xl shadow-xl'>
            <Button
              variant='primary'
              onClick={() => setView('list')}
              className='font-size-16 rounded-2xl px-24 py-10'
            >
              목록 보기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='relative min-h-screen w-full bg-white'>
      <SearchHeader totalCount={totalCount} />

      {/* 목록 UI - grid 2개 */}
      <div className='flex min-h-screen w-full flex-col pb-24'>
        <div className='flex-1'>
          <ActivityList
            activities={activities}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            loaderRef={loaderRef}
            gridClass='grid-cols-2'
          />
        </div>
      </div>

      {/* floating toggle button for list view */}
      <div className='pointer-events-none fixed bottom-100 left-0 z-50 flex w-full justify-center'>
        <div className='pointer-events-auto flex rounded-2xl shadow-xl'>
          <Button
            variant='primary'
            onClick={() => setView('map')}
            className='font-size-16 rounded-2xl px-24 py-10 transition hover:scale-105 hover:bg-blue-500'
          >
            지도 표시하기
          </Button>
        </div>
      </div>
    </div>
  );
}
