'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

import { DropdownContext } from './DropdownContext';

/**
 * DropdownWrapper
 *
 * 드롭다운 메뉴의 상태를 관리하는 래퍼 컴포넌트입니다.
 *
 * 내부 클릭 이외의 외부 클릭 시 드롭다운을 닫아주는 기능을 포함하며,
 * 드롭다운 관련 상태와 참조를 Context로 하위 컴포넌트에 제공합니다.
 *
 * @param {ReactNode} props.children - 드롭다운 내부에 포함될 컴포넌트들
 *
 * @example
 * ```tsx
 * <DropdownWrapper>
 *   <DropdownTrigger>메뉴 열기</DropdownTrigger>
 *   <DropdownMenu>
 *     <DropdownItem onClick={() => console.log('메뉴1 클릭')}>메뉴1</DropdownItem>
 *     <DropdownItem onClick={() => console.log('메뉴2 클릭')}>메뉴2</DropdownItem>
 *   </DropdownMenu>
 * </DropdownWrapper>
 * ```
 */
export default function DropdownWrapper({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 또는 키보드 입력 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // 드롭다운이 열려 있는 경우에만 반응
      if (!isOpen) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, dropdownRef }}>
      <div ref={dropdownRef} className='relative inline-block'>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}
