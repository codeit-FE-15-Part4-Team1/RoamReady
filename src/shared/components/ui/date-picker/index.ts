import DatePickerDate from './DatePickerDate';
import DatePickerMonth from './DatePickerMonth';
import DatePickerRoot from './DatePickerRoot';
import DatePickerWeek from './DatePickerWeek';

/**
 * DatePicker 컴포넌트 그룹입니다.
 *
 * 이 객체는 날짜 선택기를 구성하는 네 개의 하위 컴포넌트를 포함합니다:
 * - `Root`: 컨텍스트 제공자 및 상태 래퍼
 * - `Month`: 현재 월 및 월 이동 버튼 UI
 * - `Week`: 요일 헤더 (일 ~ 토)
 * - `Date`: 날짜 그리드 버튼 영역
 *
 * 이 구조는 Compound Component 패턴을 따르며,
 * 각 하위 컴포넌트를 조합하여 유연하게 커스터마이징된 DatePicker를 구성할 수 있습니다.
 *
 * @example
 * ```tsx
 * import { DatePicker } from '@/components/DatePicker';
 *
 * function ReservationCalendar() {
 *   const [selectedDate, setSelectedDate] = useState<Date | undefined>();
 *
 *   return (
 *     <DatePicker.Root
 *       selectedDate={selectedDate}
 *       onDateClick={setSelectedDate}
 *       size="l"
 *     >
 *       <DatePicker.Month />
 *       <DatePicker.Week />
 *       <DatePicker.Date reservableDates={['2025-07-20', '2025-07-21']} />
 *     </DatePickerRoot>
 *   );
 * }
 * ```
 */
export const DatePicker = {
  Root: DatePickerRoot,
  Month: DatePickerMonth,
  Week: DatePickerWeek,
  Date: DatePickerDate,
};
