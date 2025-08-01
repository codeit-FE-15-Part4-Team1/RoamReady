import ReviewSection from '@/domain/Activity/components/detail/Review/ReviewSection';
import { getActivityReviews } from '@/domain/Activity/services/detail';

interface Props {
  id: string;
}

export default async function ReviewOnlySection({ id }: Props) {
  const reviews = await getActivityReviews(Number(id), 1, 3).catch(() => ({
    totalCount: 0,
    averageRating: 0,
    reviews: [],
  }));

  return <ReviewSection activityId={Number(id)} initialReviews={reviews} />;
}
