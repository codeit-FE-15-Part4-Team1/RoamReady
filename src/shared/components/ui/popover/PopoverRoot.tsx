'use client';

import { createContext, ReactNode, RefObject, useRef, useState } from 'react';

interface PopoverContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export const PopoverContext = createContext<PopoverContextType | null>(null);

export default function PopoverRoot({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      {children}
    </PopoverContext.Provider>
  );
}
