import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

import {
  getReservationsBySchedule,
  getSchedulesByDate,
} from '@/domain/Reservation/services/reservation-calendar';
import Popover from '@/shared/components/ui/popover';
import { usePopover } from '@/shared/components/ui/popover/PopoverContext';
import Tabs from '@/shared/components/ui/tabs';

import type { Reservation, ReservationItem } from '../../types/reservation';
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
  reservation: Reservation | null;
  selectedActivityId: number | null;
}

export interface ScheduleItem {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    pending: number;
    confirmed: number;
    declined: number;
  };
}

const CloseButton = () => {
  const { setIsOpen } = usePopover();
  return (
    <button type='button' onClick={() => setIsOpen(false)}>
      <X className='size-15 cursor-pointer font-bold' />
    </button>
  );
};

export default function DayCellPopover({
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

  const displayItems = useMemo(
    () => getDisplayItems(reservation),
    [reservation],
  );

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

  const reservationCounts = useMemo(() => {
    if (!reservation?.reservations) {
      return { pending: 0, confirmed: 0, declined: 0 };
    }
    return {
      pending: reservation.reservations.pending || 0,
      confirmed: reservation.reservations.confirmed || 0,
      declined: reservation.reservations.declined || 0,
    };
  }, [reservation]);

  const totalReservations =
    reservationCounts.pending +
    reservationCounts.confirmed +
    reservationCounts.declined;

  const handleDateClick = useCallback(async () => {
    if (!selectedActivityId) return;

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
    (status: 'pending' | 'confirmed' | 'declined') => {
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
    // 승인 후 데이터 리패치 로직 추가 필요
  }, []);

  const handleReject = useCallback((reservationId: number) => {
    console.log('거절:', reservationId);
    // 거절 후 데이터 리패치 로직 추가 필요
  }, []);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <div
          role='gridcell'
          aria-label={`${day.format('M월 D일')}`}
          className={styles.cellClasses}
          onClick={handleDateClick}
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
      </Popover.Trigger>

      <Popover.Content
        position='left-center'
        withBackdrop
        className='min-h-[40rem]'
      >
        <div className='min-w-[40rem] space-y-3 p-10'>
          <div className='flex items-center justify-between'>
            <div className='flex items-end gap-5'>
              <h3 className='font-size-20 font-bold text-gray-900'>
                {day.format('YY년 M월 D일')}
              </h3>
              <span className='font-size-12 text-gray-500'>
                {totalReservations}개의 예약
              </span>
            </div>
            <CloseButton />
          </div>

          <Tabs.Root defaultValue={activeTab}>
            <Tabs.List className='font-size-14 flex'>
              <Tabs.Trigger
                value='pending'
                onClick={() => handleTabChange('pending')}
              >
                신청 {reservationCounts.pending}
              </Tabs.Trigger>
              <Tabs.Trigger
                value='confirmed'
                onClick={() => handleTabChange('confirmed')}
              >
                승인 {reservationCounts.confirmed}
              </Tabs.Trigger>
              <Tabs.Trigger
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
      </Popover.Content>
    </Popover.Root>
  );
}
