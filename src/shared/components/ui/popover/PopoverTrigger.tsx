'use client';
import { usePopover } from './usePopover';

interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function PopoverTrigger({
  children,
  onClick,
  ...props
}: PopoverTriggerProps) {
  const { isOpen, setIsOpen, triggerRef } = usePopover();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(!isOpen);
    onClick?.(e);
  };

  return (
    <button ref={triggerRef} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
