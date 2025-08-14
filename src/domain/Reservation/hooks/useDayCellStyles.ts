import { Dayjs } from 'dayjs';
import { useMemo } from 'react';

interface UseDayCellStylesProps {
  day: Dayjs;
  isCurrentMonth: boolean;
  isToday: boolean;
  isLastRow: boolean;
}

export const useDayCellStyles = ({
  day,
  isCurrentMonth,
  isToday,
  isLastRow,
}: UseDayCellStylesProps) => {
  return useMemo(() => {
    const cellClasses = `
      relative flex aspect-square cursor-pointer flex-col items-center justify-start p-1 md:p-2 text-center font-size-14
      hover:bg-gray-50 
      ${!isLastRow ? 'border-b-[0.05rem] border-gray-100' : ''} 
      ${!isCurrentMonth ? 'bg-neutral-200 text-gray-400 opacity-50' : ''} 
      ${isToday ? 'border-blue-300 bg-blue-100' : ''}
    `;

    const dayOfWeek = day.day();
    const dateClasses = `font-size-14 ${
      dayOfWeek === 0
        ? 'text-red-500'
        : dayOfWeek === 6
          ? 'text-blue-500'
          : isCurrentMonth
            ? 'text-gray-900'
            : ''
    }`;
    return { cellClasses, dateClasses };
  }, [day, isCurrentMonth, isToday, isLastRow]);
};
