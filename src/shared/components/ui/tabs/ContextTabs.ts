import { createContext, useContext } from 'react';

/**
 * Tabs 컨텍스트가 제공하는 값의 타입을 정의합니다.
 */
export interface TabContextValue {
  /** 현재 선택된 탭의 값. 제어 컴포넌트(controlled component)로 사용될 때 필요합니다. */
  value?: string;
  /**
   * 비제어 컴포넌트(uncontrolled component)로 사용될 때의 초기 기본값입니다.
   */
  defaultValue?: string;
  /**
   * 탭 선택이 변경될 때 호출되는 콜백 함수입니다.
   * @param value - 새로 선택된 탭의 값
   */
  onValueChange?: (value: string) => void;
}

/**
 * Tabs 컴포넌트의 상태를 하위 컴포넌트들과 공유하기 위한 React 컨텍스트입니다.
 * `Tabs` 컴포넌트의 `Provider`를 통해 `TabContextValue`를 제공합니다.
 */
export const TabsContext = createContext<TabContextValue | null>(null);

/**
 * Tabs 컨텍스트에 쉽게 접근할 수 있도록 도와주는 커스텀 훅입니다.
 * `TabsContext`로부터 `value`, `defaultValue`, `onValueChange` 등의 값을 가져옵니다.
 *
 * @example
 * ```
 * const { value, onValueChange } = useTabs();
 * ```
 * @throws {Error} `Tabs` 컴포넌트 외부에서 사용될 경우 에러를 발생시킵니다.
 * @returns {TabContextValue} Tabs 컨텍스트의 현재 값을 반환합니다.
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
