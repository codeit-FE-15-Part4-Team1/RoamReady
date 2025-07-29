import { cn } from '@/shared/libs/cn';

import TriangleArrow from '../../../assets/icons/TriangleArrow';
import { useDatePickerContext } from './DatePickerContext';

/**
 * DatePickerMonth 컴포넌트
 * 현재 선택된 월을 표시하고, 이전/다음 달로 이동할 수 있는 네비게이션 컴포넌트입니다.
 *
 * - `<TriangleArrow>` 아이콘 버튼을 클릭하면 `currentMonth` 상태를 한 달 앞뒤로 이동시킵니다.
 * - `size`에 따라 텍스트와 아이콘 크기가 조절됩니다.
 *
 * @example
 * ```tsx
 * <DatePicker.Month />
 * ```
 *
 * @returns {JSX.Element} 월 표시 및 월 변경 버튼을 포함한 JSX 요소
 */
export default function DatePickerMonth() {
  const { currentMonth, setCurrentMonth, size } = useDatePickerContext();

  return (
    <div
      className={cn(
        'flex items-center justify-between',
        size === 's' ? 'pb-6' : 'pb-20',
      )}
      role='navigation'
      aria-label='월 변경 네비게이션'
    >
      <div
        className={cn(
          size === 's' ? 'font-size-10' : 'font-size-16',
          'font-medium text-gray-800',
        )}
        aria-live='polite'
        aria-atomic='true'
      >
        {currentMonth.format('MMMM YYYY')}
      </div>

      <div className='flex items-center gap-20'>
        <button
          type='button'
          onClick={() => setCurrentMonth((prev) => prev.subtract(1, 'month'))}
          className='cursor-pointer'
          aria-label='이전 달 보기'
        >
          <TriangleArrow
            className='text-gray-950 transition-colors hover:text-gray-300'
            direction='left'
            width={size === 's' ? '8' : '16'}
            height={size === 's' ? '8' : '16'}
          />
        </button>

        <button
          type='button'
          onClick={() => setCurrentMonth((prev) => prev.add(1, 'month'))}
          className='cursor-pointer'
          aria-label='다음 달 보기'
        >
          <TriangleArrow
            className='text-gray-950 hover:text-gray-300'
            direction='right'
            width={size === 's' ? '8' : '16'}
            height={size === 's' ? '8' : '16'}
          />
        </button>
      </div>
    </div>
  );
}
