'use client';

import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

import { useDropdownContext } from './DropdownContext';

type Direction = 'bottomRight' | 'bottomLeft' | 'leftTop' | 'rightTop';

const directionClass: Record<Direction, string> = {
  bottomRight: 'left-0',
  bottomLeft: 'right-0',
  leftTop: 'top-full right-full -translate-y-1/2',
  rightTop: 'top-full left-full -translate-y-1/2',
};

/**
 * DropdownMenuProps
 *
 * DropdownMenu 컴포넌트의 prop 타입 정의입니다.
 */
interface DropdownMenuProps {
  /**
   * 드롭다운 메뉴에 들어갈 내용 (보통 DropdownItem 컴포넌트들)
   */
  children: ReactNode;

  /**
   * 메뉴 컨테이너에 추가로 적용할 클래스명 (선택사항)
   */
  menuClassName?: string;

  /**
   * 드롭다운 메뉴의 위치 지정 (기본값: bottomLeft)
   */
  direction?: Direction;
}

/**
 * DropdownMenu
 *
 * 드롭다운 메뉴 컨테이너 컴포넌트입니다.
 *
 * 드롭다운이 열려 있을 때만 자식 요소들을 보여줍니다.
 *
 * @param {ReactNode} props.children - 드롭다운 메뉴에 들어갈 내용 (보통 `DropdownItem` 컴포넌트들)
 * @param {string} props.menuClassName - 메뉴 컨테이너에 추가로 적용할 클래스명 (선택사항)
 * @param {string} props.direction - (기본값: bottomLeft) Trigger 기준 드롭다운 위치 bottomRight, bottomLeft, leftTop, rightTop 4가지 위치 제공 (선택사항)
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownItem onClick={() => console.log('메뉴 1 클릭')}>메뉴 1</DropdownItem>
 *   <DropdownItem onClick={() => console.log('메뉴 2 클릭')}>메뉴 2</DropdownItem>
 * </DropdownMenu>
 * ```
 *
 * ```
 */
export default function DropdownMenu({
  children,
  menuClassName,
  direction = 'bottomLeft',
}: DropdownMenuProps) {
  const { isOpen } = useDropdownContext();

  if (!isOpen) return null;

  const positionClass = directionClass[direction];

  return (
    <ul
      className={cn(
        'absolute z-9999 flex flex-col content-center justify-around rounded-[1.3rem] bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)]',
        positionClass,
        menuClassName,
      )}
      role='menu'
      aria-orientation='vertical'
    >
      {children}
    </ul>
  );
}
