import { Reservation } from '@/domain/Reservation/schemas/reservation';
import { cn } from '@/shared/libs/cn';

import CancelReservationModal from './CancelReservationModal';
import WriteReviewModal from './WriteReviewModal';

interface ReservationActionButtonProps {
  reservation: Reservation;
  onWriteReview?: (reservationId: number) => void;
  isDesktop?: boolean;
}

const RESERVATION_ACTIONS = {
  CANCEL: '예약 취소',
  WRITE_REVIEW: '후기 작성',
  REVIEW_WRITTEN: '후기 작성 완료',
} as const;

export default function ReservationActionButton({
  reservation,
  onWriteReview,
  isDesktop = false,
}: ReservationActionButtonProps) {
  const baseClassName =
    'font-size-14 font-semibold rounded-2xl border-none px-12 py-6 w-full';
  const responsiveClass = isDesktop
    ? 'desktop:block hidden'
    : 'desktop:hidden mt-10 w-full';

  if (reservation.status === 'pending') {
    return (
      <CancelReservationModal reservationId={reservation.id}>
        <button
          type='button'
          className={cn(
            baseClassName,
            'cursor-pointer bg-neutral-200 text-neutral-600 hover:bg-neutral-200/70',
            responsiveClass,
          )}
        >
          {RESERVATION_ACTIONS.CANCEL}
        </button>
      </CancelReservationModal>
    );
  }

  if (reservation.status === 'completed') {
    return reservation.reviewSubmitted ? (
      <button
        type='button'
        className={cn(
          baseClassName,
          'bg-brand-1 text-brand-2',
          responsiveClass,
        )}
      >
        {RESERVATION_ACTIONS.REVIEW_WRITTEN}
      </button>
    ) : (
      <WriteReviewModal
        reservation={reservation}
        onSubmit={() => onWriteReview?.(reservation.id)}
      >
        <button
          type='button'
          className={cn(
            baseClassName,
            'bg-brand-2 hover:bg-brand-2/80 cursor-pointer text-white',
            responsiveClass,
          )}
        >
          {RESERVATION_ACTIONS.WRITE_REVIEW}
        </button>
      </WriteReviewModal>
    );
  }

  return null;
}
