'use client';
import { useCallback, useMemo, useState } from 'react';

import { ScheduleItem } from '@/domain/Reservation/services/reservation-calendar';
import Button from '@/shared/components/Button';
import Select from '@/shared/components/ui/select';

interface ReservationDetailProps {
  reservations: ReservationItem[];
  schedules: ScheduleItem[];
  emptyMessage: string;
  showApprovalButton?: boolean;
  showRejectButton?: boolean;
  onApprove: (reservationId: number, scheduleId: number) => void;
  onReject: (reservationId: number, scheduleId: number) => void;
  onTimeSlotSelect?: (scheduleId: number) => Promise<void>;
  isLoading?: boolean;
}

interface ReservationItem {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export default function ReservationDetail({
  reservations,
  schedules,
  emptyMessage,
  showApprovalButton,
  showRejectButton,
  onApprove,
  onReject,
  onTimeSlotSelect,
}: ReservationDetailProps) {
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>('');

  // 스케줄에서 고유한 시간대 추출
  const availableTimeSlots = useMemo(() => {
    const uniqueSchedules = schedules.reduce(
      (acc, schedule) => {
        const timeSlotKey = `${schedule.startTime}-${schedule.endTime}`;
        if (!acc.has(timeSlotKey)) {
          acc.set(timeSlotKey, {
            scheduleId: schedule.scheduleId,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            displayText: `${schedule.startTime} - ${schedule.endTime}`,
          });
        }
        return acc;
      },
      new Map<
        string,
        {
          scheduleId: number;
          startTime: string;
          endTime: string;
          displayText: string;
        }
      >(),
    );

    return Array.from(uniqueSchedules.values());
  }, [schedules]);

  console.log('selectedScheduleId', selectedScheduleId);

  const filteredReservations = useMemo(() => {
    if (!selectedScheduleId) {
      return null; // 선택 안 하면 빈 배열 반환
    }
    return reservations.filter(
      (res) => res.scheduleId.toString() === selectedScheduleId,
    );
  }, [reservations, selectedScheduleId]);

  console.log('filteredReservations', filteredReservations);

  // 시간대 선택 핸들러
  const handleTimeSlotChange = useCallback(
    async (value: string) => {
      setSelectedScheduleId(value);
      if (value && onTimeSlotSelect) {
        await onTimeSlotSelect(parseInt(value, 10));
      }
    },
    [onTimeSlotSelect],
  );

  const selectedDisplayText =
    availableTimeSlots.find(
      (slot) => slot.scheduleId.toString() === selectedScheduleId,
    )?.displayText ?? '예약 시간 선택';

  if (reservations.length === 0) {
    return (
      <p className='flex h-full flex-col items-center justify-center py-4 text-center text-gray-500'>
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className='tablet:grid tablet:min-h-[20rem] tablet:max-h-full tablet:grid-cols-2 tablet:overflow-y-auto desktop:flex desktop:flex-col scrollbar-none flex h-full flex-col gap-30 space-y-2'>
      <div className='flex flex-col gap-12'>
        <h2 className='font-size-18 font-bold'>예약 시간</h2>
        <Select.Root
          value={selectedScheduleId}
          onValueChange={handleTimeSlotChange}
        >
          <Select.Trigger className='font-size-16 w-full'>
            <p className='text-black'>{selectedDisplayText}</p>
          </Select.Trigger>
          <Select.Content className='font-size-16'>
            {availableTimeSlots.map((timeSlot) => (
              <Select.Item
                key={timeSlot.scheduleId}
                value={timeSlot.scheduleId.toString()}
              >
                {timeSlot.displayText}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>

      {selectedScheduleId && (
        <div className='flex flex-col gap-12'>
          <h2 className='font-size-18 font-bold'>예약 내역</h2>
          <div className='space-y-4'>
            {filteredReservations?.map((reservation) => (
              <div
                key={reservation.id}
                className='flex flex-col gap-8 rounded-3xl border border-gray-100 p-20 py-17.5'
              >
                <div className='flex items-center justify-between gap-2'>
                  <div className='flex flex-col gap-1'>
                    <span className='font-size-16 font-bold'>
                      {reservation.nickname}
                    </span>
                    <span className='font-size-14 text-gray-500'>
                      {reservation.startTime} - {reservation.endTime}
                    </span>
                  </div>
                  {showApprovalButton && (
                    <Button
                      type='button'
                      variant='outline'
                      className='font-size-14 font-semibold text-gray-500'
                      onClick={() =>
                        onApprove?.(reservation.id, reservation.scheduleId)
                      }
                    >
                      승인하기
                    </Button>
                  )}
                </div>
                <div className='flex items-center justify-between gap-2'>
                  <div className='flex flex-col gap-1'>
                    <span className='font-size-16 font-bold'>
                      인원 {reservation.headCount}명
                    </span>
                    <span className='font-size-14 text-gray-500'>
                      {reservation.totalPrice.toLocaleString()}원
                    </span>
                  </div>
                  {showRejectButton && (
                    <Button
                      type='button'
                      variant='ghost'
                      className='font-size-14 border-none font-semibold text-gray-500'
                      onClick={() =>
                        onReject?.(reservation.id, reservation.scheduleId)
                      }
                    >
                      거절하기
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
