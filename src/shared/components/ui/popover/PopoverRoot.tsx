'use client';

import { createContext, useState } from 'react';

interface PopoverContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const PopoverContext = createContext<PopoverContextType | null>(null);

export default function PopoverRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </PopoverContext.Provider>
  );
}
