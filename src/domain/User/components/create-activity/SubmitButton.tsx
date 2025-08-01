'use client';

import Button from '@/shared/components/Button';

export default function SubmitButton({
  isSubmitting,
  isEdit,
}: {
  isSubmitting: boolean;
  isEdit: boolean;
}) {
  return (
    <div className='flex w-full justify-center'>
      <Button
        variant='primary'
        loading={isSubmitting}
        size='medium'
        className='font-size-16 h-40'
        type='submit'
      >
        {isEdit ? '수정하기' : '등록하기'}
      </Button>
    </div>
  );
}
