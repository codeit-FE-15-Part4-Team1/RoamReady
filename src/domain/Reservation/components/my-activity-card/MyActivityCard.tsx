import Image from 'next/image';

import MyActivityActionButton from '@/domain/Reservation/components/my-activity-card/MyActivityActionButton';
import StarIcon from '@/domain/Reservation/components/reservation-card/StarIcon';
import { Activity } from '@/domain/Reservation/schemas/activity';

interface MyActivityCardProps {
  activity: Activity;
}

/**
 * 내 체험 카드 컴포넌트
 */
export default function MyActivityCard({ activity }: MyActivityCardProps) {
  return (
    <article className='border-brand-1 flex-center rounded-3xl border bg-white shadow-lg'>
      <section className='desktop:px-40 flex-1 p-20 py-30'>
        <h3 className='font-size-16 desktop:font-size-18 font-bold text-neutral-900'>
          {activity.title}
        </h3>
        <div className='font-size-14 desktop:font-size-16 flex items-center gap-8 text-neutral-500'>
          <div className='flex items-center gap-4'>
            <StarIcon className='size-14 text-yellow-300' />
            <span className='font-size-14 desktop:font-size-14 font-medium text-neutral-400'>
              {activity.rating.toFixed(1)}
            </span>
            <span className='font-size-14 desktop:font-size-14 font-medium text-neutral-400'>
              ({activity.reviewCount})
            </span>
          </div>
        </div>
        <div className='font-size-14 desktop:font-size-16 flex items-center justify-between text-neutral-500'>
          <span className='font-size-16 desktop:font-size-18 font-bold text-neutral-800'>
            ₩{activity.price.toLocaleString()}
            <span className='font-size-14 desktop:font-size-16 font-medium text-neutral-400'>
              {' '}
              / 인
            </span>
          </span>
          <div className='desktop:block hidden'>
            <MyActivityActionButton activity={activity} />
          </div>
        </div>
        <div className='desktop:hidden'>
          <MyActivityActionButton activity={activity} />
        </div>
      </section>
      <figure className='desktop:w-181 relative aspect-square w-136 p-12'>
        <Image
          src={activity.bannerImageUrl}
          alt={activity.title}
          fill
          className='rounded-tr-3xl rounded-br-3xl object-cover'
        />
      </figure>
    </article>
  );
}
