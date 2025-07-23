'use client';
import { KeyboardEvent, ReactNode, useRef } from 'react';

import { cn } from '@/shared/libs/cn';

import { useTabs } from './ContextTabs';

/**
 * TabsList 컴포넌트의 props 인터페이스
 */
interface TabsListProps {
  /** TabsTrigger 컴포넌트들을 포함하는 children */
  children: ReactNode;
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * @component Tabs.List
 * @description
 * 탭 버튼(Trigger)들을 감싸는 컨테이너입니다.
 * 키보드 네비게이션(좌/우/상/하, Home/End) 및 접근성을 지원합니다.
 *
 * @example
 * <Tabs.Root defaultValue="tab1">
 *   <Tabs.List>
 *     <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
 *     <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="tab1">Content 1</Tabs.Content>
 *   <Tabs.Content value="tab2">Content 2</Tabs.Content>
 * </Tabs.Root>
 */
export default function TabsList({ children, className }: TabsListProps) {
  const { onValueChange } = useTabs();
  const listRef = useRef<HTMLDivElement>(null);

  /**
   * 키보드 이벤트를 처리하여 탭 간 네비게이션을 구현합니다.
   * WAI-ARIA 가이드라인에 따른 표준 키보드 인터페이스를 제공합니다.
   *
   * @param e - 키보드 이벤트 객체
   *
   * **처리하는 키:**
   * - `ArrowRight`, `ArrowDown`: 다음 탭 (순환)
   * - `ArrowLeft`, `ArrowUp`: 이전 탭 (순환)
   * - `Home`: 첫 번째 탭
   * - `End`: 마지막 탭
   */
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!listRef.current) return;

    // TabsList 내의 모든 탭 버튼 요소들을 찾습니다
    const triggers = Array.from(
      listRef.current.querySelectorAll('[role="tab"]'),
    ) as HTMLButtonElement[];

    // 현재 포커스된 탭의 인덱스를 찾습니다
    const currentIndex = triggers.findIndex(
      (trigger) => trigger === document.activeElement,
    );

    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = currentIndex + 1;
        if (nextIndex >= triggers.length) {
          nextIndex = 0; // 순환: 마지막에서 첫번째로
        }
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = triggers.length - 1; // 순환: 첫번째에서 마지막으로
        }
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = triggers.length - 1;
        break;
      default:
        return;
    }

    const nextTrigger = triggers[nextIndex];
    if (nextTrigger) {
      nextTrigger.focus();
      // data-value 속성에서 탭의 value를 가져와서 상태를 업데이트합니다
      const value = nextTrigger.getAttribute('data-value');
      if (value && value.trim()) {
        onValueChange?.(value);
      }
    }
  };

  return (
    <div
      ref={listRef}
      role='tablist'
      className={cn(className, 'border-b border-gray-200')}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}
