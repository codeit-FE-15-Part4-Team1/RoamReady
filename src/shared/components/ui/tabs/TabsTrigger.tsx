import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

import { useTabs } from './ContextTabs';

/**
 * TabsTrigger 컴포넌트의 props 인터페이스
 */
interface TabsTriggerProps {
  /** 탭을 식별하는 고유한 값 (TabsContent의 value와 매칭됨) */
  value: string;
  /** 탭 버튼에 표시할 내용 */
  children: ReactNode;
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * TabsTrigger 컴포넌트
 *
 * 개별 탭 버튼을 나타냅니다. 클릭하면 해당 value에 해당하는 TabsContent가 표시됩니다.
 * 접근성을 위한 ARIA 속성과 키보드 네비게이션을 지원합니다.
 *
 * **접근성 기능:**
 * - `role="tab"`: 스크린 리더에 탭 역할임을 알림
 * - `aria-selected`: 현재 선택 상태를 나타냄
 * - `tabIndex`: 활성 탭만 Tab 키로 접근 가능, 비활성 탭은 화살표 키로만 접근
 * - `data-value`: 키보드 네비게이션에서 탭 식별용
 * - `data-state`: CSS 스타일링용 상태 표시
 *
 * @example
 * ```tsx
 *  <Tabs.Root defaultValue="tab1">
 *   <Tabs.List>
 *     <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
 *     <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="tab1">Content 1</Tabs.Content>
 *   <Tabs.Content value="tab2">Content 2</Tabs.Content>
 * </Tabs.Root>
 * ```
 *
 * @param props - TabsTrigger 컴포넌트의 props
 * @returns JSX 엘리먼트
 */
export default function TabsTrigger({
  value,
  children,
  className,
}: TabsTriggerProps) {
  const { value: selectedValue, onValueChange } = useTabs();
  const isSelected = selectedValue === value;

  return (
    <button
      role='tab'
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      data-value={value}
      onClick={() => onValueChange?.(value)}
      className={cn(
        'border-b border-b-white px-10 py-5 text-black',
        isSelected
          ? 'text-brand-2 border-b-brand-2 border-b-2 font-semibold'
          : 'text-gray-500',
        className,
      )}
      data-state={isSelected ? 'active' : 'inactive'}
    >
      {children}
    </button>
  );
}
