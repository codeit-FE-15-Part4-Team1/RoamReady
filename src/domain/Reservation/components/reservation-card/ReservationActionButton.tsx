import Button from '@/shared/components/Button';
import { Reservation } from '@/domain/Reservation/schemas/reservation';
import CancelReservationModal from './CancelReservationModal';
import WriteReviewModal from './WriteReviewModal';
import { MouseEvent } from 'react';

interface ReservationActionButtonProps {
  reservation: Reservation;
  onCancelReservation?: (reservationId: number) => void;
  onWriteReview?: (reservationId: number) => void;
  isDesktop?: boolean;
}

const RESERVATION_ACTIONS = {
  CANCEL: '예약 취소',
  WRITE_REVIEW: '후기작성',
} as const;

export default function ReservationActionButton({
  reservation,
  onCancelReservation,
  onWriteReview,
  isDesktop = false,
}: ReservationActionButtonProps) {
  const baseClassName = 'font-size-14 border-none py-4';
  const responsiveClass = isDesktop
    ? 'desktop:block hidden'
    : 'desktop:hidden mt-10 w-full py-4';

  const handleCancelReservation = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCancelReservation?.(reservation.id);
  };

  const handleWriteReview = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onWriteReview?.(reservation.id);
  };

  if (reservation.status === 'pending') {
    return (
      <CancelReservationModal reservationId={reservation.id}>
        <Button
          type='button'
          size='small'
          variant='outline'
          className={`${baseClassName} ${responsiveClass} bg-neutral-200 text-neutral-600`}
        >
          {RESERVATION_ACTIONS.CANCEL}
        </Button>
      </CancelReservationModal>
    );
  }

  if (reservation.status === 'completed') {
    return (
      <WriteReviewModal
        reservation={reservation}
        onSubmit={() => onWriteReview?.(reservation.id)}
      >
        <Button
          type='button'
          size='small'
          variant='primary'
          className={`${baseClassName} ${responsiveClass} bg-brand-2 text-white`}
        >
          {RESERVATION_ACTIONS.WRITE_REVIEW}
        </Button>
      </WriteReviewModal>
    );
  }

  return null;
}
