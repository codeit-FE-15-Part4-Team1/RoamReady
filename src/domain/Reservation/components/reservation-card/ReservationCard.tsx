import Image from 'next/image';

import { Reservation } from '@/domain/Reservation/schemas/reservation';

import ReservationActionButton from './ReservationActionButton';
import ReservationStatusBadge from './ReservationStatusBadge';

interface ReservationCardProps {
  reservation: Reservation;
  onWriteReview?: (reservationId: number) => void;
}

export default function ReservationCard({
  reservation,
  onWriteReview,
}: ReservationCardProps) {
  return (
    <>
      <article className='border-brand-1 flex rounded-3xl border bg-white shadow-lg'>
        <section className='desktop:px-40 flex-1 p-20 py-30'>
          <div>
            <ReservationStatusBadge status={reservation.status} />
          </div>
          <p className='font-size-14 desktop:font-size-18 mb-10 font-bold text-neutral-900'>
            {reservation.activity.title}
          </p>
          <p className='font-size-13 desktop:font-size-16 mb-10 text-neutral-600'>
            {reservation.date} ∙ {reservation.startTime} ~ {reservation.endTime}
          </p>
          <div className='flex justify-between'>
            <div className='flex gap-10'>
              <p className='font-size-13 desktop:font-size-16 mb-10 font-bold text-neutral-900'>
                ₩{reservation.totalPrice.toLocaleString()}
              </p>
              <p className='font-size-13 desktop:font-size-16 mb-10 text-neutral-600'>
                {reservation.headCount}명
              </p>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <ReservationActionButton
                reservation={reservation}
                onWriteReview={onWriteReview}
                isDesktop={true}
              />
            </div>
          </div>
        </section>
        <figure className='desktop:w-181 relative aspect-square w-136 p-12'>
          <div className='relative h-full w-full select-none'>
            <Image
              src={reservation.activity.bannerImageUrl}
              alt={reservation.activity.title}
              fill
              className='rounded-3xl object-cover'
              draggable={false}
            />
          </div>
        </figure>
      </article>
      <ReservationActionButton
        reservation={reservation}
        onWriteReview={onWriteReview}
        isDesktop={false}
      />
    </>
  );
}
