'use client';

import { createContext, ReactNode, RefObject, useRef, useState } from 'react';

interface PopoverContextType {
  /** Popover의 열림/닫힘 상태 */
  isOpen: boolean;
  /** Popover 상태를 변경하는 함수 */
  setIsOpen: (isOpen: boolean) => void;
  /** 트리거 요소에 대한 ref 객체 (위치 계산용) */
  triggerRef: RefObject<HTMLButtonElement | null>;
}

/**
 * Popover 컨텍스트
 *
 * @description Popover 컴포넌트들 간의 상태와 ref를 공유하기 위한 React Context
 */
export const PopoverContext = createContext<PopoverContextType | null>(null);

interface PopoverRootProps {
  /** Popover 내부 컴포넌트들 (PopoverTrigger, PopoverContent 등) */
  children: ReactNode;
}

/**
 * Popover 루트 컴포넌트
 *
 * @description
 * - Popover 시스템의 최상위 컴포넌트
 * - 하위 컴포넌트들 간의 상태와 ref를 공유하는 Context Provider 역할
 * - PopoverTrigger와 PopoverContent를 감싸서 사용
 *
 * @component
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>버튼</PopoverTrigger>
 *   <PopoverContent>내용</PopoverContent>
 * </Popover>
 * ```
 *
 * @param {PopoverRootProps} props - 컴포넌트 props
 * @returns {JSX.Element} Context Provider로 감싸진 children
 */
export default function Popover({ children }: PopoverRootProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      {children}
    </PopoverContext.Provider>
  );
}
