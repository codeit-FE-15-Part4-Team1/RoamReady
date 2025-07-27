import { ArrowRight } from 'lucide-react';

import ActivityCard from '@/domain/Activity/components/main/ActivityCard';
import { Activity } from '@/domain/Activity/schemas/main';

const activityMock1: Activity = {
  id: 1,
  userId: 1,
  title: '함께 배우면 즐거운 스트릿 댄스',
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

const activityMock2: Activity = {
  id: 1,
  userId: 1,
  title: '함께 배우면 즐거운 스트릿 댄스',
  description: '설명',
  category: '문화 예술',
  price: 50000,
  address: '서울특별시 강남구',
  bannerImageUrl: '/images/image-activity-2.jpg',
  rating: 5,
  reviewCount: 5,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const activityMock3: Activity = {
  id: 1,
  userId: 1,
  title: '함께 배우면 즐거운 스트릿 댄스',
  description: '설명',
  category: '문화 예술',
  price: 50000,
  address: '서울특별시 강남구',
  bannerImageUrl: '/images/image-activity-3.jpg',
  rating: 5,
  reviewCount: 5,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function ActivityPage() {
  return (
    <>
      <section className='scrollbar-none tablet:-mx-32 desktop:-mx-0 -mx-24 overflow-x-auto py-20'>
        <div className='tablet:px-32 desktop:px-0 flex gap-8 px-24'>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className='min-w-0 flex-shrink-0 basis-[calc(100%/2.2)] md:basis-[calc(100%/4.2)] lg:basis-[calc(100%/5.2)] xl:basis-[calc(100%/6.2)] 2xl:basis-1/7'
            >
              <ActivityCard activity={activityMock1} />
            </div>
          ))}
        </div>
        <div className='flex-center size-50 rounded-full border border-gray-800 bg-white shadow-lg'>
          <ArrowRight className='size-40 text-gray-800' />
        </div>
      </section>
      <section className='grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'>
        <ActivityCard activity={activityMock1} />
        <ActivityCard activity={activityMock2} />
        <ActivityCard activity={activityMock3} />
        <ActivityCard activity={activityMock1} />
        <ActivityCard activity={activityMock2} />
        <ActivityCard activity={activityMock3} />
        <ActivityCard activity={activityMock1} />
        <ActivityCard activity={activityMock2} />
        <ActivityCard activity={activityMock3} />
      </section>
    </>
  );
}
