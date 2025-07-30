import { ReactNode } from 'react';
// ✨ 1. useFormContext를 import 합니다.
import { useFormContext } from 'react-hook-form';

import { cn } from '@/shared/libs/cn';

interface HelperProps {
  children?: ReactNode;
  className?: string;
  name: string;
}

export default function SelectHelper({
  children,
  className,
  name,
}: HelperProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;
  const isError = !!errorMessage;
  const messageToDisplay = errorMessage || children;

  return (
    <>
      {messageToDisplay && (
        <p
          className={cn(
            'font-size-12 mt-4',
            isError ? 'text-red-500' : 'text-gray-600',
            className,
          )}
        >
          {messageToDisplay}
        </p>
      )}
    </>
  );
}
