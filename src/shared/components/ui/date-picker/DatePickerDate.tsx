import { cn } from '@/shared/libs/cn';

import { useDatePickerContext } from './DatePickerContext';

interface DatePickerDateProps {
  /**
   * 날짜 버튼들이 배치되는 grid 컨테이너의 커스텀 클래스
   */
  gridClassName?: string;

  /**
   * 개별 날짜 버튼에 적용할 커스텀 클래스
   */
  dateButtonClassName?: string;

  /**
   * 예약 가능한 날짜 리스트
   */
  reservableDates?: string[];
}

/**
 * DatePickerDate 컴포넌트
 * 날짜들을 렌더링하고 선택 가능한 DatePicker의 날짜 그리드 컴포넌트입니다.
 *
 * @param {string} [props.gridClassName] - 날짜들이 배치되는 grid 컨테이너에 적용할 추가 CSS 클래스입니다.
 * @param {string} [props.dateButtonClassName] - 개별 날짜 버튼에 적용할 추가 CSS 클래스입니다.
 * @param {string[]} [props.reservableDates] - 예약 가능한 날짜들의 문자열 배열입니다. 해당 prop은 선택 옵션이며 선택하지 않으면, 현재를 기준으로 미래의 날짜들은 확인 가능합니다. (예: ['2025-07-20'])
 *
 * @example
 * ```tsx
 * <DatePicker.Date reservableDates={['2025-07-20', '2025-07-21']} />
 * ```
 *
 * @returns {JSX.Element} 날짜 버튼들로 구성된 grid 레이아웃을 반환합니다.
 */
export default function DatePickerDate({
  gridClassName,
  dateButtonClassName,
  reservableDates,
}: DatePickerDateProps) {
  const { currentMonth, today, onDateClick, selectedDate, size } =
    useDatePickerContext();

  // 현재 월의 시작일과 종료일 계산
  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');

  // 달력은 항상 "주 단위(7일)"로 표현되므로,
  // 월의 시작일 기준으로 그 주의 '일요일'까지 확장하고,
  // 월의 종료일 기준으로 그 주의 '토요일'까지 확장합니다.
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  // startDate부터 endDate까지 하루씩 증가하며 날짜 목록 생성
  const dateList = [];
  let date = startDate;
  while (date.isBefore(endDate) || date.isSame(endDate, 'day')) {
    dateList.push(date);
    date = date.add(1, 'day');
  }

  // 예약 가능 날짜를 빠르게 탐색할 수 있도록 Set으로 변환
  const reservableSet = new Set(reservableDates ?? []);

  // 크기(size)에 따라 grid 간격 및 버튼 크기 조절
  const sizeClass = size === 's' ? 'gap-3 font-size-10' : 'gap-5 font-size-16';
  const buttonSizeClass = size === 's' ? 'h-20 w-20 font-size-10' : 'h-40 w-40';

  return (
    <div
      className={cn(
        'grid h-fit grid-cols-7 text-center font-medium',
        sizeClass,
        gridClassName,
      )}
    >
      {dateList.map((d, i) => {
        const dateStr = d.format('YYYY-MM-DD');

        // 현재 날짜인지 여부
        const isToday = d.isSame(today, 'day');

        // 선택된 날짜와 일치하는지 여부
        const isSelected = selectedDate?.isSame(d, 'day');

        // 오늘 이전의 날짜인지 여부
        const isPast = d.isBefore(today, 'day');

        // 현재 렌더링 중인 월에 포함되는지 여부
        const isCurrentMonth = d.month() === currentMonth.month();

        // 예약 가능 여부: 지정된 날짜 목록이 있을 경우 Set 기준으로 체크
        const isReservable =
          (reservableDates?.length ?? 0) > 0
            ? reservableSet.has(dateStr)
            : !isPast;

        // 최종적으로 선택 가능한 날짜인지 판단 (과거/타월 제외)
        const isAllowed = isReservable && isCurrentMonth && !isPast;
        const isDisabled = !isAllowed;

        return (
          <button
            key={i}
            onClick={() => {
              if (!isDisabled) onDateClick?.(d.toDate());
            }}
            disabled={isDisabled}
            className={cn(
              'mx-auto flex cursor-pointer items-center justify-center rounded-full transition',
              buttonSizeClass,
              {
                // 비활성화된 날짜 스타일
                'cursor-not-allowed text-gray-100': isDisabled,

                // 일반 날짜 텍스트
                'text-gray-800':
                  !isDisabled &&
                  !isSelected &&
                  !isToday &&
                  d.day() !== 0 &&
                  d.day() !== 6,

                // 일요일 (활성화된 경우)
                'text-red': !isDisabled && !isSelected && d.day() === 0,

                // 토요일 (활성화된 경우)
                'text-brand-2': !isDisabled && !isSelected && d.day() === 6,

                // 선택된 날짜 스타일
                'bg-brand-2 text-white': isSelected && isCurrentMonth,
                'text-gray-100': isSelected && !isCurrentMonth,

                // 오늘 날짜 테두리 강조
                'border-brand-2 border-2':
                  isToday && !isSelected && !isDisabled,

                // 호버 시 강조 효과
                'hover:bg-brand-1 hover:text-brand-2':
                  !isSelected && !isDisabled,
              },
              dateButtonClassName,
            )}
          >
            {d.date()}
          </button>
        );
      })}
    </div>
  );
}
