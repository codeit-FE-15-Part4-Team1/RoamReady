import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

import { useTabs } from './ContextTabs';

/**
 * TabsContent 컴포넌트의 props 인터페이스
 */
interface TabsContentProps {
  /** 연결된 TabsTrigger의 value와 일치해야 하는 식별 값 */
  value: string;
  /** 탭이 활성화되었을 때 표시할 내용 */
  children: ReactNode;
  /** 추가 CSS 클래스명 */
  className?: string;
}
/**
 * @component Tabs.Content
 * @description
 * 탭별로 표시되는 내용 영역입니다. value가 현재 선택된 탭과 일치할 때만 렌더링됩니다.
 * role="tabpanel" 및 접근성 속성을 지원합니다.
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
 *
 */
export default function TabsContent({
  value,
  children,
  className,
}: TabsContentProps) {
  const { value: selectedValue } = useTabs();
  const isSelected = selectedValue === value;

  // 선택되지 않은 탭의 콘텐츠는 렌더링하지 않습니다
  if (!isSelected) return null;

  return (
    <div
      role='tabpanel'
      tabIndex={0}
      className={cn('p-10', className)}
      data-state='active'
    >
      {children}
    </div>
  );
}
