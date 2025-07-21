import {
  activity,
  reviews,
} from '@/domain/Activity/components/detail/mock/mock-data';
import ReservationPC from '@/domain/Activity/components/detail/Reservation/ReservationPC';
import ReviewSection from '@/domain/Activity/components/detail/Review/ReviewSection';

export default function ReservationTestPage() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-100'>
      <ReservationPC activity={activity} />
      <ReviewSection review={reviews} />
    </div>
  );
}
