import { useCalendar } from '../../hooks/useCalendar';
import { Event } from '../../types/event';
import { WEEKDAYS } from '../../utils/reservation';
import CalendarHeader from './CalnedarHeader';
import DayCell from './DayCell';

export const sampleEvents: Event[] = [
  { id: '1', title: '완료', date: '2025-07-14', color: 'green', number: 1 },
  { id: '2', title: '예약', date: '2025-07-15', color: 'purple', number: 2 },
  { id: '3', title: '승인', date: '2025-07-15', color: 'blue', number: 3 },
  { id: '4', title: '거절', date: '2025-07-15', color: 'orange', number: 4 },
  { id: '5', title: '승인', date: '2025-07-16', color: 'blue', number: 5 },
  { id: '6', title: '거절', date: '2025-07-16', color: 'orange', number: 6 },
  { id: '7', title: '취소', date: '2025-07-17', color: 'red', number: 7 },
  { id: '8', title: '예약', date: '2025-07-17', color: 'purple', number: 8 },
  { id: '9', title: '완료', date: '2025-07-17', color: 'green', number: 9 },
  { id: '10', title: '취소', date: '2025-07-18', color: 'red', number: 10 },
];

export default function ReservationCalendar() {
  const { currentDate, today, days, getEventsForDate, prevMonth, nextMonth } =
    useCalendar(sampleEvents);

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
            key={day}
            role='columnheader'
            className={`py-2 text-center text-xl font-bold ${index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-700'}`}
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
            events={getEventsForDate(day)}
          />
        ))}
      </div>
    </div>
  );
}
