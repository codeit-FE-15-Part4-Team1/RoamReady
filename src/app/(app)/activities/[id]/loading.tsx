import ActivityDescriptionSkeleton from '@/domain/Activity/components/detail/skeleton/ActivityDescriptionSkeleton';
import ActivityImgSkeleton from '@/domain/Activity/components/detail/skeleton/ActivityImgSkeleton';
import ActivitySummarySkeleton from '@/domain/Activity/components/detail/skeleton/ActivitySummarySkeleton';
import KaKaoSkeleton from '@/domain/Activity/components/detail/skeleton/KaKaoSkeleton';
import ReservationSkeleton from '@/domain/Activity/components/detail/skeleton/ReservationSkeleton';
import ReviewSkeleton from '@/domain/Activity/components/detail/skeleton/ReviewSkeleton';

export default function ActivityDetailLoading() {
  return (
    <div className='desktop:pt-60 desktop:pb-180 tablet:pb-80 desktop:flex-row flex w-full flex-col gap-30 pt-30 pb-20'>
      {/* 왼쪽 메인 콘텐츠 영역 */}
      <div className='flex w-full flex-col gap-40'>
        <ActivityImgSkeleton />
        <div className='tablet:hidden'>
          <ActivitySummarySkeleton />
        </div>
        <ActivityDescriptionSkeleton />
        <KaKaoSkeleton />
        <ReviewSkeleton />
      </div>

      <div className='desktop:block tablet:block hidden'>
        <div className='flex flex-col gap-38'>
          <ActivitySummarySkeleton />
          <ReservationSkeleton />
        </div>
      </div>
    </div>
  );
}
