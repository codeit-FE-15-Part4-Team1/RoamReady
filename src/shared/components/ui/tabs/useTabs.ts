import { createContext, useContext } from 'react';

export interface TabContextValue {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const TabsContext = createContext<TabContextValue | null>(null);

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(
      'Tabs와 관련된 컴포넌트들은 Tabs 컴포넌트 안에서 사용되어야 합니다.',
    );
  }
  return context;
};
