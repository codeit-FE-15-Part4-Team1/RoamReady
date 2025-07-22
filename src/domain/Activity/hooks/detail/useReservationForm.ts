'use client';

import dayjs from 'dayjs';
import { useState } from 'react';

import { availableSchedule } from '../../components/detail/mock/mock-data';

export const useReservationForm = (initialPrice: number) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [participantCount, setParticipantCount] = useState(1);

  const reservableDates = availableSchedule.map((item) => item.date);

  const currentSchedule = availableSchedule.find(
    (item) => item.date === dayjs(selectedDate).format('YYYY-MM-DD'),
  );
  const timeSlots = currentSchedule?.times ?? [];

  const totalPrice = initialPrice * participantCount;

  const handleTimeSelect = (time: string) => {
    setSelectedTime(selectedTime === time ? null : time);
  };

  const handleIncrease = () => {
    setParticipantCount((prev) => Math.min(prev + 1, 10));
  };

  const handleDecrease = () => {
    setParticipantCount((prev) => Math.max(prev - 1, 1));
  };

  return {
    // 상태
    selectedDate,
    selectedTime,
    participantCount,
    reservableDates,
    timeSlots,
    totalPrice,

    // 핸들러
    setSelectedDate,
    setSelectedTime,
    handleTimeSelect,
    handleIncrease,
    handleDecrease,
  };
};
