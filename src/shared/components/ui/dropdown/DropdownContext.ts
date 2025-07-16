'use client';

import { createContext, useContext } from 'react';

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  focusedIndex: number | null;
  setFocusedIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      'Dropdown 컴포넌트는 <Dropdown> 내부에서 사용되어야 합니다.',
    );
  }
  return context;
};
