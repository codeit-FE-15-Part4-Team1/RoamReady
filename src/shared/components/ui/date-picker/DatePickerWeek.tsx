import { cn } from '@/shared/libs/cn';

import { useDatePickerContext } from './DatePickerContext';
interface DatePickerWeekProps {
  /**
   * 요일 행에 적용할 추가 CSS 클래스입니다.
   */
  weekClassName?: string;
}

/**
 * DatePickerWeek 컴포넌트
 *
 * DatePicker의 요일 행(S, M, T, ...)을 렌더링하는 컴포넌트입니다.
 * 크기는 context의 size(s | l)에 따라 달라지며,
 * 일요일은 빨간색, 토요일은 브랜드 색상으로 표시됩니다.
 *
 * @param {string} [props.weekClassName] - 요일 행(grid)에 적용할 사용자 지정 클래스
 *
 * @example
 * ```tsx
 * <DatePicker.Week weekClassName="custom-week-class" />
 * ```
 *
 * @returns {JSX.Element} 일~토 요일이 포함된 그리드 요소
 */
export default function DatePickerWeek({ weekClassName }: DatePickerWeekProps) {
  const { size } = useDatePickerContext();
  const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div
      className={cn(
        'font-size-16 mb-1 grid grid-cols-7 text-center font-semibold',
        size === 's' ? 'font-size-10' : 'font-size-16',
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
}
