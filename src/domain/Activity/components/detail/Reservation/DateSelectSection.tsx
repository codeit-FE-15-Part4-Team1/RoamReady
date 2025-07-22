import { DatePicker } from '@/shared/components/ui/date-picker';

interface DateSelectSectionProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
  reservableDates: string[];
}

/**
 * DateSelectSection
 * 예약 가능한 날짜 중 하나를 선택할 수 있는 날짜 선택 섹션 컴포넌트
 *
 * @param selectedDate - 현재 선택된 날짜 (없을 경우 null)
 * @param onDateChange - 날짜 선택 시 호출되는 콜백 함수
 * @param reservableDates - 예약 가능한 날짜 목록 (YYYY-MM-DD 형식의 문자열 배열)
 * @returns 날짜 선택 UI(DatePicker 포함)를 렌더링한 section 요소
 *
 * @example
 * <DateSelectSection
 *   selectedDate={new Date()}
 *   onDateChange={(date) => setSelectedDate(date)}
 *   reservableDates={['2025-08-01', '2025-08-03']}
 * />
 */
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
        selectedDate={selectedDate ?? undefined} // 선택된 날짜가 없으면 undefined 처리
        onDateClick={(date) => onDateChange(date)} // 날짜 선택 시 콜백 실행
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
