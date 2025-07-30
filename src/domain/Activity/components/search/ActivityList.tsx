import { RefObject } from 'react';

import ActivityCard from '@/domain/Activity/components/main/ActivityCard';
import { Activity } from '@/domain/Activity/schemas/main';

interface ActivityListProps {
  activities: Activity[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  loaderRef: RefObject<HTMLDivElement | null>;
  gridClass?: string;
}

/**
 * 활동 목록 컴포넌트
 */
export default function ActivityList({
  activities,
  isLoading,
  isFetchingNextPage,
  loaderRef,
  gridClass = 'grid-cols-2',
}: ActivityListProps) {
  return (
    <div className='w-full'>
      <div className={`grid gap-20 ${gridClass}`}>
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      <div ref={loaderRef} className='h-10' />

      {isFetchingNextPage && (
        <div className='py-8 text-center text-gray-400'>
          <div className='inline-flex items-center gap-2'>
            <div className='h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500'></div>
            불러오는 중...
          </div>
        </div>
      )}

      {activities.length === 0 && !isLoading && (
        <div className='py-32 text-center text-gray-400'>
          <div className='mb-4 text-6xl'>🔍</div>
          <div className='mb-2 text-lg font-medium'>검색 결과가 없습니다</div>
          <div className='text-sm'>다른 키워드로 검색해보세요</div>
        </div>
      )}
    </div>
  );
}
