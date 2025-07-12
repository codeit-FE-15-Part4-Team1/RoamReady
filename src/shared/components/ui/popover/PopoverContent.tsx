'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/libs/cn';

import { usePopover } from './usePopover';

/**
 * Popover 컨텐츠의 위치를 정의하는 타입
 *
 * @description 트리거 요소를 기준으로 12가지 방향으로 배치 가능
 * - bottom: 아래쪽 (start: 왼쪽 정렬, center: 중앙 정렬, end: 오른쪽 정렬)
 * - top: 위쪽 (start: 왼쪽 정렬, center: 중앙 정렬, end: 오른쪽 정렬)
 * - left: 왼쪽 (start: 위쪽 정렬, center: 중앙 정렬, end: 아래쪽 정렬)
 * - right: 오른쪽 (start: 위쪽 정렬, center: 중앙 정렬, end: 아래쪽 정렬)
 */
type PopoverPosition =
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'left-start'
  | 'left-center'
  | 'left-end'
  | 'right-start'
  | 'right-center'
  | 'right-end';

/**
 * PopoverContent 컴포넌트의 Props 인터페이스
 *
 * @interface PopoverContentProps
 * @extends {React.HTMLAttributes<HTMLDivElement>} HTML div 요소의 모든 속성을 상속
 */
interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Popover 내부에 표시될 컨텐츠 */
  children: React.ReactNode;
  /**
   * Popover가 표시될 위치
   * @default 'bottom-center'
   */
  position?: PopoverPosition;
  /**
   * 추가 CSS 클래스명 (기본 스타일과 병합됨)
   * @optional
   */
  className?: string;
}

/**
 * Popover 컨텐츠 컴포넌트
 *
 * @description
 * - 트리거 요소 주변에 위치하는 오버레이 컨텐츠
 * - Portal을 사용하여 document.body에 직접 렌더링
 * - 12가지 방향으로 배치 가능
 * - ESC 키와 백드롭 클릭으로 닫기 지원
 * - 접근성(a11y) 속성 포함
 *
 * @component
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>클릭하세요</PopoverTrigger>
 *   <PopoverContent position="bottom-center">
 *     <p>Popover 내용</p>
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @param {PopoverContentProps} props - 컴포넌트 props
 * @returns {React.ReactPortal | null} Portal로 렌더링된 Popover 또는 null
 */
export default function PopoverContent({
  children,
  position = 'bottom-center',
  style,
  className,
  ...props
}: PopoverContentProps) {
  const { isOpen, setIsOpen, triggerRef } = usePopover();
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });
  const [transform, setTransform] = useState('');

  // 위치 계산
  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      let newPosition = { x: 0, y: 0 };
      let newTransform = '';

      // position에 따른 위치 설정
      switch (position) {
        case 'bottom-start':
          newPosition = {
            y: rect.bottom + 10,
            x: rect.left,
          };
          newTransform = '';
          break;
        case 'bottom-center':
          newPosition = {
            y: rect.bottom + 10,
            x: rect.left + rect.width / 2, // trigger 중앙점
          };
          newTransform = 'translateX(-50%)'; // popover 중앙이 trigger 중앙에
          break;
        case 'bottom-end':
          newPosition = {
            y: rect.bottom + 10,
            x: rect.right, // trigger 오른쪽
          };
          newTransform = 'translateX(-100%)'; // popover 오른쪽이 trigger 오른쪽에
          break;
        case 'top-start':
          newPosition = {
            y: rect.top - 10,
            x: rect.left,
          };
          newTransform = 'translateY(-100%)'; // popover 아래쪽이 계산된 위치에
          break;
        case 'top-center':
          newPosition = {
            y: rect.top - 10,
            x: rect.left + rect.width / 2,
          };
          newTransform = 'translateX(-50%) translateY(-100%)';
          break;
        case 'top-end':
          newPosition = {
            y: rect.top - 10,
            x: rect.right,
          };
          newTransform = 'translateX(-100%) translateY(-100%)';
          break;
        case 'left-start':
          newPosition = {
            y: rect.top,
            x: rect.left - 10,
          };
          newTransform = 'translateX(-100%)'; // popover 오른쪽이 계산된 위치에
          break;
        case 'left-center':
          newPosition = {
            y: rect.top + rect.height / 2,
            x: rect.left - 10,
          };
          newTransform = 'translateX(-100%) translateY(-50%)';
          break;
        case 'left-end':
          newPosition = {
            y: rect.bottom,
            x: rect.left - 10,
          };
          newTransform = 'translateX(-100%) translateY(-100%)';
          break;
        case 'right-start':
          newPosition = {
            y: rect.top,
            x: rect.right + 10,
          };
          newTransform = '';
          break;
        case 'right-center':
          newPosition = {
            y: rect.top + rect.height / 2,
            x: rect.right + 10,
          };
          newTransform = 'translateY(-50%)';
          break;
        case 'right-end':
          newPosition = {
            y: rect.bottom,
            x: rect.right + 10,
          };
          newTransform = 'translateY(-100%)';
          break;
      }

      setPos(newPosition);
      setTransform(newTransform);
    }
  }, [isOpen, position, triggerRef]);

  // ESC 키로 닫기 기능
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  // Portal로 body에 직접 렌더링
  const popoverElement = (
    <>
      {/* 백드롭 */}
      <div
        className='fixed inset-0 z-40'
        onClick={() => setIsOpen(false)}
        role='presentation'
      />
      {/* 실제 콘텐츠 */}
      <div
        className={cn(
          'fixed z-50 h-fit max-h-100 w-fit max-w-2xl overflow-y-auto rounded-md border border-gray-200 bg-white p-4 shadow-lg',
          className,
        )}
        id='popover-content'
        role='dialog'
        aria-modal='true'
        aria-labelledby='trigger'
        //popover 컨텐츠 위치 계산
        style={{
          top: pos.y,
          left: pos.x,
          transform: transform,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </>
  );

  return createPortal(popoverElement, document.body);
}
