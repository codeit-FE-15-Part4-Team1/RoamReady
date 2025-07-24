'use client';

import { useFormStatus } from 'react-dom';

import Button from '@/shared/components/Button';

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <div className='flex w-full justify-center'>
      <Button
        variant='primary'
        loading={pending}
        size='medium'
        className='h-40'
        type='submit'
      >
        등록하기
      </Button>
    </div>
  );
}
