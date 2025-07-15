import dayjs, { Dayjs } from 'dayjs';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

interface DatePickerContextValue {
  currentMonth: Dayjs;
  setCurrentMonth: Dispatch<SetStateAction<dayjs.Dayjs>>;
  today: Dayjs;
  selectedDate?: Date;
  onDateClick?: (date: Date) => void;
  size: 's' | 'l';
}

export const DatePickerContext = createContext<DatePickerContextValue | null>(
  null,
);

export const useDatePickerContext = () => {
  const context = useContext(DatePickerContext);
  if (!context)
    throw new Error(
      'DatePicker 컴포넌트는 <DatePicker.Root> 내부에서 사용되어야 합니다.',
    );
  return context;
};
