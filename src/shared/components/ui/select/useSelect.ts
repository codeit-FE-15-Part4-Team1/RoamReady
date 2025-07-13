import { createContext, useContext } from 'react';

/**
 * SelectBox 컴포넌트의 Context 타입 정의
 */
export interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  disabled?: boolean;
}

// 컨텍스트 생성
export const SelectContext = createContext<SelectContextValue | null>(null);

// 컨텍스트 사용
export const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(
      'Select 관련 컴포넌트는 Select 컴포넌트 내에서 사용되어야 합니다.',
    );
  }
  return context;
};
