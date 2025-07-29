'use client';

import { Activity, ReviewList } from '@/domain/Activity/types/detail/types';
import Footer from '@/shared/components/layouts/footer/Footer';
import { BREAKPOINTS } from '@/shared/constants/breakpoints';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

import ActivitySummary from '../activity-summary/ActivitySummary';
import ReservationMobile from '../Reservation/ReservationMobile';
import ReservationPC from '../Reservation/ReservationPC';
import ReservationTablet from '../Reservation/ReservationTablet';

/**
 * ReservationWrapper
 * 디바이스 화면 크기에 따라 알맞은 예약 컴포넌트(모바일, 태블릿, PC)를 조건부로 렌더링하는 래퍼 컴포넌트
 * - 모바일: ReservationMobile + Footer
 * - 태블릿: ReservationTablet + Footer (약간의 여백 포함)
 * - PC: ActivitySummary + ReservationPC (좌측 고정 영역)
 *
 * @param activity - 예약 대상 체험의 정보 객체 (제목, 가격, 카테고리 등 포함)
 * @param reviews - 체험에 대한 리뷰 정보 객체 (평균 평점, 리뷰 수 등 포함)
 * @returns 모바일은 ReservationMobile + Footer, 태블릿은 ReservationTablet + Footer, PC는 ActivitySummary + ReservationPC를 반환
 *
 * @example
 * <ReservationWrapper activity={activityData} reviews={reviewData} />
 */
export default function ReservationWrapper({
  activity,
  reviews,
}: {
  activity: Activity;
  reviews: ReviewList;
}) {
  const isMobile = useMediaQuery(BREAKPOINTS.MOBILE);
  const isTablet = useMediaQuery(BREAKPOINTS.TABLET);

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
