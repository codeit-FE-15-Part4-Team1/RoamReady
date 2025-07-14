import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

import { useTabs } from './useTabs';

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export default function TabsContent({
  value,
  children,
  className,
}: TabsContentProps) {
  const { value: selectedValue } = useTabs();
  const isSelected = selectedValue === value;

  if (!isSelected) return null;

  return (
    <div
      role='tabpanel'
      tabIndex={0}
      className={cn(className)}
      data-state={isSelected ? 'active' : 'inactive'}
    >
      {children}
    </div>
  );
}
