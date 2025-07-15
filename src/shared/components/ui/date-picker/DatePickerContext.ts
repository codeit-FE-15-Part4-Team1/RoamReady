import dayjs, { Dayjs } from 'dayjs';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

/**
 * DatePickerContext에서 공유되는 값들의 타입 정의입니다.
 */
interface DatePickerContextValue {
  /**
   * 현재 렌더링 중인 달 (예: dayjs('2025-07-01'))
   */
  currentMonth: Dayjs;

  /**
   * currentMonth를 업데이트하는 함수
   */
  setCurrentMonth: Dispatch<SetStateAction<dayjs.Dayjs>>;

  /**
   * 오늘 날짜를 나타내는 dayjs 객체
   */
  today: Dayjs;

  /**
   * 현재 선택된 날짜 (선택되지 않은 경우 undefined)
   */
  selectedDate?: Date;

  /**
   * 날짜를 클릭했을 때 실행되는 콜백 함수
   */
  onDateClick?: (date: Date) => void;

  /**
   * DatePicker 크기 설정 값 ('s' | 'l')
   */
  size: 's' | 'l';
}

/**
 * DatePickerContext를 가져오는 커스텀 훅입니다.
 * <DatePicker.Root> 컴포넌트 내부에서만 호출되어야 합니다.
 *
 * @throws {Error} <DatePicker.Root> 밖에서 사용할 경우 예외를 발생시킵니다.
 * @returns {DatePickerContextValue} DatePicker 관련 공유 상태와 함수들
 */
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
