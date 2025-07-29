import { notFound } from 'next/navigation';

import ActivityImg from '@/domain/Activity/components/detail/activity-img/ActivityImg';
import DescriptionSection from '@/domain/Activity/components/detail/description/DescriptionSection';
import KaKaoMap from '@/domain/Activity/components/detail/kakao-map/KaKaoMap';
import ActivitySummaryWrapper from '@/domain/Activity/components/detail/responsive-wrappers/ActivitySummaryWrapper';
import ReservationWrapper from '@/domain/Activity/components/detail/responsive-wrappers/ReservationWrapper';
import ReviewSection from '@/domain/Activity/components/detail/Review/ReviewSection';
import {
  getActivityDetail,
  getActivityReviews,
} from '@/domain/Activity/services/detail';
import { ReviewList } from '@/domain/Activity/types/detail/types';

interface PageParams {
  params: Promise<{ id: string }>;
}

export default async function ActivityDetailPage({ params }: PageParams) {
  const { id } = await params;

  const [activityResult, reviewsResult] = await Promise.allSettled([
    getActivityDetail(Number(id)),
    // 리뷰 1페이지만 사전 패칭하여 초기 렌더 성능 향상 및 React Query 초기 캐시로 활용
    getActivityReviews(Number(id), 1, 3),
  ]);

  if (activityResult.status !== 'fulfilled') {
    const error = activityResult.reason;
    // 404 에러면 notFound() 호출해서 404 페이지 띄우기
    if (error?.status === 404) {
      notFound();
    }
    console.error('활동 상세 정보를 불러오는 데 실패했습니다:', error);
    throw new Error('활동 정보를 불러오지 못했습니다.');
  }

  if (reviewsResult.status !== 'fulfilled') {
    console.warn('리뷰 정보를 불러오는 데 실패했습니다:', reviewsResult.reason);
  }

  const activity = activityResult.value;
  const initialReviews: ReviewList =
    reviewsResult.status === 'fulfilled'
      ? (reviewsResult.value as ReviewList)
      : {
          totalCount: 0,
          averageRating: 0,
          reviews: [],
        };

  return (
    <>
      {/* PC / Tablet 레이아웃 */}
      <div className='desktop:pt-60 desktop:pb-180 tablet:pb-80 desktop:flex-row flex w-full flex-col gap-30 pt-30 pb-20'>
        {/* 왼쪽 메인 콘텐츠 영역 */}
        <div className='flex w-full flex-col gap-40'>
          <ActivityImg
            bannerImage={activity.bannerImageUrl}
            subImages={activity.subImages}
          />
          <ActivitySummaryWrapper
            activity={activity}
            reviews={initialReviews}
          />
          <DescriptionSection description={activity.description} />

          <section className='flex w-full flex-col gap-8 border-b border-gray-100 pb-40'>
            <h2 className='font-size-18 font-bold'>오시는 길</h2>
            <KaKaoMap
              address={activity.address}
              className='tablet:h-450 h-250'
            />
          </section>

          <ReviewSection
            activityId={Number(id)}
            initialReviews={initialReviews}
          />
        </div>

        {/* 오른쪽 예약 사이드 영역 (PC/태블릿에서만 노출) */}
        <div className='desktop:block tablet:block hidden'>
          <ReservationWrapper activity={activity} reviews={initialReviews} />
        </div>
      </div>

      {/*  모바일 예약 영역 (하단 고정) */}
      <div className='desktop:hidden tablet:hidden'>
        <ReservationWrapper activity={activity} reviews={initialReviews} />
      </div>
    </>
  );
}
