'use client';

import dayjs from 'dayjs';
import { useState } from 'react';

import { availableSchedule } from '../../components/detail/mock/mock-data';

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
export const useReservationForm = (initialPrice: number) => {
  // 사용자가 선택한 날짜
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 사용자가 선택한 시간
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // 참여 인원 수
  const [participantCount, setParticipantCount] = useState(1);

  // 예약 가능한 날짜 목록 (추후 API 데이터로 변경 필요)
  const reservableDates = availableSchedule.map((item) => item.date);

  // 현재 선택된 날짜에 대한 시간대 정보 추출
  const currentSchedule = availableSchedule.find(
    (item) => item.date === dayjs(selectedDate).format('YYYY-MM-DD'),
  );
  const timeSlots = currentSchedule?.times ?? [];

  // 총 가격 계산 = 단가 * 인원 수
  const totalPrice = initialPrice * participantCount;

  /**
   * 시간 선택 핸들러
   * 이미 선택된 시간 클릭 시 해제되고, 아니면 새로 설정됨
   */
  const handleTimeSelect = (time: string) => {
    setSelectedTime(selectedTime === time ? null : time);
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
  };
};
