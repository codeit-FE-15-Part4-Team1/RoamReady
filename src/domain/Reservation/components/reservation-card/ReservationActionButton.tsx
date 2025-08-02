import { Reservation } from '@/domain/Reservation/schemas/reservation';
import Button from '@/shared/components/Button';
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
  const baseClassName = 'font-size-14 border-none py-4';
  const responsiveClass = isDesktop
    ? 'desktop:block hidden'
    : 'desktop:hidden mt-10 w-full py-4';

  if (reservation.status === 'pending') {
    return (
      <CancelReservationModal reservationId={reservation.id}>
        <Button
          type='button'
          className={cn(
            `${baseClassName} ${responsiveClass} bg-neutral-200 text-neutral-600`,
          )}
        >
          {RESERVATION_ACTIONS.CANCEL}
        </Button>
      </CancelReservationModal>
    );
  }

  if (reservation.status === 'completed') {
    return reservation.reviewSubmitted ? (
      <Button
        type='button'
        className={cn(
          `${baseClassName} ${responsiveClass} bg-brand-1 hover:bg-brand-1 text-brand-2 cursor-auto`,
        )}
      >
        {RESERVATION_ACTIONS.REVIEW_WRITTEN}
      </Button>
    ) : (
      <WriteReviewModal
        reservation={reservation}
        onSubmit={() => onWriteReview?.(reservation.id)}
      >
        <Button
          type='button'
          variant='primary'
          className={cn(
            `${baseClassName} ${responsiveClass} bg-brand-2 text-white`,
          )}
        >
          {RESERVATION_ACTIONS.WRITE_REVIEW}
        </Button>
      </WriteReviewModal>
    );
  }

  return null;
}
