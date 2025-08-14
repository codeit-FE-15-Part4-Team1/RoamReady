'use client';
import dayjs from 'dayjs';

import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

import { useCalendar } from '../../hooks/useCalendar';
import type { MonthlyReservation } from '../../services/reservation-calendar';
import { WEEKDAYS } from '../../utils/reservation';
import CalendarHeader from './CalendarHeader';
import DayCell from './DayCell'; // 통합된 컴포넌트 import

interface ReservationCalendarProps {
  currentDate: dayjs.Dayjs;
  monthlyReservations: MonthlyReservation[];
  selectedActivityId: number;
  onMonthChange: (newDate: dayjs.Dayjs) => void;
}

export default function ReservationCalendar({
  currentDate,
  monthlyReservations,
  selectedActivityId,
  onMonthChange,
}: ReservationCalendarProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // 🔥 미디어쿼리 결과에 따라 displayMode 결정
  const displayMode = isDesktop ? 'popover' : 'bottomsheet';

  const { today, days, prevMonth, nextMonth } = useCalendar(
    monthlyReservations,
    currentDate,
    onMonthChange,
  );

  return (
    <div
      className='w-full overflow-hidden rounded-2xl border border-gray-200 bg-white font-bold'
      role='calendar'
    >
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />

      <div className='grid grid-cols-7 gap-1 border-b border-gray-100 py-10'>
        {WEEKDAYS.map((day, index) => (
          <div
            key={`${day}-${index}`}
            role='columnheader'
            className={`font-size-12 py-2 text-center font-bold ${index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-700'}`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className='grid auto-rows-fr grid-cols-7' role='grid'>
        {days.map((day, index) => (
          <DayCell
            key={day.format('YYYY-MM-DD')}
            day={day}
            isCurrentMonth={day.isSame(currentDate, 'month')}
            isToday={day.isSame(today, 'day')}
            isLastRow={index >= days.length - 7}
            selectedActivityId={selectedActivityId}
            displayMode={displayMode} // 🔥 displayMode prop 추가
          />
        ))}
      </div>
    </div>
  );
}
