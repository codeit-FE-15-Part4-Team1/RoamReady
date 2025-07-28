import { ChevronLeft, ChevronRight } from 'lucide-react';

import ActivityCard from '@/domain/Activity/components/main/ActivityCard';
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
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export default function ActivityPage() {
  return (
    <div>
      <article>
        <section className='mb-5 flex items-center justify-between'>
          <h2 className='desktop:font-size-20 font-bold text-gray-900'>
            인기 체험
          </h2>
          <div className='flex gap-4'>
            <button
              type='button'
              className='flex-center size-24 rounded-full border border-gray-200 bg-white'
            >
              <ChevronLeft className='size-20 text-gray-200' />
            </button>
            <button
              type='button'
              className='flex-center size-24 rounded-full border border-gray-200 bg-white'
            >
              <ChevronRight className='size-20 text-gray-200' />
            </button>
          </div>
        </section>
        <section className='scrollbar-none tablet:-mx-32 desktop:-mx-0 -mx-24 overflow-x-auto pb-20'>
          <div className='tablet:px-32 desktop:px-0 flex gap-8 px-24'>
            {MOCK_ACTIVITIES.map((activity, i) => (
              <div
                key={i}
                className='min-w-0 flex-shrink-0 basis-[calc(100%/2.2)] md:basis-[calc(100%/4.2)] lg:basis-[calc(100%/5.2)] xl:basis-[calc(100%/6.2)] 2xl:basis-1/7'
              >
                <ActivityCard
                  key={String(activity.createdAt)}
                  activity={activity}
                />
              </div>
            ))}
          </div>
        </section>
      </article>
      <article>
        <section className='mb-5'>
          <h2 className='desktop:font-size-20 font-bold text-gray-900'>
            모든 체험
          </h2>
        </section>
        <section className='grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'>
          {MOCK_ACTIVITIES.map((activity) => (
            <ActivityCard
              key={String(activity.createdAt)}
              activity={activity}
            />
          ))}
        </section>
      </article>
    </div>
  );
}
