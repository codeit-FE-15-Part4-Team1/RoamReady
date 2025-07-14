import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

import { useTabs } from './useTabs';

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
 * TabsContent 컴포넌트
 *
 * 특정 탭이 선택되었을 때 표시되는 콘텐츠 영역입니다.
 * value prop이 현재 선택된 탭의 value와 일치할 때만 렌더링됩니다.
 *
 * **접근성 기능:**
 * - `role="tabpanel"`: 스크린 리더에 탭 패널 역할임을 알림
 * - `tabIndex={0}`: 키보드로 포커스 가능 (내부에 포커스 가능한 요소가 없는 경우)
 * - `data-state`: CSS 스타일링용 상태 표시
 *
 * @example
 * ```tsx
 * <TabsContent value="tab1" className="p-4">
 *   <h3>첫 번째 탭 내용</h3>
 *   <p>이곳에 탭의 상세 내용을 넣습니다.</p>
 * </TabsContent>
 * ```
 *
 * @param props - TabsContent 컴포넌트의 props
 * @returns 선택된 탭인 경우 JSX 엘리먼트, 아닌 경우 null
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
      data-state={isSelected ? 'active' : 'inactive'}
    >
      {children}
    </div>
  );
}
