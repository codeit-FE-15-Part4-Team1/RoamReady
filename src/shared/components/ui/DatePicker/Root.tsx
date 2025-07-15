import dayjs from 'dayjs';
import { FC, ReactNode, useState } from 'react';

import { DatePickerContext } from './context';

interface DatePickerRootProps {
  selectedDate?: Date;
  onDateClick?: (date: Date) => void;
  size?: 's' | 'l';
  children: ReactNode;
}

export const DatePickerRoot: FC<DatePickerRootProps> = ({
  selectedDate,
  onDateClick,
  size = 'l',
  children,
}) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

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
      <div className='select-none'>{children}</div>
    </DatePickerContext.Provider>
  );
};
