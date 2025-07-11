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
  const { isOpen, setIsOpen } = usePopover();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(!isOpen);
    onClick?.(e);
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
