import ActivityImg from '@/domain/Activity/components/detail/activity-img/ActivityImg';
import { activity } from '@/domain/Activity/components/detail/mock/mock-data';

export default function ActivityDetailPage() {
  return (
    <div>
      <ActivityImg subImages={activity.subImages} />
    </div>
  );
}
