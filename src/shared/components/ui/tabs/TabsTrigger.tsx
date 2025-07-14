import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

import { useTabs } from './useTabs';

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

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
      onClick={() => onValueChange?.(value)}
      className={cn(className)}
      data-state={isSelected ? 'active' : 'inactive'}
    >
      {children}
    </button>
  );
}
