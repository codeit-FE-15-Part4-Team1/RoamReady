import { ChevronDownIcon } from 'lucide-react';
import { ReactNode } from 'react';

import { cn } from '../../../libs/cn';
import { useSelect } from './SelectContext';

/**
 * SelectBox의 트리거 버튼 컴포넌트
 * 클릭하면 드롭다운이 열리거나 닫힙니다.
 *
 * @param children - 트리거 내부에 표시될 내용 (보통 SelectValue)
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * <SelectTrigger>
 *   <SelectValue placeholder="선택하세요" />
 * </SelectTrigger>
 * ```
 */
export default function SelectTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { isOpen, setIsOpen, disabled } = useSelect();

  return (
    <button
      disabled={disabled}
      role='button'
      aria-expanded={isOpen}
      aria-haspopup='listbox'
      aria-label='옵션 선택'
      className={cn(
        'flex w-full cursor-pointer items-center justify-between rounded-2xl border border-gray-100 px-12 py-6 text-gray-400 transition-colors',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      onClick={() => !disabled && setIsOpen(!isOpen)}
    >
      {children}
      <ChevronDownIcon
        className={cn(
          'size-20 text-black transition-transform duration-200',
          isOpen && 'rotate-180',
        )}
        aria-hidden='true'
      />
    </button>
  );
}
