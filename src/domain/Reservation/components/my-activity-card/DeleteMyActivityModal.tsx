'use client';

import { useMutation } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { deleteMyActivity } from '@/domain/Activity/services/detail';
import { Dialog } from '@/shared/components/ui/dialog';
import { useToast } from '@/shared/hooks/useToast';
import { queryClient } from '@/shared/libs/queryClient';

interface DeleteMyReviewModalProps {
  activityId: number;
  children: ReactNode;
}

export default function DeleteMyActivityModal({
  activityId,
  children,
}: DeleteMyReviewModalProps) {
  const { showSuccess, showError } = useToast();

  const { mutate } = useMutation({
    mutationFn: deleteMyActivity,
    onSuccess: () => {
      showSuccess('체험이 삭제되었습니다.');
    },
    onError: (e) => {
      showError(e.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['my-activities'] });
    },
  });

  const handleDelete = () => {
    mutate(activityId);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content variant='cancel'>
        <div className='text-center'>
          <div className='mx-auto mb-[16px] flex h-[48px] w-[48px] items-center justify-center rounded-full bg-red-400'>
            <span className='font-size-24 font-bold text-white'>!</span>
          </div>
          <p className='font-size-18 font-bold text-neutral-900'>
            체험을 삭제하시겠어요?
          </p>
          <p className='font-size-14 mt-8 text-center text-neutral-600'>
            삭제된 체험은 되돌릴 수 없습니다.
          </p>
        </div>
        <Dialog.Footer variant='cancel'>
          <button className='font-size-16 flex-1 cursor-pointer rounded-3xl bg-neutral-200 py-14 font-medium text-neutral-600 hover:bg-neutral-200/80'>
            아니오
          </button>
          <button
            className='font-size-16 flex-1 cursor-pointer rounded-3xl bg-red-500 py-14 font-semibold text-neutral-100 hover:bg-red-400/80'
            onClick={handleDelete}
          >
            삭제하기
          </button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}
