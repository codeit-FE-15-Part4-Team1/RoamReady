'use client';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';

import ReservationCalendar from '@/domain/Reservation/components/reservation-calendar/ReservationCalendar';
import ReservationSelect from '@/domain/Reservation/components/reservation-calendar/ReservationSelect';
import ReservationSkeleton from '@/domain/Reservation/components/reservation-calendar/ReservationSkeleton';
import { getReservationDashboard } from '@/domain/Reservation/services/reservation-calendar';

import type { Activity } from '../../types/reservation';

export default function ReservationDashboard({
  initialActivities,
}: {
  initialActivities: Activity[];
}) {
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(
    initialActivities[0]?.id ?? null,
  );
  const [currentDate, setCurrentDate] = useState(dayjs());

  // useQuery로 데이터 관리
  const {
    data: monthlyReservations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      'reservationDashboard',
      selectedActivityId,
      currentDate.year(),
      currentDate.month(),
    ],
    queryFn: () => {
      const year = currentDate.year();
      const month = currentDate.format('MM');

      return getReservationDashboard(
        selectedActivityId!.toString(),
        year.toString(),
        month,
      );
    },
    enabled: !!selectedActivityId,
  });

  const handleSelectActivity = (id: number) => {
    setSelectedActivityId(id);
  };

  const handleMonthChange = (newDate: dayjs.Dayjs) => {
    setCurrentDate(newDate);
  };

  if (isLoading) return <ReservationSkeleton />;
  if (isError) return <div> 오류가 발생했습니다.</div>;

  return (
    <>
      <div className='w-full'>
        <ReservationSelect
          activities={initialActivities}
          selectedId={selectedActivityId ?? 0}
          onSelect={handleSelectActivity}
        />
      </div>
      <div className='w-full'>
        <ReservationCalendar
          currentDate={currentDate}
          monthlyReservations={monthlyReservations || []}
          selectedActivityId={selectedActivityId ?? 0}
          onMonthChange={handleMonthChange}
        />
      </div>
    </>
  );
}
