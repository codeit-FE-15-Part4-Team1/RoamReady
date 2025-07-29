import { ReactNode } from 'react';

import Popover from '@/shared/components/ui/popover';

interface ActivitySearchFieldProps {
  label: string;
  displayValue?: string;
  placeholder: string;
  popoverPosition: 'bottom-start' | 'bottom-center' | 'bottom-end';
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClick: () => void;
}

export default function ActivitySearchField({
  label,
  displayValue,
  placeholder,
  popoverPosition,
  children,
  isOpen,
  onOpenChange,
  onClick,
}: ActivitySearchFieldProps) {
  return (
    <Popover.Root isOpen={isOpen} onOpenChange={onOpenChange}>
      <Popover.Trigger
        type='button'
        onClick={onClick}
        className='h-full flex-1 cursor-pointer truncate rounded-full px-24 py-8 text-left transition hover:bg-neutral-200'
      >
        <p className='font-size-16 font-semibold text-neutral-800'>{label}</p>
        <p className='font-size-14 truncate text-neutral-600'>
          {displayValue || placeholder}
        </p>
      </Popover.Trigger>
      <Popover.Content
        position={popoverPosition}
        className='mt-10 max-h-none w-fit rounded-4xl border-none p-24'
      >
        {children}
      </Popover.Content>
    </Popover.Root>
  );
}
