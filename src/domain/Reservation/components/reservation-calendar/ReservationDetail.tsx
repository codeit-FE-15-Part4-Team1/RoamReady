'use client';
import { useState } from 'react';

import Button from '@/shared/components/Button';
import Select from '@/shared/components/ui/select';

import { TIME_SLOTS } from '../../constants';

interface ReservationDetailProps {
  reservations: ReservationItem[];
  emptyMessage: string;
  showApprovalButton?: boolean;
  showRejectButton?: boolean;
  onApprove: (reservationId: number) => void;
  onReject: (reservationId: number) => void;
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
  emptyMessage,
  showApprovalButton,
  showRejectButton,
  onApprove,
  onReject,
}: ReservationDetailProps) {
  const [selectedTime, setSelectedTime] = useState<string>('');

  // 고유한 시간대 추출 (예약 데이터에서)
  const availableTimeSlots = [
    ...new Set(reservations.map((res) => `${res.startTime} - ${res.endTime}`)),
  ];

  // 선택된 시간대에 맞는 예약 필터링
  const filteredReservations = selectedTime
    ? reservations.filter(
        (res) => `${res.startTime} - ${res.endTime}` === selectedTime,
      )
    : reservations;

  if (reservations.length === 0) {
    return <p className='py-4 text-center text-gray-500'>{emptyMessage}</p>;
  }

  return (
    <div className='flex flex-col gap-30 space-y-2'>
      <div className='flex flex-col gap-12'>
        <h2 className='font-size-18 font-bold'>예약 시간</h2>
        <Select.Root value={selectedTime} onValueChange={setSelectedTime}>
          <Select.Trigger className='font-size-16 w-full'>
            <Select.Value placeholder='예약 시간' />
          </Select.Trigger>
          <Select.Content className='font-size-16'>
            {/* 전체 보기 옵션 추가 */}
            <Select.Item value=''>전체 보기</Select.Item>

            {availableTimeSlots.length > 0
              ? availableTimeSlots.map((timeSlot) => (
                  <Select.Item key={timeSlot} value={timeSlot}>
                    {timeSlot}
                  </Select.Item>
                ))
              : TIME_SLOTS.map((timeSlot) => (
                  <Select.Item key={timeSlot} value={timeSlot}>
                    {timeSlot}
                  </Select.Item>
                ))}
          </Select.Content>
        </Select.Root>
      </div>

      <div className='flex flex-col gap-12'>
        <h2 className='font-size-18 font-bold'>예약 내역</h2>
        <div className='space-y-4'>
          {filteredReservations.map((reservation) => (
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
                    variant='outline'
                    className='font-size-14 font-semibold text-gray-500'
                    onClick={() => onApprove?.(reservation.id)}
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
                    variant='ghost'
                    className='font-size-14 border-none font-semibold text-gray-500'
                    onClick={() => onReject?.(reservation.id)}
                  >
                    거절하기
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
