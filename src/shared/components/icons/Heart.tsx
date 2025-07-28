import React from 'react';

import { cn } from '@/shared/libs/cn';

interface HeartIconProps extends React.SVGProps<SVGSVGElement> {
  filled?: boolean;
  className?: string;
}

export const Heart: React.FC<HeartIconProps> = ({
  filled = false,
  className = '',
  ...props
}) => {
  const baseClass = cn(
    'size-14 stroke-white/80 ',
    filled ? 'fill-rose-600 ' : 'fill-gray-800/20 ',
    className,
  );

  return (
    <svg
      viewBox='0 0 24 24'
      width='100%'
      height='100%'
      stroke='white'
      fill='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={baseClass}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M12 21c-.5-.4-1-0.8-1.5-1.2C6.5 16.3 2 12.3 2 7.5 2 4.4 4.4 2 7.5 2c1.8 0 3.4.9 4.5 2.3C13.1 2.9 14.7 2 16.5 2 19.6 2 22 4.4 22 7.5c0 4.8-4.5 8.8-8.5 12.3-.5.4-1 .8-1.5 1.2z' />
    </svg>
  );
};
