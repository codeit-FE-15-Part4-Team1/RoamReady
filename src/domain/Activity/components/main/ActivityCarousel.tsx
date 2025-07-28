import { ChevronLeft, ChevronRight } from 'lucide-react';

import ActivityCard from '@/domain/Activity/components/main/ActivityCard';
import { Activity } from '@/domain/Activity/schemas/main';

interface ActivityCarouselProps {
  activities: Activity[];
}

export default function ActivityCarousel({
  activities,
}: ActivityCarouselProps) {
  return (
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
          {activities.map((activity, i) => (
            <div
              key={i}
              className='min-w-0 flex-shrink-0 basis-[calc(100%/2.2)] md:basis-[calc(100%/4.2)] lg:basis-[calc(100%/5.2)] xl:basis-[calc(100%/6.2)] 2xl:basis-1/7'
            >
              <ActivityCard
                key={`${activity.title}-${String(activity.createdAt)}`}
                activity={activity}
              />
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
