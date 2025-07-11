'use client';
import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { usePopover } from './usePopover';

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

//div 속성을 전부 받을 수 있게 하기 위해서 이쪽에서 확장
interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  position?: PopoverPosition;
}

export default function PopoverContent({
  children,
  position = 'bottom-center',
  style,
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
        className='fixed z-50 rounded-md border border-gray-200 bg-white p-4 shadow-lg'
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
