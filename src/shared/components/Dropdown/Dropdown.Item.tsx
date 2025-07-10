'use client';

import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

import { useDropdownContext } from './DropdownContext';

/**
 * DropdownItem
 *
 * Dropdown 내 개별 항목 컴포넌트입니다.
 *
 * 클릭 시 `onClick` 핸들러가 실행되고, 드롭다운 메뉴가 닫힙니다.
 *
 * @param {ReactNode | string} props.children - 버튼 안에 들어갈 콘텐츠
 * @param {() => void} props.onClick - 버튼 클릭 시 실행될 함수
 * @param {string} [props.itemClassName] - 버튼에 추가로 적용할 클래스명 (선택사항)
 *
 * @example
 * ```tsx
 * <DropdownItem onClick={() => console.log('클릭됨!')}>
 *   메뉴 1
 * </DropdownItem>
 * ```
 *
 */
export default function DropdownItem({
  children,
  onClick,
  itemClassName,
}: {
  children: string | ReactNode;
  onClick: () => void;
  itemClassName?: string;
}) {
  const { setIsOpen } = useDropdownContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
    setIsOpen(false);
  };

  return (
    <li className='h-fit w-fit'>
      <button
        className={cn(
          'hover:bg-brand-1 text-13 z-30 block h-[4.5rem] w-[8rem] cursor-pointer rounded-[1.2rem] font-medium',
          itemClassName,
        )}
        type='button'
        onClick={handleClick}
      >
        {children}
      </button>
    </li>
  );
}
