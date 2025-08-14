'use client';
import dayjs from 'dayjs';
import { useCallback } from 'react';

import DayCellContent from '@/domain/Reservation/components/reservation-calendar/DayCellContent';
import ReservationModalContent from '@/domain/Reservation/components/reservation-calendar/ReservationModalContent';
import { useDayCellStyles } from '@/domain/Reservation/hooks/useDayCellStyles';
import { useModalState } from '@/domain/Reservation/hooks/useModalState';
import { useReservationCounts } from '@/domain/Reservation/hooks/useReservationCounts';
import { useReservationMutations } from '@/domain/Reservation/hooks/useReservationMutations';
import { useReservationQueries } from '@/domain/Reservation/hooks/useReservationQueries';
import { BottomSheet } from '@/shared/components/ui/bottom-sheet';
import Popover from '@/shared/components/ui/popover';

interface DayCellProps {
  day: dayjs.Dayjs;
  isCurrentMonth: boolean;
  isToday: boolean;
  isLastRow: boolean;
  selectedActivityId: number | null;
  displayMode?: 'popover' | 'bottomsheet'; // 🔥 UI 모드 선택
}

export default function DayCell({
  day,
  isCurrentMonth,
  isToday,
  isLastRow,
  selectedActivityId,
  displayMode = 'popover', // 🔥 기본값은 popover
}: DayCellProps) {
  // BottomSheet용 상태

  const { isOpen, setIsOpen, activeTab, setActiveTab, handleClose } =
    useModalState();

  const styles = useDayCellStyles({ day, isCurrentMonth, isToday, isLastRow });

  const { schedules, reservationsByStatus, setSelectedScheduleId } =
    useReservationQueries({
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

  const { reservationCounts, displayItems, totalReservations } =
    useReservationCounts({
      schedules,
      day,
    });

  // 공통 셀 UI
  const cellContent = (
    <DayCellContent
      day={day}
      cellClasses={styles.cellClasses}
      dateClasses={styles.dateClasses}
      displayItems={displayItems}
      onClick={() => setIsOpen(true)}
    />
  );

  // 공통 콘텐츠 UI
  const contentUI = (
    <ReservationModalContent
      day={day}
      totalReservations={totalReservations}
      reservationCounts={reservationCounts}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      schedules={schedules}
      reservationsByStatus={reservationsByStatus}
      handleApprove={handleApprove}
      handleReject={handleReject}
      handleTimeSlotSelect={handleTimeSlotSelect}
      isLoading={isLoading}
      setIsOpen={setIsOpen}
      onClose={handleClose}
    />
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
