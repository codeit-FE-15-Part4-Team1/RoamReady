import { X } from 'lucide-react';
import { ReactNode } from 'react';

import Popover from '@/shared/components/ui/popover';
import { cn } from '@/shared/libs/cn';

interface ActivitySearchFieldProps {
  label: string;
  displayValue?: string;
  placeholder: string;
  popoverPosition: 'bottom-start' | 'bottom-center' | 'bottom-end';
  children: ReactNode;
  isOpen: boolean;
  isActive: boolean;
  hasActiveField: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClick: () => void;
  onClear?: () => void;
}

export default function ActivitySearchField({
  label,
  displayValue,
  placeholder,
  popoverPosition,
  children,
  isOpen,
  isActive,
  hasActiveField,
  onOpenChange,
  onClick,
  onClear,
}: ActivitySearchFieldProps) {
  const handleOpenChange = (open: boolean) => {
    // popover가 닫힐 때 약간의 지연을 두어 입력값이 확정되도록 함
    if (!open) {
      setTimeout(() => {
        onOpenChange(false);
      }, 5);
    } else {
      onOpenChange(true);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClear?.();
  };

  return (
    <Popover.Root isOpen={isOpen} onOpenChange={handleOpenChange}>
      <Popover.Trigger
        type='button'
        onClick={onClick}
        className={`relative h-full flex-1 cursor-pointer truncate px-24 py-8 text-left transition ${
          isActive
            ? 'bg-white shadow-md hover:bg-white' // 액티브된 필드: 흰색 + 그림자, 호버시 변경 없음
            : hasActiveField
              ? 'bg-neutral-100 hover:bg-neutral-200' // 액티브 필드가 있을 때: neutral-100, 호버시 neutral-200
              : 'bg-white hover:bg-neutral-100' // 기본 상태: 흰색, 호버시 neutral-100
        }`}
      >
        <div className='flex items-center justify-between'>
          <div className='min-w-0 flex-1'>
            <p className='font-size-16 font-semibold text-neutral-800'>
              {label}
            </p>
            <p className='font-size-14 truncate text-neutral-600'>
              {displayValue || placeholder}
            </p>
          </div>
          {displayValue && onClear && (
            <div
              onClick={handleClear}
              className={cn(
                'ml-8 flex-shrink-0 cursor-pointer rounded-full bg-neutral-200 p-4 text-neutral-400 hover:text-neutral-600',
                label === '위치' && 'mr-100',
              )}
            >
              <X className='size-14' />
            </div>
          )}
        </div>
      </Popover.Trigger>
      <Popover.Content
        position={popoverPosition}
        className='flex-center max-h-none w-fit min-w-400 rounded-4xl border-none p-30'
      >
        {children}
      </Popover.Content>
    </Popover.Root>
  );
}
