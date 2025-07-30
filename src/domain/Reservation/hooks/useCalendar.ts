'use client';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useMemo } from 'react';

import type { MonthlyReservation } from '../services/reservation-calendar';

dayjs.extend(isSameOrBefore);

export function useCalendar(
  monthlyReservations: MonthlyReservation[],
  currentDate: dayjs.Dayjs,
  onMonthChange?: (newDate: dayjs.Dayjs) => void,
) {
  const today = useMemo(() => dayjs(), []);

  // 날짜별 예약 데이터 맵 : 예약 정보를 찾을 때 key 값으로 찾아 find로 찾는 것보다 더 빠름
  const reservationsByDate = useMemo(() => {
    const map: Record<string, MonthlyReservation> = {};
    monthlyReservations.forEach((reservation) => {
      map[reservation.date] = reservation;
    });
    return map;
  }, [monthlyReservations]);

  // 달력 날짜 배열 생성
  const days = useMemo(() => {
    const monthStart = currentDate.startOf('month');
    const monthEnd = currentDate.endOf('month');
    const calendarStart = monthStart.startOf('week');
    const calendarEnd = monthEnd.endOf('week');

    const daysArr: dayjs.Dayjs[] = [];
    let day = calendarStart;
    while (day.isSameOrBefore(calendarEnd)) {
      daysArr.push(day);
      day = day.add(1, 'day');
    }
    return daysArr;
  }, [currentDate]);

  // 특정 날짜의 예약 정보 반환 (단일 객체 또는 null)
  const getReservationForDate = (
    day: dayjs.Dayjs,
  ): MonthlyReservation | null => {
    const dateString = day.format('YYYY-MM-DD');
    return reservationsByDate[dateString] || null;
  };

  // 이전 달로 이동
  const prevMonth = () => {
    if (onMonthChange) {
      onMonthChange(currentDate.subtract(1, 'month'));
    }
  };

  // 다음 달로 이동
  const nextMonth = () => {
    if (onMonthChange) {
      onMonthChange(currentDate.add(1, 'month'));
    }
  };

  return {
    today,
    days,
    getReservationForDate,
    prevMonth,
    nextMonth,
  };
}
