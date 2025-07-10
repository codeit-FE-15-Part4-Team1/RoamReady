import { ChevronDownIcon } from 'lucide-react';
import { createContext, useContext, useState } from 'react';

import { cn } from '../libs/cn';

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  disabled?: boolean;
}

interface SelectBoxProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

// 컨텍스트 생성
const SelectContext = createContext<SelectContextValue | null>(null);

// 컨텍스트 사용
const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within SelectBox');
  }
  return context;
};

// 트리거 컴포넌트
const SelectTrigger = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { isOpen, setIsOpen, disabled } = useSelectContext();
  return (
    <button
      disabled={disabled}
      className={cn(
        'border-black-100 flex w-full cursor-pointer items-center justify-between rounded-2xl border-2 border-black px-24 py-12 text-gray-400 transition-colors',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      onClick={() => !disabled && setIsOpen(!isOpen)}
    >
      {children}
      <ChevronDownIcon
        className={cn(
          'size-20 text-black transition-transform duration-200',
          isOpen && 'rotate-180',
        )}
      />
    </button>
  );
};

const SelectValue = ({
  placeholder = '선택해주세요.',
  className,
}: {
  placeholder?: string;
  className?: string;
}) => {
  const { value } = useSelectContext();
  return (
    <span className={cn(value ? 'text-black' : 'text-gray-400', className)}>
      {value || placeholder}
    </span>
  );
};

const SelectContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { isOpen, setIsOpen } = useSelectContext();

  return (
    <>
      {/* 백드롭 */}
      {isOpen && (
        <div
          className='fixed inset-0 z-10'
          onClick={() => setIsOpen(false)}
          role='presentation'
        />
      )}
      {/* 드롭다운 */}
      <div
        className={cn(
          'absolute top-full right-0 left-0 z-20 mt-1 rounded border bg-white shadow-lg transition-all duration-300',
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0',
          className,
        )}
      >
        {children}
      </div>
    </>
  );
};

const SelectItem = ({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const { onValueChange, setIsOpen, disabled } = useSelectContext();

  const handleClick = () => {
    if (disabled) return;
    onValueChange?.(value);
    setIsOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'h-fit w-full cursor-pointer px-24 py-12 text-left transition-colors hover:bg-gray-100',
        disabled && 'cursor-not-allowed opacity-50 hover:bg-transparent',
        className,
      )}
    >
      {children}
    </button>
  );
};

// 컨테이너 컴포넌트
export default function SelectBox({
  value,
  onValueChange,
  children,
  className,
  disabled,
}: SelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange,
        isOpen,
        setIsOpen,
        disabled,
      }}
    >
      <div className={cn('relative', className)}>{children}</div>
    </SelectContext.Provider>
  );
}

// 컴포넌트 합치기
SelectBox.Trigger = SelectTrigger;
SelectBox.Value = SelectValue;
SelectBox.Content = SelectContent;
SelectBox.Item = SelectItem;
