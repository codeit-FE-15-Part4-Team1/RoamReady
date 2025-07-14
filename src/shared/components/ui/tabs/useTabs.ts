import { createContext, useContext } from 'react';

/**
 * Tabs 컨텍스트에서 제공하는 값들의 인터페이스
 */
export interface TabContextValue {
  /** 현재 선택된 탭의 값 */
  value?: string;
  /** 초기 기본값 */
  defaultValue?: string;
  /** 탭 값을 변경하는 함수 */
  onValueChange?: (value: string) => void;
}

/**
 * Tabs 컴포넌트 간 상태를 공유하기 위한 React Context
 *
 * Tabs 루트 컴포넌트에서 Provider로 제공되며,
 * TabsList, TabsTrigger, TabsContent에서 소비됩니다.
 */
export const TabsContext = createContext<TabContextValue | null>(null);

/**
 * Tabs 컨텍스트 값을 사용하기 위한 커스텀 훅
 *
 * Tabs 관련 컴포넌트들에서 현재 탭 상태와 상태 변경 함수에 접근할 수 있습니다.
 * 반드시 Tabs Provider 내부에서 사용되어야 합니다.
 *
 * @throws {Error} Tabs Provider 외부에서 사용될 경우 에러를 발생시킵니다.
 *
 * @example
 * ```tsx
 * function MyTabComponent() {
 *   const { value, onValueChange } = useTabs();
 *   // ...
 * }
 * ```
 *
 * @returns Tabs 컨텍스트 값 (현재 탭 상태와 변경 함수)
 */
export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(
      'Tabs와 관련된 컴포넌트들은 Tabs 컴포넌트 안에서 사용되어야 합니다.',
    );
  }
  return context;
};
