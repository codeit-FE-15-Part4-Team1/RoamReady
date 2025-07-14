import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export default function TabsList({ children, className }: TabsListProps) {
  return <div className={cn(className)}>{children}</div>;
}
