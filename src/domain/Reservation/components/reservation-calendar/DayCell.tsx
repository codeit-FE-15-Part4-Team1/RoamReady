'use client';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { useCallback, useState } from 'react';

import { useDayCellStyles } from '@/domain/Reservation/hooks/useDayCellStyles';
import { useReservationCounts } from '@/domain/Reservation/hooks/useReservationCounts';
import { useReservationMutations } from '@/domain/Reservation/hooks/useReservationMutations';
import { useReservationQueries } from '@/domain/Reservation/hooks/useReservationQueries';
import { BottomSheet } from '@/shared/components/ui/bottom-sheet';
import Popover from '@/shared/components/ui/popover';
import Tabs from '@/shared/components/ui/tabs';

import type { Reservation } from '../../types/reservation';
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
  // BottomSheet용 상태
  const [isOpen, setIsOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<
    'pending' | 'confirmed' | 'declined'
  >('pending');

  const styles = useDayCellStyles({ day, isCurrentMonth, isToday, isLastRow });

  const {
    schedules,
    reservationsByStatus,
    selectedScheduleId,
    setSelectedScheduleId,
  } = useReservationQueries({
    selectedActivityId,
    day,
  });

  const { handleApprove, handleReject, isLoading } = useReservationMutations({
    selectedActivityId,
    day,
    reservationsByStatus,
  });

  const handleTimeSlotSelect = useCallback(async (scheduleId: number) => {
    setSelectedScheduleId(scheduleId);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const { reservationCounts, displayItems, totalReservations } =
    useReservationCounts({
      schedules,
      day,
    });

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
            isLoading={isLoading}
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
            isLoading={isLoading}
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
            isLoading={isLoading}
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
