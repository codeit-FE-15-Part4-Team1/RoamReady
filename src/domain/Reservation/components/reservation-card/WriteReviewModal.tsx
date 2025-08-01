'use client';

import { Dialog } from '@/shared/components/ui/dialog';
import { Reservation } from '@/domain/Reservation/schemas/reservation';
import StarRatingInput from '@/domain/Reservation/components/reservation-card/StarRatingInput';
import { useState, useCallback, memo } from 'react';
import { writeReview } from '@/domain/Reservation/services/reservation';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/shared/hooks/useToast';
import { queryClient } from '@/shared/libs/queryClient';

// 별도 컴포넌트로 분리하여 불필요한 리렌더링 방지
const ReviewTextarea = memo(
  ({
    content,
    onChange,
  }: {
    content: string;
    onChange: (value: string) => void;
  }) => {
    return (
      <>
        <textarea
          className='h-[100px] w-full resize-none rounded-[8px] border border-gray-200 p-[12px] text-[14px] placeholder:text-gray-400'
          placeholder='체험에서 느낀 경험을 자유롭게 남겨주세요'
          value={content}
          onChange={(e) => onChange(e.target.value)}
          maxLength={1000}
          autoFocus
        />
        <div className='mt-[8px] text-right text-[12px] text-gray-400'>
          {content.length}/1000
        </div>
      </>
    );
  },
);

ReviewTextarea.displayName = 'ReviewTextarea';

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
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleRatingChange = useCallback((newRating: number) => {
    setRating(newRating);
  }, []);

  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        // 모달이 닫힐 때 상태 초기화
        handleRatingChange(0);
        handleContentChange('');
      }
    },
    [handleRatingChange, handleContentChange],
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

  const handleSubmit = useCallback(() => {
    if (rating === 0 || content.trim() === '') {
      showError('별점과 리뷰 내용을 모두 입력해주세요.');
      return;
    }

    mutate(
      { reservationId: reservation.id, review: { rating, content } },
      {
        onSuccess: () => {
          onSubmit();
          setOpen(false);
        },
      },
    );
  }, [rating, content, showError, mutate, reservation.id, onSubmit]);

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content variant='review'>
        <form
          key={`review-form-${reservation.id}`}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className='flex-col-center'>
            <h3 className='text-[16px] font-bold text-gray-900 md:text-[18px]'>
              {reservation.activity.title}
            </h3>
            <p className='font-size-14 font-medium text-neutral-400'>
              {reservation.date} / {reservationStartTime} - {reservationEndTime}{' '}
              ({reservation.headCount}명)
            </p>
          </div>

          <div className='flex-center gap-2'>
            <StarRatingInput
              rating={rating}
              onRatingChange={handleRatingChange}
            />
          </div>

          <h4 className='mb-[12px] text-[14px] font-bold text-gray-900 md:text-[16px]'>
            소중한 경험을 들려주세요
          </h4>

          <ReviewTextarea content={content} onChange={handleContentChange} />

          <Dialog.Footer variant='review'>
            <button
              className='bg-brand-2 hover:bg-brand-2/90 disabled:hover:bg-brand-2 aria-disabled:hover:bg-brand-2 w-full rounded-[8px] px-[16px] py-[12px] text-[14px] font-medium text-white transition-colors disabled:opacity-50 aria-disabled:opacity-50 md:text-[16px]'
              type='submit'
            >
              제출하기
            </button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
