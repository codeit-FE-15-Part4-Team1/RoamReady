'use client';

import { Activity, ReviewList } from '@/domain/Activity/types/detail/types';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

import ActivitySummary from '../activity-summary/ActivitySummary';

interface ActivitySummaryWrapperProps {
  activity: Activity;
  reviews: ReviewList;
}

export default function ActivitySummaryWrapper({
  activity,
  reviews,
}: ActivitySummaryWrapperProps) {
  const isMobile = useMediaQuery('(max-width: 1023px)');

  if (!isMobile) return null;

  return <ActivitySummary activity={activity} review={reviews} />;
}
