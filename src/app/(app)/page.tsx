import ActivityCard from '@/domain/Activity/components/main/ActivityCard';
import { Activity } from '@/domain/Activity/schemas/main';

const activityMock: Activity = {
  id: 1,
  userId: 1,
  title: '제목',
  description: '설명',
  category: '문화 예술',
  price: 50000,
  address: '서울특별시 강남구',
  bannerImageUrl: '/images/image-activity-1.jpg',
  rating: 5,
  reviewCount: 5,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function ActivityPage() {
  return (
    <div className=''>
      {/* <ActivityCard />
      <ReservationCard /> */}
      asdfsadf
      <ActivityCard activity={activityMock} />
    </div>
  );
}
