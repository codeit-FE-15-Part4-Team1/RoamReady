import { KeyboardEvent, ReactNode, useEffect, useRef } from 'react';

import { cn } from '../../../libs/cn';
import { useSelect } from './SelectContext';

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
  const {
    value: selectedValue,
    onValueChange,
    setIsOpen,
    disabled,
    focusedIndex,
    setFocusedIndex,
    options,
    setOptions,
  } = useSelect();

  const isSelected = selectedValue === value;
  const itemRef = useRef<HTMLButtonElement>(null);

  // 옵션 목록에 현재 값 등록
  useEffect(() => {
    if (!options.includes(value)) {
      setOptions([...options, value]);
    }
  }, [value, setOptions, options]);

  // 현재 아이템의 인덱스 계산
  const itemIndex = options.indexOf(value);
  const isFocused = focusedIndex === itemIndex;

  // 포커스 상태에 따라 실제 DOM 포커스 설정
  useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.focus();
    }
  }, [isFocused]);

  const handleClick = () => {
    if (disabled) return;
    onValueChange?.(value);
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        // ESC: 드롭다운 닫기
        e.preventDefault();
        setIsOpen(false);
        break;

      case 'ArrowDown':
        // 아래 화살표: 다음 옵션으로 이동 (아래쪽)
        e.preventDefault();
        setFocusedIndex(
          focusedIndex > 0 ? focusedIndex - 1 : options.length - 1,
        );
        break;

      case 'ArrowUp':
        // 위 화살표: 이전 옵션으로 이동 (위쪽)
        e.preventDefault();
        setFocusedIndex(
          focusedIndex < options.length - 1 ? focusedIndex + 1 : 0,
        );
        break;

      case 'Tab':
        // Tab: 포커스 이동 막기 (focus trap)
        e.preventDefault();
        break;

      case 'Enter':
      case ' ':
        // Enter/Space: 현재 옵션 선택하고 드롭다운 닫기
        e.preventDefault();
        onValueChange?.(value);
        setIsOpen(false);
        break;
    }
  };

  return (
    <button
      ref={itemRef}
      role='option'
      aria-selected={isSelected}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className={cn(
        'h-fit w-full cursor-pointer px-12 py-6 text-left transition-colors hover:bg-gray-100',
        disabled && 'cursor-not-allowed opacity-50 hover:bg-transparent',
        isSelected && 'bg-gray-50',
        isFocused && 'bg-blue-50',
        className,
      )}
    >
      {children}
    </button>
  );
}
