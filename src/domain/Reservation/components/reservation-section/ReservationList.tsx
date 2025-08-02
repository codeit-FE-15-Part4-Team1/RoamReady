import { useEffect, useRef } from 'react';

import ReservationCard from '@/domain/Reservation/components/reservation-card/ReservationCard';
import { ReservationListSkeleton } from '@/domain/Reservation/components/skeleton/ReservationSectionSkeleton';
import { Reservation } from '@/domain/Reservation/schemas/reservation';

interface ReservationListProps {
  reservations: Reservation[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
}

export default function ReservationList({
  reservations,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: ReservationListProps) {
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
      {reservations.map((reservation) => (
        <div key={reservation.id} className='mb-30'>
          <ReservationCard reservation={reservation} />
        </div>
      ))}
      {hasNextPage && (
        <div ref={observerRef}>
          {isFetchingNextPage && <ReservationListSkeleton />}
        </div>
      )}
    </div>
  );
}
