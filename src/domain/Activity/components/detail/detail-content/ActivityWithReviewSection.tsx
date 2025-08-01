import { notFound } from 'next/navigation';

import ActivitySummaryWrapper from '@/domain/Activity/components/detail/responsive-wrappers/ActivitySummaryWrapper';
import ReservationWrapper from '@/domain/Activity/components/detail/responsive-wrappers/ReservationWrapper';
import {
  getActivityDetail,
  getActivityReviews,
} from '@/domain/Activity/services/detail';

export default async function ActivityWithReviewsSection({
  id,
  showReservationOnly = false,
}: {
  id: string;
  showReservationOnly?: boolean;
}) {
  const [activity, reviews] = await Promise.all([
    getActivityDetail(Number(id)).catch((error) => {
      if (error?.status === 404) notFound();
      throw error;
    }),
    getActivityReviews(Number(id), 1, 3).catch(() => ({
      totalCount: 0,
      averageRating: 0,
      reviews: [],
    })),
  ]);

  if (showReservationOnly) {
    return <ReservationWrapper activity={activity} reviews={reviews} />;
  }

  return <ActivitySummaryWrapper activity={activity} reviews={reviews} />;
}
