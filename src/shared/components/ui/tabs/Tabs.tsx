import { ReactNode, useState } from 'react';

import { TabsContext } from './useTabs';

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  children: ReactNode;
}

export default function Tabs({
  children,
  defaultValue,
  value,
  onValueChange,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const currentValue = value ?? internalValue;

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
