import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

import { BottomSheet } from '@/shared/components/ui/bottom-sheet';
import { useBottomSheet } from '@/shared/components/ui/bottom-sheet/BottomSheetContext';
import Tabs from '@/shared/components/ui/tabs';

import {
  getReservationsBySchedule,
  getSchedulesByDate,
  type MonthlyReservation,
  type ScheduleItem,
} from '../../services/reservation-calendar';
import type { ReservationItem } from '../../types/reservation';
import {
  getColorClassByStatus,
  getDisplayItems,
  STATUS_LABELS,
} from '../../utils/reservation';
import ReservationDetail from './ReservationDetail';

interface DayCellProps {
  day: dayjs.Dayjs;
  isCurrentMonth: boolean;
  isToday: boolean;
  isLastRow: boolean;
  reservation: MonthlyReservation | null;
  selectedActivityId: number | null;
}

const CloseButton = () => {
  const { onOpenChange } = useBottomSheet();

  return (
    <button type='button' onClick={() => onOpenChange(false)}>
      <X className='size-15 cursor-pointer font-bold' />
    </button>
  );
};

export default function DayCellBottomSheet({
  day,
  isCurrentMonth,
  isToday,
  isLastRow,
  reservation,
  selectedActivityId,
}: DayCellProps) {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [reservationsByStatus, setReservationsByStatus] = useState<{
    pending: ReservationItem[];
    confirmed: ReservationItem[];
    declined: ReservationItem[];
  }>({
    pending: [],
    confirmed: [],
    declined: [],
  });

  const [activeTab, setActiveTab] = useState<
    'pending' | 'confirmed' | 'declined'
  >('pending');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const displayItems = useMemo(
    () => getDisplayItems(reservation),
    [reservation],
  );

  const styles = useMemo(() => {
    const cellClasses = `
      relative flex w-full min-h-[8rem] tablet:min-h-[12rem] cursor-pointer flex-col items-center py-6 tablet:py-12 font-size-14 tablet:font-size-14
      hover:bg-gray-50 
      ${!isLastRow ? 'border-b-[0.05rem] border-gray-100' : ''} 
      ${!isCurrentMonth ? 'bg-gray-200 text-gray-400 opacity-50' : ''} 
      ${isToday ? 'border-blue-300 bg-blue-100' : ''}
    `;

    const dayOfWeek = day.day();
    const dateClasses = `font-size-16 tablet:font-size-14 ${
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

  const hasReservations = displayItems.length > 0;

  const reservationCounts = useMemo(() => {
    if (!reservation?.reservations) {
      return { pending: 0, confirmed: 0, declined: 0 };
    }

    return {
      pending: reservation.reservations.pending || 0,
      confirmed: reservation.reservations.confirmed || 0,
      declined: reservation.reservations.completed || 0,
    };
  }, [reservation]);

  const totalReservations =
    reservationCounts.pending +
    reservationCounts.confirmed +
    reservationCounts.declined;

  const handleDateClick = useCallback(async () => {
    if (!selectedActivityId) return;

    setIsBottomSheetOpen(true);
    const dateString = day.format('YYYY-MM-DD');

    const scheduleData = await getSchedulesByDate(
      selectedActivityId,
      dateString,
    );
    setSchedules(scheduleData || []);

    if (scheduleData && scheduleData.length > 0) {
      const firstScheduleId = scheduleData[0].scheduleId;
      await loadAllStatuses(firstScheduleId);
    }
  }, [day, selectedActivityId]);

  const loadAllStatuses = useCallback(
    async (scheduleId: number) => {
      if (!selectedActivityId) return;

      const [pending, confirmed, declined] = await Promise.all([
        getReservationsBySchedule(selectedActivityId, scheduleId, 'pending'),
        getReservationsBySchedule(selectedActivityId, scheduleId, 'confirmed'),
        getReservationsBySchedule(selectedActivityId, scheduleId, 'declined'),
      ]);

      setReservationsByStatus({
        pending: pending || [],
        confirmed: confirmed || [],
        declined: declined || [],
      });
    },
    [selectedActivityId],
  );

  const handleTabChange = useCallback(
    async (status: 'pending' | 'confirmed' | 'declined') => {
      setActiveTab(status);
    },
    [],
  );

  const handleTimeSlotSelect = useCallback(
    async (scheduleId: number) => {
      await loadAllStatuses(scheduleId);
    },
    [loadAllStatuses],
  );

  const handleApprove = useCallback((reservationId: number) => {
    console.log('승인:', reservationId);
  }, []);

  const handleReject = useCallback((reservationId: number) => {
    console.log('거절:', reservationId);
  }, []);

  return (
    <BottomSheet.Root
      open={isBottomSheetOpen}
      onOpenChange={setIsBottomSheetOpen}
    >
      <BottomSheet.Trigger>
        <div
          onClick={handleDateClick}
          role='gridcell'
          aria-label={`${day.format('M월 D일')}`}
          className={styles.cellClasses}
        >
          {hasReservations && (
            <div className='tablet:size-6 absolute top-[10%] left-[60%] size-4 rounded-full bg-red-500 sm:size-5' />
          )}

          <div
            className={`${styles.dateClasses} tablet:font-size-16 font-size-16`}
          >
            {day.format('D')}
          </div>

          <div className='mt-1 flex w-full flex-col items-center space-y-1 overflow-hidden px-1'>
            {displayItems.slice(0, 3).map((item, index) => (
              <div
                key={`${reservation?.date}-${item.status}-${index}`}
                className={`tablet:font-size-14 font-size-10 w-[90%] truncate rounded-xl px-1 text-center font-medium ${getColorClassByStatus(item.status)}`}
              >
                {STATUS_LABELS[item.status]} {item.count}명
              </div>
            ))}
          </div>
        </div>
      </BottomSheet.Trigger>

      <BottomSheet.Content>
        <div className='tablet:p-10 mx-auto w-full max-w-2xl space-y-3 p-6 sm:max-w-4xl sm:p-8'>
          <div className='flex flex-col justify-between gap-3 sm:flex-row sm:items-center'>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-5'>
              <h3 className='font-size-20 font-bold text-gray-900'>
                {day.format('YY년 M월 D일')}
              </h3>
              <span className='font-size-12 text-gray-500'>
                {totalReservations}개의 예약
              </span>
            </div>
            <div className='self-end sm:self-auto'>
              <CloseButton />
            </div>
          </div>

          <Tabs.Root defaultValue={activeTab}>
            <Tabs.List className='font-size-14 flex'>
              <Tabs.Trigger
                className='cursor-pointer'
                value='pending'
                onClick={() => handleTabChange('pending')}
              >
                신청 {reservationCounts.pending}
              </Tabs.Trigger>
              <Tabs.Trigger
                className='cursor-pointer'
                value='confirmed'
                onClick={() => handleTabChange('confirmed')}
              >
                승인 {reservationCounts.confirmed}
              </Tabs.Trigger>
              <Tabs.Trigger
                className='cursor-pointer'
                value='declined'
                onClick={() => handleTabChange('declined')}
              >
                거절 {reservationCounts.declined}
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value='pending'>
              <ReservationDetail
                schedules={schedules}
                reservations={reservationsByStatus.pending}
                emptyMessage='신청된 예약이 없습니다.'
                showApprovalButton={true}
                showRejectButton={true}
                onApprove={handleApprove}
                onReject={handleReject}
                onTimeSlotSelect={handleTimeSlotSelect}
              />
            </Tabs.Content>

            <Tabs.Content value='confirmed'>
              <ReservationDetail
                schedules={schedules}
                reservations={reservationsByStatus.confirmed}
                emptyMessage='승인된 예약이 없습니다.'
                showApprovalButton={false}
                showRejectButton={true}
                onApprove={handleApprove}
                onReject={handleReject}
                onTimeSlotSelect={handleTimeSlotSelect}
              />
            </Tabs.Content>

            <Tabs.Content value='declined'>
              <ReservationDetail
                schedules={schedules}
                reservations={reservationsByStatus.declined}
                emptyMessage='거절된 예약이 없습니다.'
                showApprovalButton={false}
                showRejectButton={false}
                onApprove={handleApprove}
                onReject={handleReject}
                onTimeSlotSelect={handleTimeSlotSelect}
              />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
}
