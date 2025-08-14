import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback } from 'react';

import { updateReservationStatus } from '@/domain/Reservation/services/reservation-calendar';
import type { ReservationItem } from '@/domain/Reservation/types/reservation';
import { useToast } from '@/shared/hooks/useToast';

interface UseReservationMutationsProps {
  selectedActivityId: number | null;
  day: dayjs.Dayjs;
  reservationsByStatus: {
    pending: ReservationItem[];
    confirmed: ReservationItem[];
    declined: ReservationItem[];
  };
}

export const useReservationMutations = ({
  selectedActivityId,
  day,
  reservationsByStatus,
}: UseReservationMutationsProps) => {
  const queryClient = useQueryClient();
  const { showSuccess } = useToast();

  // 하나 승인 후 나머지 거절 처리
  const { mutate: approveAndDecline, isPending: isApproving } = useMutation({
    mutationFn: async (variables: {
      reservationId: number;
      scheduleId: number;
      reservationsToDecline: ReservationItem[];
    }) => {
      const { reservationId, reservationsToDecline } = variables;
      await updateReservationStatus({
        activityId: selectedActivityId!,
        reservationId,
        status: 'confirmed',
      });
      await Promise.all(
        reservationsToDecline.map((r) =>
          updateReservationStatus({
            activityId: selectedActivityId!,
            reservationId: r.id,
            status: 'declined',
          }),
        ),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'allReservationsByDate',
          selectedActivityId,
          day.format('YYYY-MM-DD'),
        ],
      });
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['reservationDashboard'] });
    },
    onError: (error) => console.error('예약 승인 처리 중 오류:', error),
  });

  // 4. '단일 거절' 로직을 처리하는 뮤테이션
  const { mutate: reject, isPending: isRejecting } = useMutation({
    mutationFn: (variables: { reservationId: number }) =>
      updateReservationStatus({
        activityId: selectedActivityId!,
        reservationId: variables.reservationId,
        status: 'declined',
      }),
    onSuccess: () => {
      showSuccess('거절되었습니다.');
      queryClient.invalidateQueries({
        queryKey: [
          'allReservationsByDate',
          selectedActivityId,
          day.format('YYYY-MM-DD'),
        ],
      });
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['reservationDashboard'] });
    },
    onError: (error) => console.error('거절 실패:', error),
  });

  // 핸들러 함수들
  const handleApprove = useCallback(
    (reservationId: number, scheduleId: number) => {
      if (isApproving) return;
      const reservationsToDecline = reservationsByStatus.pending.filter(
        (r: ReservationItem) =>
          r.scheduleId === scheduleId && r.id !== reservationId,
      );
      approveAndDecline({ reservationId, scheduleId, reservationsToDecline });
      showSuccess('승인되었습니다.');
    },
    [approveAndDecline, isApproving, reservationsByStatus.pending, showSuccess],
  );

  const handleReject = useCallback(
    (reservationId: number) => {
      if (isRejecting) return;
      reject({ reservationId });
      showSuccess('거절되었습니다.');
    },
    [reject, isRejecting, showSuccess],
  );

  return {
    handleApprove,
    handleReject,
    isLoading: isApproving || isRejecting,
  };
};
