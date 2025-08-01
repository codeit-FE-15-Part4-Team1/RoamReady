import { Suspense } from 'react';

import ActivityOnlySection from '@/domain/Activity/components/detail/detail-content/ActivityOnlySection';
import ActivityWithReviewsSection from '@/domain/Activity/components/detail/detail-content/ActivityWithReviewSection';
import ReviewOnlySection from '@/domain/Activity/components/detail/detail-content/ReviewOnlySection';
import ActivityOnlySkeleton from '@/domain/Activity/components/detail/skeleton/ActivityOnlySkeleton';
import ActivitySummarySkeleton from '@/domain/Activity/components/detail/skeleton/ActivitySummarySkeleton';
import ReservationSkeleton from '@/domain/Activity/components/detail/skeleton/ReservationSkeleton';
import ReviewSkeleton from '@/domain/Activity/components/detail/skeleton/ReviewSkeleton';

interface PageParams {
  params: Promise<{ id: string }>;
}

export default async function ActivityDetailPage({ params }: PageParams) {
  const { id } = await params;

  return (
    <>
      <div className='desktop:pt-60 desktop:pb-180 tablet:pb-80 desktop:flex-row flex w-full flex-col gap-30 pt-30 pb-20'>
        <div className='flex w-full flex-col gap-40'>
          <Suspense fallback={<ActivityOnlySkeleton />}>
            <ActivityOnlySection id={id} />
          </Suspense>

          <Suspense fallback={<ActivitySummarySkeleton />}>
            <ActivityWithReviewsSection id={id} />
          </Suspense>

          <Suspense fallback={<ReviewSkeleton />}>
            <ReviewOnlySection id={id} />
          </Suspense>
        </div>

        {/* 예약 사이드바 */}
        <div className='desktop:block tablet:block hidden'>
          <Suspense fallback={<ReservationSkeleton />}>
            <ActivityWithReviewsSection id={id} showReservationOnly />
          </Suspense>
        </div>

        {/* 모바일 예약 */}
        <div className='desktop:hidden tablet:hidden'>
          <ActivityWithReviewsSection id={id} showReservationOnly />
        </div>
      </div>
    </>
  );
}
