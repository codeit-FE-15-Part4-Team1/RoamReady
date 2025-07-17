import dayjs from 'dayjs';
import { ReactNode, useState } from 'react';

import { cn } from '@/shared/libs/cn';

import { DatePickerContext } from './DatePickerContext';

interface DatePickerRootProps {
  /**
   * 선택된 날짜 (선택되지 않았을 경우 undefined)
   */
  selectedDate?: Date;

  /**
   * 날짜 클릭 시 호출되는 콜백 함수
   * @param date - 클릭된 날짜 객체
   */
  onDateClick?: (date: Date) => void;

  /**
   * DatePicker 전체 크기 설정 ('s' | 'l'), 기본값은 'l'
   */
  size?: 's' | 'l';

  /**
   * 최상위 wrapper에 적용할 커스텀 CSS 클래스 → 해당 클래스를 통해 DatePicker 전체 크기를 조정합니다.
   */
  wrapperClassName?: string;

  /**
   * DatePicker 하위 컴포넌트들 (Month, Week, Date)
   */
  children: ReactNode;
}

/**
 * DatePickerRoot 컴포넌트
 * 내부적으로 Context를 제공하며, 현재 월 상태 및 선택된 날짜 등의 공통 값을 전달합니다.
 *
 * @param {Object} props - DatePicker 설정값을 포함한 props 객체
 * @param {Date} [props.selectedDate] - 현재 선택된 날짜입니다. 선택되지 않았으면 undefined입니다.
 * @param {(date: Date) => void} [props.onDateClick] - 날짜 버튼 클릭 시 호출되는 콜백 함수입니다.
 * @param {'s' | 'l'} [props.size='l'] - DatePicker의 전체 크기를 조절하는 옵션입니다. 기본값은 'l'입니다.
 * @param {string} [props.wrapperClassName] - 최상위 wrapper 요소에 적용할 추가 CSS 클래스입니다. (해당 클래스는 DatePicker 전체 크기로 적용됩니다.)
 * @param {ReactNode} props.children - DatePicker 내부에 렌더링될 하위 컴포넌트입니다.
 *
 * @returns {JSX.Element} 날짜 선택 기능이 포함된 컨텍스트 프로바이더 래퍼
 */
export default function DatePickerRoot({
  selectedDate,
  onDateClick,
  size = 'l',
  wrapperClassName,
  children,
}: DatePickerRootProps) {
  const selectedDayjs = selectedDate ? dayjs(selectedDate) : undefined;

  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const sizeClass = size === 's' ? 'w-150 min-h-150' : 'w-300 min-h-300';

  return (
    <DatePickerContext.Provider
      value={{
        currentMonth,
        setCurrentMonth,
        today: dayjs(),
        selectedDate: selectedDayjs,
        onDateClick,
        size,
      }}
    >
      <div className={cn('select-none', sizeClass, wrapperClassName)}>
        {children}
      </div>
    </DatePickerContext.Provider>
  );
}
