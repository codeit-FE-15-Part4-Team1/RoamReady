'use client';

import { useMutation } from '@tanstack/react-query';
import { memo, useCallback, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import StarRatingInput from '@/domain/Reservation/components/reservation-card/StarRatingInput';
import { Reservation } from '@/domain/Reservation/schemas/reservation';
import { writeReview } from '@/domain/Reservation/services/reservation';
import Button from '@/shared/components/Button';
import { Dialog } from '@/shared/components/ui/dialog';
import Input from '@/shared/components/ui/input';
import { useToast } from '@/shared/hooks/useToast';
import { queryClient } from '@/shared/libs/queryClient';

// 별도 컴포넌트로 분리하여 불필요한 리렌더링 방지
const ReviewTextarea = memo(() => {
  const content = useWatch({ name: 'content' }) || '';

  return (
    <Input.Root name='content' type='textarea' maxLength={1000}>
      <Input.Label className='font-size-14 desktop:font-size-16 font-semibold text-neutral-800'>
        리뷰 작성
      </Input.Label>
      <Input.Field
        placeholder='소중한 경험을 들려주세요'
        className='!min-h-150 resize-none !p-12'
      />
      <Input.Helper className='font-size-12 mt-8 text-right text-neutral-400' />
    </Input.Root>
  );
});

ReviewTextarea.displayName = 'ReviewTextarea';

interface ReviewFormData {
  rating: number;
  content: string;
}

interface WriteReviewModalProps {
  reservation: Reservation;
  onSubmit: () => void;
  children: React.ReactNode;
}

export default function WriteReviewModal({
  reservation,
  onSubmit,
  children,
}: WriteReviewModalProps) {
  const [open, setOpen] = useState(false);
  const { showSuccess, showError } = useToast();

  const methods = useForm<ReviewFormData>({
    defaultValues: {
      rating: 0,
      content: '',
    },
  });

  const { handleSubmit, watch, reset } = methods;
  const rating = watch('rating');

  const handleRatingChange = useCallback(
    (newRating: number) => {
      methods.setValue('rating', newRating);
    },
    [methods],
  );

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        // 모달이 닫힐 때 상태 초기화
        reset();
      }
    },
    [reset],
  );

  const reservationStartTime = reservation.startTime
    .split(':')
    .slice(0, 2)
    .join(':');
  const reservationEndTime = reservation.endTime
    .split(':')
    .slice(0, 2)
    .join(':');

  const { mutate } = useMutation({
    mutationFn: ({
      reservationId,
      review,
    }: {
      reservationId: number;
      review: { rating: number; content: string };
    }) => writeReview(reservationId, review),
    onSuccess: () => {
      showSuccess('리뷰가 작성되었습니다.');
    },
    onError: (e) => {
      showError('리뷰 작성에 실패했습니다.');
      console.error(e);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['my-reservations'] });
    },
  });

  const onFormSubmit = useCallback(
    (data: ReviewFormData) => {
      if (data.rating === 0 || data.content.trim() === '') {
        showError('별점과 리뷰 내용을 모두 입력해주세요.');
        return;
      }

      mutate(
        {
          reservationId: reservation.id,
          review: { rating: data.rating, content: data.content },
        },
        {
          onSuccess: () => {
            onSubmit();
            setOpen(false);
          },
        },
      );
    },
    [showError, mutate, reservation.id, onSubmit],
  );

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content variant='review'>
        <FormProvider {...methods}>
          <form
            key={`review-form-${reservation.id}`}
            onSubmit={handleSubmit(onFormSubmit)}
          >
            <div className='flex-col-center'>
              <h3 className='font-size-16 font-semibold text-neutral-800'>
                {reservation.activity.title}
              </h3>
              <p className='font-size-14 font-medium text-neutral-400'>
                {reservation.date} / {reservationStartTime} -{' '}
                {reservationEndTime} ({reservation.headCount}명)
              </p>
            </div>

            <div className='flex-center py-24'>
              <StarRatingInput
                rating={rating}
                onRatingChange={handleRatingChange}
              />
            </div>

            <ReviewTextarea />

            <Dialog.Footer variant='review'>
              <Button
                className='bg-brand-2 hover:bg-brand-2/90 disabled:hover:bg-brand-2 aria-disabled:hover:bg-brand-2 w-full rounded-[8px] border-none px-[16px] py-[12px] text-[14px] font-medium text-white transition-colors disabled:opacity-50 aria-disabled:opacity-50 md:text-[16px]'
                type='submit'
              >
                제출하기
              </Button>
            </Dialog.Footer>
          </form>
        </FormProvider>
      </Dialog.Content>
    </Dialog.Root>
  );
}
