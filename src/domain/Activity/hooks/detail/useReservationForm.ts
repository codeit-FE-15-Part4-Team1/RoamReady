'use client';

import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import { ReservableTimeSlot } from '../../types/detail/types';
import { useAvailableSchedule } from './useAvailableSchedule';

/**
 * useReservationForm
 * 예약 날짜, 시간, 인원 수를 관리하고 총 가격을 계산하는 커스텀 훅
 * PC, Tablet, Mobile Reservation 컴포넌트에서 공통으로 관리되는 값들을 모아놓은 훅입니다.
 *
 * @param initialPrice - 1인당 예약 가격
 * @returns 예약 관련 상태 값들과 제어 함수들을 포함한 객체
 *
 * @example
 * const {
 *   selectedDate,
 *   selectedTime,
 *   participantCount,
 *   reservableDates,
 *   timeSlots,
 *   totalPrice,
 *   setSelectedDate,
 *   setSelectedTime,
 *   handleTimeSelect,
 *   handleIncrease,
 *   handleDecrease,
 * } = useReservationForm(30000);
 */
export const useReservationForm = (
  initialPrice: number,
  activityId: number,
) => {
  const [yearMonth, setYearMonth] = useState(() => {
    const now = new Date();
    return {
      year: String(now.getFullYear()),
      month: String(now.getMonth() + 1).padStart(2, '0'),
    };
  });

  const { data: rawSchedule = [] } = useAvailableSchedule({
    activityId: Number(activityId),
    year: yearMonth.year,
    month: yearMonth.month,
  });

  // 사용자가 선택한 날짜
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 사용자가 선택한 시간
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // 사용자가 선택한 날짜와 시간을 바탕으로 scheduledId 탐색
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  );

  // 참여 인원 수
  const [participantCount, setParticipantCount] = useState(1);

  // 예약 가능한 날짜 목록 추출 (추후 API 데이터 연동 필요)
  const reservableDates = useMemo(() => {
    return rawSchedule.map((item) => item.date);
  }, [rawSchedule]);

  // 선택된 날짜의 예약 가능한 time slot 배열 (추후 API 데이터 연동 필요)
  const timeSlots: ReservableTimeSlot[] = useMemo(() => {
    if (!selectedDate) return [];
    const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
    const matched = rawSchedule.find((item) => item.date === formattedDate);
    return matched?.times ?? [];
  }, [selectedDate, rawSchedule]);

  // 총 가격 계산 = 단가 * 인원 수
  const totalPrice = initialPrice * participantCount;

  /**
   * 시간 선택 핸들러
   * - 시간 형식: 'HH:mm-HH:mm'
   * - 시간 선택 시 scheduleId도 함께 저장
   */
  const handleTimeSelect = (timeLabel: string) => {
    const matchedSlot = timeSlots.find(
      (slot) => `${slot.startTime}-${slot.endTime}` === timeLabel,
    );
    if (matchedSlot) {
      setSelectedTime(timeLabel);
      setSelectedScheduleId(matchedSlot.id);
    } else {
      setSelectedTime(null);
      setSelectedScheduleId(null);
    }
  };

  /**
   * 인원 수 증가 (제한 없음)
   */
  const handleIncrease = () => {
    setParticipantCount((prev) => prev + 1);
  };

  /**
   * 인원 수 감소 (최소 1명 제한)
   */
  const handleDecrease = () => {
    setParticipantCount((prev) => Math.max(prev - 1, 1));
  };

  return {
    // 상태 값 반환
    selectedDate,
    selectedTime,
    selectedScheduleId,
    participantCount,
    reservableDates,
    timeSlots,
    totalPrice,

    // 상태 제어 함수 반환
    setSelectedDate,
    setSelectedTime,
    handleTimeSelect,
    handleIncrease,
    handleDecrease,
    onMonthChange: (year: string, month: string) => {
      setYearMonth((prev) => {
        if (prev.year === year && prev.month === month) return prev;
        return { year, month };
      });
    },
  };
};
