import { PencilLine } from 'lucide-react';
import { ChangeEvent } from 'react';

import { cn } from '@/shared/libs/cn';

interface AvatarEditButtonProps {
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

export default function AvatarEditButton({
  onFileChange,
  isLoading,
}: AvatarEditButtonProps) {
  return (
    <label
      className={cn(
        'flex-center size-30 cursor-pointer rounded-full bg-gray-300 text-white transition-colors',
        isLoading ? 'cursor-not-allowed bg-gray-300' : 'hover:bg-gray-500',
      )}
    >
      {isLoading ? (
        <div className='border-t-brand-2 border-r-brand-2 border-b-brand-2 size-16 animate-spin rounded-full border-2 border-gray-300' />
      ) : (
        <PencilLine className='size-16 text-white' />
      )}

      <input
        type='file'
        accept='image/*'
        onChange={onFileChange}
        className='hidden'
        disabled={isLoading}
        onClick={(e) => {
          (e.target as HTMLInputElement).value = '';
        }}
      />
    </label>
  );
}
