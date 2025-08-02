import { useEffect, useRef } from 'react';

import MyActivityCard from '@/domain/Reservation/components/my-activity-card/MyActivityCard';
import { MyActivityListSkeleton } from '@/domain/Reservation/components/skeleton/MyActivitySectionSkeleton';
import { Activity } from '@/domain/Reservation/schemas/activity';

interface MyActivityListProps {
  activities: Activity[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
}

/**
 * 내 체험 목록을 표시하는 컴포넌트
 */
export default function MyActivityList({
  activities,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: MyActivityListProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          onLoadMore?.();
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  return (
    <div>
      {activities.map((activity) => (
        <div key={activity.id} className='mb-16'>
          <MyActivityCard activity={activity} />
        </div>
      ))}
      {hasNextPage && (
        <div ref={observerRef}>
          {isFetchingNextPage && <MyActivityListSkeleton />}
        </div>
      )}
    </div>
  );
}
