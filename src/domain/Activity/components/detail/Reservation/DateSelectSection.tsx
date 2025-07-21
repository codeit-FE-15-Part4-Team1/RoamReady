// DateSelect.tsx
import { DatePicker } from '@/shared/components/ui/date-picker';

interface DateSelectSectionProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
  reservableDates: string[];
}

export default function DateSelectSection({
  selectedDate,
  onDateChange,
  reservableDates,
}: DateSelectSectionProps) {
  return (
    <section
      aria-labelledby='date-select'
      className='flex w-full flex-col gap-8'
    >
      <h3 id='date-select' className='font-size-16 font-bold'>
        날짜
      </h3>

      <DatePicker.Root
        selectedDate={selectedDate ?? undefined}
        onDateClick={(date) => onDateChange(date)}
        size='l'
        wrapperClassName='w-full'
      >
        <DatePicker.Month />
        <DatePicker.Week />
        <DatePicker.Date reservableDates={reservableDates} />
      </DatePicker.Root>
    </section>
  );
}
