import { activity } from '@/domain/Activity/components/detail/mock/mock-data';
import ReservationPC from '@/domain/Activity/components/detail/Reservation/ReservationPC';

export default function ReservationTestPage() {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <ReservationPC activity={activity} />
    </div>
  );
}
