import { Star } from 'lucide-react';

import { Review } from '../../types/detail/types';
import { getTimeAgo } from '../../utils/getTimeAgo';

export default function ReviewCard(review: Review) {
  const { rating, user, updatedAt, content } = review;

  const date = getTimeAgo(updatedAt);

  return (
    <article className='tablet:max-h-300 scrollbar-none flex h-fit max-h-200 flex-col gap-[1.2rem] overflow-auto rounded-4xl bg-white p-20 shadow-[0_4px_20px_rgba(0,0,0,0.05)]'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-start gap-10'>
          <span className='font-size-16 font-bold text-gray-950'>
            {user.nickname}
          </span>
          <span className='font-size-10 font-medium text-gray-200'>{date}</span>
        </div>
        <div className='flex gap-1'>
          {[...Array(5)].map((_, index) => {
            const isFilled = index < rating;
            return (
              <Star
                key={index}
                size={13}
                className={`${
                  isFilled
                    ? 'fill-[#FFCB02] stroke-[#FFCB02]'
                    : 'fill-gray-100 stroke-gray-100'
                }`}
              />
            );
          })}
        </div>
      </div>
      <p className='font-size-16 line-height-1.5 font-medium text-gray-950'>
        {content}
      </p>
    </article>
  );
}
