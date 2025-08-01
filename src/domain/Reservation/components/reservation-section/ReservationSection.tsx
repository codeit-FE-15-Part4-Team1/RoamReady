'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

import ReservationList from '@/domain/Reservation/components/reservation-section/ReservationList';
import ReservationStatusFilter from '@/domain/Reservation/components/reservation-section/ReservationStatusFilter';
import ReservationSectionSkeleton from '@/domain/Reservation/components/skeleton/ReservationSectionSkeleton';
import { ReservationStatus } from '@/domain/Reservation/schemas/reservation';
import { getMyReservation } from '@/domain/Reservation/services/reservation';
import Nothing from '@/shared/components/ui/nothing';

export default function ReservationSection() {
  const [selectedStatus, setSelectedStatus] = useState<
    ReservationStatus | undefined
  >(undefined);

  const handleStatusChange = (status: ReservationStatus | undefined) => {
    setSelectedStatus(status);
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['my-reservations', selectedStatus],
    queryFn: ({ pageParam }) =>
      getMyReservation({
        status: selectedStatus,
        cursorId: pageParam,
        size: 10,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.cursorId || undefined,
    staleTime: 0, // 데이터를 항상 fresh하지 않게 설정
    gcTime: 0, // 캐시 시간을 0으로 설정
    refetchOnMount: true, // 컴포넌트 마운트 시 항상 refetch
    refetchOnWindowFocus: true, // 윈도우 포커스 시 refetch
  });

  // 모든 페이지의 예약 데이터를 평탄화
  const allReservations =
    data?.pages?.flatMap((page) => page.reservations) ?? [];

  return (
    <div>
      {isLoading ? (
        <ReservationSectionSkeleton />
      ) : isError ? (
        <div className='flex-center my-200 flex-1'>
          <p>에러가 발생했습니다: {error?.message}</p>
        </div>
      ) : (
        <>
          <ReservationStatusFilter
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
          />
          {allReservations.length > 0 ? (
            <ReservationList
              reservations={allReservations}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              onLoadMore={fetchNextPage}
            />
          ) : (
            <div className='flex-center my-200 flex-1'>
              <Nothing type='reservation' />
            </div>
          )}
        </>
      )}
    </div>
  );
}
