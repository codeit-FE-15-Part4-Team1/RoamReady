import ActivityImg from '@/domain/Activity/components/detail/activity-img/ActivityImg';
import DescriptionSection from '@/domain/Activity/components/detail/description/DescriptionSection';
import {
  activity,
  reviews,
} from '@/domain/Activity/components/detail/mock/mock-data';
import ActivitySummaryWrapper from '@/domain/Activity/components/detail/responsive-wrappers/ActivitySummaryWrapper';
import ReservationWrapper from '@/domain/Activity/components/detail/responsive-wrappers/ReservationWrapper';
import ReviewSection from '@/domain/Activity/components/detail/Review/ReviewSection';

export default function ActivityDetailPage() {
  return (
    <>
      <div className='desktop:pt-60 desktop:pb-180 tablet:pb-80 desktop:flex-row flex w-full flex-col gap-30 pt-30 pb-60 max-[767px]:pb-[180px]'>
        <div className='flex w-full flex-col gap-40'>
          <ActivityImg subImages={activity.subImages} />
          <ActivitySummaryWrapper activity={activity} reviews={reviews} />
          <DescriptionSection description={activity.description} />

          <section className='flex w-full flex-col gap-8 border-b border-gray-100 pb-40'>
            <h2 className='font-size-18 font-bold'>오시는 길</h2>
            <div className='h-450 w-full rounded-2xl bg-gray-50' />
          </section>

          <ReviewSection review={reviews} />
        </div>

        {/* PC/Tablet */}
        <div className='desktop:block tablet:block hidden'>
          <ReservationWrapper activity={activity} reviews={reviews} />
        </div>
      </div>

      {/* Mobile*/}
      <div className='desktop:hidden tablet:hidden'>
        <ReservationWrapper activity={activity} reviews={reviews} />
      </div>
    </>
  );
}
