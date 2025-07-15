import { cn } from '@/shared/libs/cn';

export const DatePickerWeekDays = ({
  weekClassName,
}: {
  weekClassName?: string;
}) => {
  const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div
      className={cn(
        'font-size-16 mb-1 grid grid-cols-7 text-center font-semibold',
        weekClassName,
      )}
    >
      {WEEKDAYS.map((day, index) => {
        let colorClass = 'text-gray-500';
        if (index === 0)
          colorClass = 'text-red'; // 일요일
        else if (index === 6) colorClass = 'text-brand-2'; // 토요일

        return (
          <div key={`${day}-${index}`} className={colorClass}>
            {day}
          </div>
        );
      })}
    </div>
  );
};
