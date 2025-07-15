import { ReactNode, useState } from 'react';

import { TabsContext } from './useTabs';

/**
 * Tabs 컴포넌트의 props 인터페이스
 */
export interface TabsProps {
  /** 초기에 선택될 탭의 값 */
  defaultValue?: string;
  /** 현재 선택된 탭의 값 */
  value?: string;
  /** 탭이 변경될 때 호출되는 콜백 함수 */
  onValueChange?: (value: string) => void;
  /** 탭 컴포넌트들을 포함하는 children */
  children: ReactNode;
}

/**
 * Tabs 루트 컴포넌트
 *
 * TabsList, TabsTrigger, TabsContent를 포함하는 최상위 컨테이너입니다.
 * Context Provider 역할을 하여 하위 컴포넌트들에게 탭 상태를 제공합니다.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
 *
 * @param props - Tabs 컴포넌트의 props
 * @returns JSX 엘리먼트
 */
export default function Tabs({
  children,
  defaultValue,
  value,
  onValueChange,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const currentValue = value ?? internalValue;

  /**
   * 탭 값이 변경될 때 호출되는 핸들러
   *
   * @param newValue - 새로 선택된 탭의 값
   */
  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider
      value={{
        value: currentValue,
        defaultValue,
        onValueChange: handleValueChange,
      }}
    >
      <div>{children}</div>
    </TabsContext.Provider>
  );
}
