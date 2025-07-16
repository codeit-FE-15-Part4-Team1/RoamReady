import { ChevronDownIcon } from 'lucide-react';
import { ReactNode } from 'react';

import { cn } from '../../../libs/cn';
import { useSelect } from './SelectContext';

interface SelectTriggerProps {
  children?: ReactNode;
  className?: string;
  editable?: boolean;
  placeholder?: string;
  type?: 'text' | 'number' | 'time' | 'date';
}

/**
 * SelectBox의 트리거 컴포넌트
 * 기본 모드에서는 클릭하면 드롭다운이 열리는 버튼으로 동작하고,
 * editable 모드에서는 직접 입력 가능한 input으로 동작합니다.
 *
 * @param children - 트리거 내부에 표시될 내용 (기본 모드에서만 사용, 보통 SelectValue)
 * @param className - 추가 CSS 클래스명
 * @param editable - true일 경우 직접 입력 가능한 input으로 렌더링
 * @param placeholder - editable 모드에서 input의 placeholder 텍스트
 * @param type - editable 모드에서 input의 type (text, number, date, time 등)
 *
 * @example
 * ```tsx
 * // 기본 Select (선택만 가능)
 * <SelectTrigger>
 *   <SelectValue placeholder="선택하세요" />
 * </SelectTrigger>
 *
 * // Editable Select (직접 입력 + 선택 가능)
 * <SelectTrigger
 *   editable
 *   type="time"
 *   placeholder="12:00"
 * />
 * ```
 */
export default function SelectTrigger({
  children,
  className,
  editable,
  placeholder,
  type = 'text',
}: SelectTriggerProps) {
  const { isOpen, setIsOpen, disabled, value, onValueChange } = useSelect();

  if (editable) {
    return (
      <div
        className={cn(
          'flex w-full items-center justify-between rounded-2xl border border-gray-100 px-12 py-6 transition-colors',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
      >
        <input
          type={type}
          value={value || ''}
          onChange={(e) => onValueChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'flex-1 bg-transparent text-black outline-none',
            'placeholder:text-gray-400',
          )}
        />
        <ChevronDownIcon
          className={cn(
            'size-20 cursor-pointer text-black transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          role='button'
          aria-label='옵션 선택'
          aria-hidden='true'
        />
      </div>
    );
  }

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
