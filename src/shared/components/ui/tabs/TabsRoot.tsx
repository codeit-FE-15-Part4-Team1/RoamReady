import { ReactNode, useState } from 'react';

import { TabsContext } from './ContextTabs';

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
 * @component Tabs.Root
 * @description
 * 탭 UI의 최상위 컴포넌트로, 상태 관리와 Context Provider 역할을 합니다.
 * controlled/uncontrolled 모드를 지원합니다.
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

export default function TabsRoot({
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
      {children}
    </TabsContext.Provider>
  );
}
