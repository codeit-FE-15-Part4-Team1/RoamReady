'use client';

import Button from '@/shared/components/Button';

export default function SubmitButton({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  return (
    <div className='flex w-full justify-center'>
      <Button
        variant='primary'
        loading={isSubmitting}
        size='medium'
        className='h-40'
        type='submit'
      >
        등록하기
      </Button>
    </div>
  );
}
