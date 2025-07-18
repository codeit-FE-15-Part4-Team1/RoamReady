'use client';
import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

import { usePopover } from './PopoverContext';

/**
 * PopoverTrigger 컴포넌트의 Props 인터페이스
 *
 * @interface PopoverTriggerProps
 * @extends {ButtonHTMLAttributes<HTMLButtonElement>} HTML button 요소의 모든 속성을 상속
 */
interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 트리거 버튼 내부에 표시될 컨텐츠 */
  children: ReactNode;
  /**
   * 추가 CSS 클래스명 (기본 스타일과 병합됨)
   * @optional
   */
  className?: string;
}

/**
 * Popover 트리거 컴포넌트
 *
 * @description
 * - Popover를 열고 닫는 트리거 역할을 하는 버튼 컴포넌트
 * - 클릭 시 Popover의 열림/닫힘 상태를 토글
 * - 접근성(a11y) 속성이 포함되어 스크린 리더 지원
 * - 버튼의 모든 표준 HTML 속성 지원
 *
 * @component
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger className="px-4 py-2 bg-blue-500 text-white">
 *     클릭하세요
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     Popover 내용
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @param {PopoverTriggerProps} props - 컴포넌트 props
 * @returns {JSX.Element} 렌더링된 트리거 버튼
 */
export default function PopoverTrigger({
  children,
  onClick,
  className,
  ...props
}: PopoverTriggerProps) {
  const { isOpen, setIsOpen, triggerRef } = usePopover();

  /**
   * 트리거 클릭 핸들러
   *
   * @param {MouseEvent<HTMLButtonElement>} e - 마우스 클릭 이벤트
   */
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsOpen(!isOpen);
    onClick?.(e);
  };

  return (
    <button
      aria-expanded={isOpen}
      aria-haspopup='dialog'
      aria-controls='popover-content'
      aria-describedby={isOpen ? 'popover-content' : undefined}
      className={cn('cursor-pointer', className)}
      ref={triggerRef}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
