import { Dayjs } from 'dayjs';
import { useMemo } from 'react';

import type { ScheduleItem } from '@/domain/Reservation/services/reservation-calendar';
import type { ReservationStatus } from '@/domain/Reservation/types/reservation';

interface UseReservationCountsProps {
  schedules: ScheduleItem[] | null;
  day: Dayjs;
}

export function useReservationCounts({
  schedules,
  day,
}: UseReservationCountsProps) {
  const reservationCounts = useMemo(() => {
    const counts = schedules?.reduce(
      (acc, schedule) => {
        acc.pending += schedule.count.pending;
        acc.confirmed += schedule.count.confirmed;
        acc.declined += schedule.count.declined;
        return acc;
      },
      { pending: 0, confirmed: 0, declined: 0 },
    ) ?? { pending: 0, confirmed: 0, declined: 0 };

    return counts;
  }, [schedules, day]);

  const displayItems = useMemo(() => {
    const items: { status: ReservationStatus; count: number }[] = [];
    if (reservationCounts.pending > 0) {
      items.push({ status: 'pending', count: reservationCounts.pending });
    }
    if (reservationCounts.confirmed > 0) {
      items.push({ status: 'confirmed', count: reservationCounts.confirmed });
    }
    if (reservationCounts.declined > 0) {
      items.push({ status: 'declined', count: reservationCounts.declined });
    }
    return items;
  }, [reservationCounts]);

  const totalReservations = useMemo(() => {
    return (
      reservationCounts.pending +
      reservationCounts.confirmed +
      reservationCounts.declined
    );
  }, [reservationCounts]);

  return {
    reservationCounts,
    displayItems,
    totalReservations,
  };
}
