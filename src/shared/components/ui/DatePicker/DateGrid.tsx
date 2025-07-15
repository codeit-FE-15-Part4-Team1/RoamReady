import { cn } from '@/shared/libs/cn';

import { useDatePickerContext } from './context';

export const DatePickerDateGrid = ({
  gridClassName,
  dateButtonClassName,
}: {
  gridClassName?: string;
  dateButtonClassName?: string;
}) => {
  const { currentMonth, today, onDateClick } = useDatePickerContext();

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const dateList = [];
  let date = startDate;
  while (date.isBefore(endDate) || date.isSame(endDate, 'day')) {
    dateList.push(date);
    date = date.add(1, 'day');
  }

  return (
    <div
      className={cn(
        'font-size-16 grid grid-cols-7 gap-5 text-center font-medium',
        gridClassName,
      )}
    >
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
              dateButtonClassName,
            )}
          >
            {d.date()}
          </button>
        );
      })}
    </div>
  );
};
