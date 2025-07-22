import { MapPin, Star } from 'lucide-react';

import { Activity, ReviewList } from '@/domain/Activity/types/detail/types';

import ActivityDropdown from './ActivityDropdown';

export default function ActivitySummary({
  activity,
  review,
}: {
  activity: Activity;
  review: ReviewList;
}) {
  return (
    <section className='flex w-full flex-col items-start gap-8'>
      <div className='flex w-full items-start justify-between'>
        <div className='flex flex-col gap-8'>
          <span className='font-size-14 font-medium'>{activity.category}</span>
          <h1 className='font-size-24 font-bold'>{activity.title}</h1>
        </div>
        {/* Todo: 본인이 등록한 체험 여부에 따른 조건부 처리 */}
        <ActivityDropdown id={activity.id} />
      </div>

      <div className='flex items-center gap-6'>
        <Star className='fill-[#FFCB02] stroke-[#FFCB02]' size={16} />
        <span className='font-size-14 flex items-center font-medium text-gray-700'>
          {review.averageRating.toFixed(1)} {`(${review.totalCount})`}
        </span>
      </div>

      <div className='flex items-center gap-6'>
        <MapPin size={10} />
        <span className='font-size-14 flex items-center font-medium text-gray-700'>
          {activity.address}
        </span>
      </div>
    </section>
  );
}
