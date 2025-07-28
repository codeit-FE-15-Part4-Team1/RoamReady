import ActivityCarousel from '@/domain/Activity/components/main/ActivityCarousel';
import ActivitySection from '@/domain/Activity/components/main/ActivitySection';
import { Activity } from '@/domain/Activity/schemas/main';

const MOCK_ACTIVITIES: Activity[] = Array.from({ length: 60 }).map((_, i) => ({
  id: i + 1,
  userId: 1,
  title: `활동 제목 ${i + 1}`,
  description: '설명',
  category: '문화 예술',
  price: 50000 + i * 1000,
  address: '서울특별시 강남구',
  bannerImageUrl: `/images/image-activity-${(i % 17) + 1}.jpg`,
  rating: 4.5 + (i % 5) * 0.1,
  reviewCount: 5 + i,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

export default function ActivityPage() {
  return (
    <div className='space-y-40'>
      <ActivityCarousel activities={MOCK_ACTIVITIES} />
      <ActivitySection activities={MOCK_ACTIVITIES} />
    </div>
  );
}
