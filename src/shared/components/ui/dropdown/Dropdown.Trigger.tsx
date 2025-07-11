'use client';

import { ReactNode } from 'react';

import { useDropdownContext } from './DropdownContext';

/**
 * DropdownTrigger
 *
 * 드롭다운 메뉴를 여닫는 트리거 버튼 컴포넌트입니다.
 *
 * 버튼 클릭 시 드롭다운의 열림 상태를 토글합니다.
 *
 * @param {ReactNode} props.children - 버튼 내부에 표시할 콘텐츠
 *
 * @example
 * ```tsx
 * <DropdownTrigger>
 *   <ProfileImg />
 * </DropdownTrigger>
 * ```
 *
 */
export default function DropdownTrigger({ children }: { children: ReactNode }) {
  const { isOpen, setIsOpen } = useDropdownContext();

  return (
    <button
      aria-expanded={isOpen}
      aria-haspopup='true'
      className='cursor-pointer'
      type='button'
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      }}
    >
      {children}
    </button>
  );
}
