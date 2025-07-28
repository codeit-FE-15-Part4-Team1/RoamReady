'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  getReservationsBySchedule,
  getSchedulesByDate,
  ScheduleItem,
  updateReservationStatus,
} from '@/domain/Reservation/services/reservation-calendar';
import { BottomSheet } from '@/shared/components/ui/bottom-sheet';
import Tabs from '@/shared/components/ui/tabs';

import type {
  Reservation,
  ReservationItem,
  ReservationStatus,
} from '../../types/reservation';
import { getColorClassByStatus, STATUS_LABELS } from '../../utils/reservation';
import ReservationDetail from './ReservationDetail';

interface DayCellProps {
  day: dayjs.Dayjs;
  isCurrentMonth: boolean;
  isToday: boolean;
  isLastRow: boolean;
  reservation: Reservation | null;
  selectedActivityId: number | null;
}
// BottomSheet 닫기 버튼 컴포넌트
const CloseButton = ({ onClose }: { onClose: () => void }) => (
  <button type='button' onClick={onClose}>
    <X className='size-15 cursor-pointer font-bold' />
  </button>
);

export default function DayCellBottomSheet({
  day,
  isCurrentMonth,
  isToday,
  isLastRow,
  reservation,
  selectedActivityId,
}: DayCellProps) {
  const queryClient = useQueryClient();
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  );

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'pending' | 'confirmed' | 'declined'
  >('pending');

  const styles = useMemo(() => {
    const cellClasses = `
      relative flex min-w-[9rem] min-h-[12rem] cursor-pointer flex-col items-center py-12 cursor-pointer font-size-14
      hover:bg-gray-50 
      ${!isLastRow ? 'border-b-[0.05rem] border-gray-100' : ''} 
      ${!isCurrentMonth ? 'bg-gray-200 text-gray-400 opacity-50' : ''} 
      ${isToday ? 'border-blue-300 bg-blue-100' : ''}
    `;

    const dayOfWeek = day.day();
    const dateClasses = `font-size-14 ${
      dayOfWeek === 0
        ? 'text-red-500'
        : dayOfWeek === 6
          ? 'text-blue-500'
          : isCurrentMonth
            ? 'text-gray-900'
            : ''
    }`;

    return { cellClasses, dateClasses };
  }, [day, isCurrentMonth, isToday, isLastRow]);

  // 🔽 1. 날짜별 스케줄 조회 (useQuery)
  const { data: schedules = [] } = useQuery<ScheduleItem[] | null>({
    queryKey: ['schedules', selectedActivityId, day.format('YYYY-MM-DD')],
    queryFn: () =>
      getSchedulesByDate(selectedActivityId!, day.format('YYYY-MM-DD')),
    enabled: !!selectedActivityId,
  });

  console.log('schedules', schedules);

  // 스케줄 데이터가 로드되면 첫 번째 스케줄을 선택
  useEffect(() => {
    if (schedules && schedules.length > 0 && !selectedScheduleId) {
      setSelectedScheduleId(schedules[0].scheduleId);
    }
  }, [schedules, selectedScheduleId]);

  // 🔽 2. 선택된 시간대의 예약 목록 조회 (useQuery)
  const {
    data: reservationsByStatus = { pending: [], confirmed: [], declined: [] },
  } = useQuery<{
    pending: ReservationItem[];
    confirmed: ReservationItem[];
    declined: ReservationItem[];
  }>({
    queryKey: [
      'reservationsBySchedule',
      selectedScheduleId,
      day.format('YYYY-MM-DD'),
    ],
    queryFn: async () => {
      const [pending, confirmed, declined] = await Promise.all([
        getReservationsBySchedule(
          selectedActivityId!,
          selectedScheduleId!,
          'pending',
        ),
        getReservationsBySchedule(
          selectedActivityId!,
          selectedScheduleId!,
          'confirmed',
        ),
        getReservationsBySchedule(
          selectedActivityId!,
          selectedScheduleId!,
          'declined',
        ),
      ]);
      return {
        pending: pending || [],
        confirmed: confirmed || [],
        declined: declined || [],
      };
    },
    enabled: !!selectedScheduleId, // 스케줄 ID가 선택되었을 때만 실행
  });

  // 🔽 3. '하나 승인 후 나머지 거절' 비즈니스 로직을 처리하는 전용 뮤테이션
  const { mutate: approveAndDecline, isPending: isApproving } = useMutation({
    mutationFn: async (variables: {
      reservationId: number;
      scheduleId: number;
      reservationsToDecline: ReservationItem[];
    }) => {
      const { reservationId, reservationsToDecline } = variables;
      // 1. 선택한 예약 승인 처리
      await updateReservationStatus({
        activityId: selectedActivityId!,
        reservationId,
        status: 'confirmed',
      });
      // 2. 나머지 예약들 거절 처리
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
      // 성공 시 관련된 모든 쿼리를 무효화하여 UI 자동 업데이트
      queryClient.invalidateQueries({ queryKey: ['reservationsBySchedule'] });
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['reservationDashboard'] });
    },
    onError: (error) => console.error('예약 승인 처리 중 오류:', error),
  });

  // 🔽 4. '단일 거절' 로직을 처리하는 뮤테이션
  const { mutate: reject, isPending: isRejecting } = useMutation({
    mutationFn: (variables: { reservationId: number }) =>
      updateReservationStatus({
        activityId: selectedActivityId!,
        reservationId: variables.reservationId,
        status: 'declined',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservationsBySchedule'] });
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['reservationDashboard'] });
    },
    onError: (error) => console.error('거절 실패:', error),
  });

  // 🔽 핸들러 함수들은 뮤테이션을 '호출'하는 역할만 담당합니다.
  const handleApprove = useCallback(
    (reservationId: number, scheduleId: number) => {
      if (isApproving) return;
      const reservationsToDecline = reservationsByStatus.pending.filter(
        (r) => r.scheduleId === scheduleId && r.id !== reservationId,
      );
      approveAndDecline({ reservationId, scheduleId, reservationsToDecline });
    },
    [approveAndDecline, isApproving, reservationsByStatus.pending],
  );

  const handleReject = useCallback(
    (reservationId: number) => {
      if (isRejecting) return;
      reject({ reservationId });
    },
    [reject, isRejecting],
  );

  const handleTimeSlotSelect = useCallback(async (scheduleId: number) => {
    setSelectedScheduleId(scheduleId);
  }, []);

  const reservationCounts = useMemo(() => {
    const counts = schedules?.reduce(
      (acc, schedule) => {
        acc.pending += schedule.count.pending;
        acc.confirmed += schedule.count.confirmed;
        acc.declined += schedule.count.declined;
        return acc;
      },
      { pending: 0, confirmed: 0, declined: 0 },
    );

    return counts ?? { pending: 0, confirmed: 0, declined: 0 };
  }, [schedules]);

  // ✅ 그 다음에 displayItems 선언
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

  console.log('displayItems', displayItems);

  const totalReservations =
    reservationCounts.pending +
    reservationCounts.confirmed +
    reservationCounts.declined;

  return (
    <BottomSheet.Root
      open={isBottomSheetOpen}
      onOpenChange={setIsBottomSheetOpen}
    >
      <BottomSheet.Trigger>
        <div
          role='gridcell'
          aria-label={`${day.format('M월 D일')}`}
          className={styles.cellClasses}
        >
          {displayItems.length > 0 && (
            <div className='absolute top-[10%] left-[60%] size-6 rounded-full bg-red-500' />
          )}
          <div className={`${styles.dateClasses} font-size-16`}>
            {day.format('D')}
          </div>
          <div className='mt-1 flex w-full flex-col items-center space-y-1'>
            {displayItems.map((item, index) => (
              <div
                key={`${reservation?.date}-${item.status}-${index}`}
                className={`font-size-14 w-[90%] truncate rounded-xl px-1 text-center font-medium ${getColorClassByStatus(item.status)}`}
              >
                {STATUS_LABELS[item.status]} {item.count}명
              </div>
            ))}
          </div>
        </div>
      </BottomSheet.Trigger>
      <BottomSheet.Content>
        <div className='h-full min-w-[40rem] space-y-3 p-10'>
          <div className='flex items-center justify-between'>
            <div className='flex items-end gap-5'>
              <h3 className='font-size-20 font-bold text-gray-900'>
                {day.format('YY년 M월 D일')}
              </h3>
              <span className='font-size-12 text-gray-500'>
                {totalReservations}개의 예약
              </span>
            </div>
            <CloseButton onClose={() => setIsBottomSheetOpen(false)} />
          </div>

          <Tabs.Root
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as 'pending' | 'confirmed' | 'declined')
            }
          >
            <Tabs.List className='font-size-14 flex'>
              <Tabs.Trigger value='pending'>
                신청 {reservationCounts.pending}
              </Tabs.Trigger>
              <Tabs.Trigger value='confirmed'>
                승인 {reservationCounts.confirmed}
              </Tabs.Trigger>
              <Tabs.Trigger value='declined'>
                거절 {reservationCounts.declined}
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value='pending'>
              <ReservationDetail
                schedules={schedules || []}
                reservations={reservationsByStatus.pending}
                emptyMessage='신청된 예약이 없습니다.'
                showApprovalButton={true}
                showRejectButton={true}
                onApprove={handleApprove}
                onReject={handleReject}
                onTimeSlotSelect={handleTimeSlotSelect}
                isLoading={isApproving || isRejecting}
              />
            </Tabs.Content>

            <Tabs.Content value='confirmed'>
              <ReservationDetail
                schedules={schedules || []}
                reservations={reservationsByStatus.confirmed}
                emptyMessage='승인된 예약이 없습니다.'
                showApprovalButton={false}
                showRejectButton={true}
                onApprove={handleApprove}
                onReject={handleReject}
                onTimeSlotSelect={handleTimeSlotSelect}
                isLoading={isApproving || isRejecting}
              />
            </Tabs.Content>

            <Tabs.Content value='declined'>
              <ReservationDetail
                schedules={schedules || []}
                reservations={reservationsByStatus.declined}
                emptyMessage='거절된 예약이 없습니다.'
                showApprovalButton={false}
                showRejectButton={false}
                onApprove={handleApprove}
                onReject={handleReject}
                onTimeSlotSelect={handleTimeSlotSelect}
                isLoading={isApproving || isRejecting}
              />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
}
