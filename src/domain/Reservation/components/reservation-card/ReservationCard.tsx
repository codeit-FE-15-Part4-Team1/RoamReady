'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/activities/${reservation.activity.id}`);
  };

  return (
    <div className='mx-auto flex w-full max-w-full flex-col'>
      <article
        className='border-brand-1 flex w-full cursor-pointer rounded-3xl border bg-white shadow-lg transition-shadow hover:shadow-xl'
        onClick={handleCardClick}
      >
        <section className='desktop:px-40 flex-1 p-12 py-20 sm:p-16 sm:py-24 md:p-20 md:py-30 lg:px-32 lg:py-30'>
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
        <figure className='desktop:max-w-250 aspect-video w-full max-w-136'>
          <div className='relative h-full w-full select-none'>
            <Image
              src={reservation.activity.bannerImageUrl}
              alt={reservation.activity.title}
              fill
              className='rounded-tr-3xl rounded-br-3xl object-cover'
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
    </div>
  );
}
