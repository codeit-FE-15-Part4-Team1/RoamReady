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
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 상태
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null); // 현재 키보드로 포커스된 항목 인덱스
  const focusedIndexRef = useRef<number | null>(null); // 현재 focusIndex를 추적하기 위한 ref
  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 루트 요소 참조

  // focusedIndex 상태가 변경될 때마다 ref에도 최신 값 저장
  useEffect(() => {
    focusedIndexRef.current = focusedIndex;
  }, [focusedIndex]);

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

    // 키보드 이벤트 처리 (ArrowUp / ArrowDown / Escape)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const items = dropdownRef.current?.querySelectorAll<HTMLButtonElement>(
        'ul[role="menu"] > li > button',
      );
      if (!items || items.length === 0) return;

      const currentIndex = focusedIndexRef.current; // 현재 포커스된 인덱스를 ref에서 가져옴

      // 아래 방향키: 다음 항목으로 이동
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex =
          currentIndex === null ? 0 : (currentIndex + 1) % items.length;
        items[nextIndex].focus();
        setFocusedIndex(nextIndex); // 상태 갱신
      }

      // 위 방향키: 이전 항목으로 이동
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex =
          currentIndex === null
            ? items.length - 1
            : (currentIndex - 1 + items.length) % items.length;
        items[prevIndex].focus();
        setFocusedIndex(prevIndex);
      }

      // Escape 키: 드롭다운 닫기
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
    <DropdownContext.Provider
      value={{ isOpen, setIsOpen, dropdownRef, setFocusedIndex, focusedIndex }}
    >
      <div ref={dropdownRef} className='relative inline-block'>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}
