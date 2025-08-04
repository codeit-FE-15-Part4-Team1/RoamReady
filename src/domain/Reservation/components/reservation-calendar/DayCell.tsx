'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  getReservationsBySchedule,
  getSchedulesByDate,
  type ScheduleItem,
  updateReservationStatus,
} from '@/domain/Reservation/services/reservation-calendar';
import { BottomSheet } from '@/shared/components/ui/bottom-sheet';
import Popover from '@/shared/components/ui/popover';
import Tabs from '@/shared/components/ui/tabs';
import { useToast } from '@/shared/hooks/useToast';

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
  displayMode?: 'popover' | 'bottomsheet'; // 🔥 UI 모드 선택
}

export default function DayCell({
  day,
  isCurrentMonth,
  isToday,
  isLastRow,
  reservation,
  selectedActivityId,
  displayMode = 'popover', // 🔥 기본값은 popover
}: DayCellProps) {
  const queryClient = useQueryClient();
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  );

  // BottomSheet용 상태
  const [isOpen, setIsOpen] = useState(false);
  const { showSuccess } = useToast();

  const [activeTab, setActiveTab] = useState<
    'pending' | 'confirmed' | 'declined'
  >('pending');

  const styles = useMemo(() => {
    const cellClasses = `
      relative flex aspect-square cursor-pointer flex-col items-center justify-start p-1 md:p-2 text-center font-size-14
      hover:bg-gray-50 
      ${!isLastRow ? 'border-b-[0.05rem] border-gray-100' : ''} 
      ${!isCurrentMonth ? 'bg-neutral-200 text-gray-400 opacity-50' : ''} 
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

  // 3. '하나 승인 후 나머지 거절' 비즈니스 로직을 처리하는 전용 뮤테이션
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
      queryClient.invalidateQueries({ queryKey: ['reservationsBySchedule'] });
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

  const handleTimeSlotSelect = useCallback(async (scheduleId: number) => {
    setSelectedScheduleId(scheduleId);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
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

  const totalReservations =
    reservationCounts.pending +
    reservationCounts.confirmed +
    reservationCounts.declined;

  // 공통 셀 UI
  const cellContent = (
    <div
      role='gridcell'
      aria-label={`${day.format('M월 D일')}`}
      className={styles.cellClasses}
      onClick={() => setIsOpen(true)}
    >
      {/* 반응형 알림 점 */}
      {displayItems.length > 0 && (
        <div className='tablet:right-[25%] desktop:right-[30%] absolute top-5 right-[20%] size-4 rounded-full bg-red-500 md:size-5' />
      )}

      {/* 반응형 날짜 폰트 */}
      <div className={`${styles.dateClasses} font-size-14 md:font-size-16`}>
        {day.format('D')}
      </div>

      <div className='mt-1 flex w-full flex-col items-center space-y-1 overflow-hidden'>
        {/* --- 모바일 뷰 (md 사이즈 미만) --- */}
        {displayItems.length > 0 && (
          <div className='w-full text-center md:hidden'>
            <div
              className={`font-size-10 inline-block w-[90%] truncate rounded-xl px-1 font-medium ${getColorClassByStatus(displayItems[0].status)}`}
            >
              {STATUS_LABELS[displayItems[0].status]} {displayItems[0].count}건
            </div>
          </div>
        )}

        {/* --- 데스크톱 뷰 (md 사이즈 이상) --- */}
        <div className='hidden w-full flex-col items-center space-y-1 md:flex'>
          {displayItems.map((item, index) => (
            <div
              key={`${reservation?.date}-${item.status}-${index}-desktop`}
              className={`font-size-12 md:font-size-14 w-[90%] truncate rounded-xl px-1 text-center font-medium ${getColorClassByStatus(item.status)}`}
            >
              {STATUS_LABELS[item.status]} {item.count}건
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  // 공통 콘텐츠 UI
  const contentUI = (
    <div className='tablet:min-w-[32rem] h-full space-y-3 p-10'>
      <div className='flex items-center justify-between'>
        <div className='flex items-end gap-5'>
          <h3 className='font-size-20 font-bold text-gray-900'>
            {day.format('YY년 M월 D일')}
          </h3>
          <span className='font-size-12 text-gray-500'>
            {totalReservations}개의 예약
          </span>
        </div>
        <button type='button' onClick={handleClose}>
          <X className='size-15 cursor-pointer font-bold' />
        </button>
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
            status='pending'
            setIsOpen={setIsOpen}
          />
        </Tabs.Content>

        <Tabs.Content value='confirmed'>
          <ReservationDetail
            schedules={schedules || []}
            reservations={reservationsByStatus.confirmed}
            emptyMessage='승인된 예약이 없습니다.'
            showApprovalButton={false}
            showRejectButton={false}
            onApprove={handleApprove}
            onReject={handleReject}
            onTimeSlotSelect={handleTimeSlotSelect}
            isLoading={isApproving || isRejecting}
            status='confirmed'
            setIsOpen={setIsOpen}
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
            status='declined'
            setIsOpen={setIsOpen}
          />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );

  // 🔥 displayMode에 따라 다른 UI 렌더링
  if (displayMode === 'bottomsheet') {
    return (
      <BottomSheet.Root open={isOpen} onOpenChange={setIsOpen}>
        <BottomSheet.Trigger>{cellContent}</BottomSheet.Trigger>
        <BottomSheet.Content>{contentUI}</BottomSheet.Content>
      </BottomSheet.Root>
    );
  }

  // 기본값: Popover
  return (
    <Popover.Root isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>{cellContent}</Popover.Trigger>
      <Popover.Content
        position='left-center'
        withBackdrop
        className='min-h-[40rem]'
      >
        {contentUI}
      </Popover.Content>
    </Popover.Root>
  );
}
