import ActivityImg from '@/domain/Activity/components/detail/activity-img/ActivityImg';
import ActivitySummary from '@/domain/Activity/components/detail/activity-summary/ActivitySummary';
import DescriptionSection from '@/domain/Activity/components/detail/description/DescriptionSection';
import {
  activity,
  reviews,
} from '@/domain/Activity/components/detail/mock/mock-data';
import ReservationPC from '@/domain/Activity/components/detail/Reservation/ReservationPC';
import ReviewSection from '@/domain/Activity/components/detail/Review/ReviewSection';

export default function ActivityDetailPage() {
  return (
    <div className='desktop:pt-60 desktop:pb-180 flex w-full gap-20'>
      <div className='flex flex-col gap-40'>
        <ActivityImg subImages={activity.subImages} />
        <DescriptionSection description={activity.description} />
        <section>
          <h2 className='font-size-18 font-bold'>오시는 길</h2>
          <div className='h-450 w-670 rounded-2xl bg-gray-50' />
        </section>
        <ReviewSection review={reviews} />
      </div>

      <div className='flex flex-col gap-38'>
        <ActivitySummary activity={activity} review={reviews} />
        <ReservationPC activity={activity} />
      </div>
    </div>
  );
}
