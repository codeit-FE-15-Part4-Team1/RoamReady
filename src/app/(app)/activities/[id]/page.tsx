import ActivityImg from '@/domain/Activity/components/detail/activity-img/ActivityImg';
import DescriptionSection from '@/domain/Activity/components/detail/description/DescriptionSection';
import KaKaoMap from '@/domain/Activity/components/detail/kakao-map/KaKaoMap';
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
      {/* PC / Tablet 레이아웃 */}
      <div className='desktop:pt-60 desktop:pb-180 tablet:pb-80 desktop:flex-row flex w-full flex-col gap-30 pt-30 pb-60 max-[767px]:pb-[180px]'>
        {/* 왼쪽 메인 콘텐츠 영역 */}
        <div className='flex w-full flex-col gap-40'>
          <ActivityImg subImages={activity.subImages} />
          <ActivitySummaryWrapper activity={activity} reviews={reviews} />
          <DescriptionSection description={activity.description} />

          <section className='flex w-full flex-col gap-8 border-b border-gray-100 pb-40'>
            <h2 className='font-size-18 font-bold'>오시는 길</h2>
            <KaKaoMap
              address={activity.address}
              className='tablet:h-450 h-250'
            />
          </section>

          <ReviewSection review={reviews} />
        </div>

        {/* 오른쪽 예약 사이드 영역 (PC/태블릿에서만 노출) */}
        <div className='desktop:block tablet:block hidden'>
          <ReservationWrapper activity={activity} reviews={reviews} />
        </div>
      </div>

      {/*  모바일 예약 영역 (하단 고정) */}
      <div className='desktop:hidden tablet:hidden'>
        <ReservationWrapper activity={activity} reviews={reviews} />
      </div>
    </>
  );
}
