// Calendar.tsx
import dayjs from 'dayjs';
import { FC, useState } from 'react';

import { cn } from '@/shared/libs/cn';

interface CalendarProps {
  selectedDate?: Date;
  onDateClick?: (date: Date) => void;
}

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const Calendar: FC<CalendarProps> = ({ selectedDate, onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const today = dayjs();

  const dateList = [];
  let date = startDate;
  while (date.isBefore(endDate) || date.isSame(endDate, 'day')) {
    dateList.push(date);
    date = date.add(1, 'day');
  }

  return (
    <div className='h-full w-full select-none'>
      {/* 상단: 월 표시 및 이동 버튼 */}
      <div className='flex items-center justify-between pb-10'>
        <div className='font-size-16 font-medium text-gray-800'>
          {currentMonth.format('MMMM YYYY')}
        </div>

        <div className='flex gap-3'>
          <button
            onClick={() => setCurrentMonth((prev) => prev.subtract(1, 'month'))}
            className='text-gray-500 hover:text-gray-700'
          >
            ‹
          </button>

          <button
            onClick={() => setCurrentMonth((prev) => prev.add(1, 'month'))}
            className='text-gray-500 hover:text-gray-700'
          >
            ›
          </button>
        </div>
      </div>

      {/* 요일 */}
      <div className='font-size-16 mb-1 grid grid-cols-7 text-center font-semibold text-gray-500'>
        {weekDays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className='font-size-16 grid grid-cols-7 gap-5 text-center font-medium'>
        {dateList.map((d, i) => {
          const isCurrentMonth = d.month() === currentMonth.month();
          const isToday = d.isSame(today, 'day');

          return (
            <button
              key={i}
              onClick={() => onDateClick?.(d.toDate())}
              className={cn(
                'mx-auto flex h-46 w-46 cursor-pointer items-center justify-center rounded-full transition',
                {
                  'text-gray-800': isCurrentMonth && !isToday,
                  'cursor-not-allowed text-gray-300': !isCurrentMonth,
                  'bg-brand-2 text-white': isToday,
                  'hover:bg-brand-1 hover:text-brand-2':
                    !isToday && isCurrentMonth,
                },
              )}
            >
              {d.date()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
