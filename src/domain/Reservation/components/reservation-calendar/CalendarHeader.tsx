import dayjs from 'dayjs';

import TriangleArrow from '@/shared/assets/icons/TriangleArrow';

interface CalendarHeaderProps {
  currentDate: dayjs.Dayjs;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  return (
    <div className='flex-center gap-[1.5rem] py-20 text-3xl'>
      <button
        type='button'
        onClick={onPrevMonth}
        className='cursor-pointer rounded p-2'
        aria-label='이전 달로 이동'
      >
        <TriangleArrow direction='left' />
      </button>
      <span id='calendar-header' aria-live='polite'>
        {currentDate.format('YYYY년 MM월')}
      </span>
      <button
        type='button'
        onClick={onNextMonth}
        className='cursor-pointer rounded p-2'
        aria-label='다음 달로 이동'
      >
        <TriangleArrow direction='right' />
      </button>
    </div>
  );
}
