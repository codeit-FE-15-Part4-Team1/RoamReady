import { ReactNode } from 'react';

import { cn } from '../../../libs/cn';
import { useSelect } from './useSelect';

/**
 * 개별 선택 옵션 컴포넌트
 * 클릭 시 해당 값으로 선택되고 드롭다운이 닫힙니다.
 *
 * @param value - 선택 시 설정될 값
 * @param children - 옵션에 표시될 내용
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * <SelectItem value="travel">🧳 여행</SelectItem>
 * <SelectItem value="food">🍽️ 음식</SelectItem>
 * ```
 */
export default function SelectItem({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const { onValueChange, setIsOpen, disabled } = useSelect();

  const handleClick = () => {
    if (disabled) return;
    onValueChange?.(value);
    setIsOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'h-fit w-full cursor-pointer px-12 py-6 text-left transition-colors hover:bg-gray-100',
        disabled && 'cursor-not-allowed opacity-50 hover:bg-transparent',
        className,
      )}
    >
      {children}
    </button>
  );
}
