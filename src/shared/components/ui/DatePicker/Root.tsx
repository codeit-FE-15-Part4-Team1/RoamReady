import dayjs from 'dayjs';
import { FC, ReactNode, useState } from 'react';

import { cn } from '@/shared/libs/cn';

import { DatePickerContext } from './context';

interface DatePickerRootProps {
  selectedDate?: Date;
  onDateClick?: (date: Date) => void;
  size?: 's' | 'l';
  wrapperClassName?: string;
  children: ReactNode;
}

export const DatePickerRoot: FC<DatePickerRootProps> = ({
  selectedDate,
  onDateClick,
  size = 'l',
  wrapperClassName,
  children,
}) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const sizeClass = size === 's' ? 'w-150 min-h-150' : 'w-300 min-h-300';

  return (
    <DatePickerContext.Provider
      value={{
        currentMonth,
        setCurrentMonth,
        today: dayjs(),
        selectedDate,
        onDateClick,
        size,
      }}
    >
      <div className={cn('select-none', sizeClass, wrapperClassName)}>
        {children}
      </div>
    </DatePickerContext.Provider>
  );
};
