'use client';

import { Activity, ReviewList } from '@/domain/Activity/types/detail/types';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

import ActivitySummary from '../activity-summary/ActivitySummary';

interface ActivitySummaryWrapperProps {
  activity: Activity;
  reviews: ReviewList;
}

/**
 * ActivitySummaryWrapper
 * 모바일 환경에서만 ActivitySummary 컴포넌트를 렌더링하는 래퍼 컴포넌트
 *
 * @param activity - 체험에 대한 정보 객체 (제목, 카테고리, 주소 등 포함)
 * @param reviews - 체험에 대한 리뷰 정보 객체 (평균 평점, 총 개수 등 포함)
 * @returns 모바일 뷰포트일 경우에만 ActivitySummary를 렌더링, 그렇지 않으면 null 반환
 *
 * @example
 * <ActivitySummaryWrapper activity={activityData} reviews={reviewData} />
 */
export default function ActivitySummaryWrapper({
  activity,
  reviews,
}: ActivitySummaryWrapperProps) {
  // 현재 뷰포트가 모바일(최대 1023px)인지 여부를 판단
  const isTabletOrMobile = useMediaQuery('(max-width: 1023px)');

  // 모바일 or 테블릿이 아닌 경우 컴포넌트를 렌더링하지 않음 (null 반환)
  if (!isTabletOrMobile) return null;

  // 모바일인 경우에만 ActivitySummary 렌더링
  return <ActivitySummary activity={activity} review={reviews} />;
}
