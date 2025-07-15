import { cn } from '@/shared/libs/cn';

import { useDatePickerContext } from './context';
export const DatePickerDateGrid = ({
  gridClassName,
  dateButtonClassName,
  reservableDates,
}: {
  gridClassName?: string;
  dateButtonClassName?: string;
  reservableDates?: string[];
}) => {
  const { currentMonth, today, onDateClick, selectedDate, size } =
    useDatePickerContext();

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

  const reservableSet = new Set(reservableDates ?? []);

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
        const dateStr = d.format('YYYY-MM-DD');
        const isToday = d.isSame(today, 'day');
        const isSelected = selectedDate?.getTime() === d.toDate().getTime();
        const isPast = d.isBefore(today, 'day');
        const isCurrentMonth = d.month() === currentMonth.month();

        const isReservable =
          (reservableDates?.length ?? 0) > 0
            ? reservableSet.has(dateStr)
            : !isPast;

        const isAllowed = isReservable && isCurrentMonth && !isPast;
        const isDisabled = !isAllowed;

        return (
          <button
            key={i}
            onClick={() => {
              if (!isDisabled) onDateClick?.(d.toDate());
            }}
            disabled={isDisabled}
            className={cn(
              'mx-auto flex cursor-pointer items-center justify-center rounded-full transition',
              buttonSizeClass,
              {
                'cursor-not-allowed text-gray-300': isDisabled,
                'text-gray-800': !isDisabled && !isSelected && !isToday,
                'bg-brand-2 text-white': isSelected,
                'border-brand-2 border-2':
                  isToday && !isSelected && !isDisabled,
                'hover:bg-brand-1 hover:text-brand-2':
                  !isSelected && !isDisabled,
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
