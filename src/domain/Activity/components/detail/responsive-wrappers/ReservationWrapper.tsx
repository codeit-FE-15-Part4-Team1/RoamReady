'use client';

import { Activity, ReviewList } from '@/domain/Activity/types/detail/types';
import Footer from '@/shared/components/layouts/footer/Footer';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

import ActivitySummary from '../activity-summary/ActivitySummary';
import ReservationMobile from '../Reservation/ReservationMobile';
import ReservationPC from '../Reservation/ReservationPC';
import ReservationTablet from '../Reservation/ReservationTablet';

export default function ReservationWrapper({
  activity,
  reviews,
}: {
  activity: Activity;
  reviews: ReviewList;
}) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width:768px) and (max-width:1023px)');

  if (isMobile) {
    return (
      <>
        <ReservationMobile activity={activity} />

        <Footer />
      </>
    );
  }

  if (isTablet) {
    return (
      <>
        <ReservationTablet activity={activity} />
        <div className='pt-100'>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <div className='sticky top-40 flex flex-col gap-38'>
      <ActivitySummary activity={activity} review={reviews} />
      <ReservationPC activity={activity} />
    </div>
  );
}
