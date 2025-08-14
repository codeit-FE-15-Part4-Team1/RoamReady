import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import {
  getReservationsBySchedule,
  getSchedulesByDate,
  ScheduleItem,
} from '@/domain/Reservation/services/reservation-calendar';
import { ReservationItem } from '@/domain/Reservation/types/reservation';

interface UseReservationQueriesProps {
  selectedActivityId: number | null;
  day: dayjs.Dayjs;
}

export const useReservationQueries = ({
  selectedActivityId,
  day,
}: UseReservationQueriesProps) => {
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  );

  //  1. 날짜별 스케줄 조회 (useQuery)
  const { data: schedules = [] } = useQuery<ScheduleItem[] | null>({
    queryKey: ['schedules', selectedActivityId, day.format('YYYY-MM-DD')],
    queryFn: () =>
      getSchedulesByDate(selectedActivityId!, day.format('YYYY-MM-DD')),
    enabled: !!selectedActivityId,
  });

  useEffect(() => {
    if (schedules && schedules.length > 0 && !selectedScheduleId) {
      // pending 예약이 있는 첫 번째 스케줄 찾기
      const scheduleWithPending = schedules.find((s) => s.count.pending > 0);
      // pending이 있으면 그것을, 없으면 첫 번째 스케줄 선택
      const targetSchedule = scheduleWithPending || schedules[0];
      setSelectedScheduleId(targetSchedule.scheduleId);
    }
  }, [schedules, selectedScheduleId]);

  //  2. 모든 스케줄의 예약 목록 조회 (통합 버전)
  const {
    data: reservationsByStatus = { pending: [], confirmed: [], declined: [] },
  } = useQuery<{
    pending: ReservationItem[];
    confirmed: ReservationItem[];
    declined: ReservationItem[];
  }>({
    queryKey: [
      'allReservationsByDate',
      selectedActivityId,
      day.format('YYYY-MM-DD'),
    ],
    queryFn: async () => {
      if (!schedules || schedules.length === 0) {
        return { pending: [], confirmed: [], declined: [] };
      }

      // 모든 스케줄의 예약을 병렬로 조회
      const allPendingPromises = schedules.map((schedule) =>
        getReservationsBySchedule(
          selectedActivityId!,
          schedule.scheduleId,
          'pending',
        ),
      );
      const allConfirmedPromises = schedules.map((schedule) =>
        getReservationsBySchedule(
          selectedActivityId!,
          schedule.scheduleId,
          'confirmed',
        ),
      );
      const allDeclinedPromises = schedules.map((schedule) =>
        getReservationsBySchedule(
          selectedActivityId!,
          schedule.scheduleId,
          'declined',
        ),
      );

      const [pendingResults, confirmedResults, declinedResults] =
        await Promise.all([
          Promise.all(allPendingPromises),
          Promise.all(allConfirmedPromises),
          Promise.all(allDeclinedPromises),
        ]);

      return {
        pending: pendingResults
          .flat()
          .filter((item): item is ReservationItem => item !== null),
        confirmed: confirmedResults
          .flat()
          .filter((item): item is ReservationItem => item !== null),
        declined: declinedResults
          .flat()
          .filter((item): item is ReservationItem => item !== null),
      };
    },
    enabled: !!selectedActivityId && !!schedules?.length,
  });
  return {
    schedules,
    reservationsByStatus,
    selectedScheduleId,
    setSelectedScheduleId,
  };
};
