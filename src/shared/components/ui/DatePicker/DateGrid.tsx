import { cn } from '@/shared/libs/cn';

import { useDatePickerContext } from './context';

export const DatePickerDateGrid = ({
  gridClassName,
  dateButtonClassName,
}: {
  gridClassName?: string;
  dateButtonClassName?: string;
}) => {
  const { currentMonth, today, onDateClick, size } = useDatePickerContext();

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

  const sizeClass =
    size === 's'
      ? 'gap-3 font-size-10 w-150 min-h-150'
      : 'gap-5 font-size-16 w-300 min-h-300';
  const buttonSizeClass = size === 's' ? 'h-20 w-20 font-size-10' : 'h-40 w-40';

  return (
    <div
      className={cn(
        'grid h-fit grid-cols-7 text-center font-medium',
        sizeClass,
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
              'mx-auto flex cursor-pointer items-center justify-center rounded-full transition',
              buttonSizeClass,
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
