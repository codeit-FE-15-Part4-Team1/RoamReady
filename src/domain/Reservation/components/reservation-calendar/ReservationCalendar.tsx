import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

import { useCalendar } from '../../hooks/useCalendar';
import { WEEKDAYS } from '../../utils/reservation';
import CalendarHeader from './CalendarHeader';
import DayCellBottomSheet from './DayCellBottomSheet';
import DayCellPopover from './DayCellPopover';

export const ReservationsData = [
  {
    date: '2025-07-14',
    reservations: {
      completed: 1,
      confirmed: 0,
      pending: 0,
    },
  },
  {
    date: '2025-07-15',
    reservations: {
      completed: 0,
      confirmed: 2, // 예약 2건 (id 2, 8)
      pending: 3, // 승인 3건 (id 3, 5)
    },
  },
  {
    date: '2025-07-16',
    reservations: {
      completed: 0,
      confirmed: 0,
      pending: 5, // 승인 5건 (id 5)
    },
  },
  {
    date: '2025-07-17',
    reservations: {
      completed: 9, // 완료 9건 (id 9)
      confirmed: 8, // 예약 8건 (id 8)
      pending: 0,
    },
  },
  {
    date: '2025-07-18',
    reservations: {
      completed: 0,
      confirmed: 0,
      pending: 0,
    },
  },
];

export default function ReservationCalendar() {
  const {
    currentDate,
    today,
    days,
    getReservationForDate,
    prevMonth,
    nextMonth,
  } = useCalendar(ReservationsData);

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const DayCellComponent = isDesktop ? DayCellPopover : DayCellBottomSheet;

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
          <DayCellComponent
            key={day.format('YYYY-MM-DD')}
            day={day}
            isCurrentMonth={day.isSame(currentDate, 'month')}
            isToday={day.isSame(today, 'day')}
            isLastRow={index >= days.length - 7}
            reservation={getReservationForDate(day)} // 배열이 아닌 단일 객체 반환
          />
        ))}
      </div>
    </div>
  );
}
