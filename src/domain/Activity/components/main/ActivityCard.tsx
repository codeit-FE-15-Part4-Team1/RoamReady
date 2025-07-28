'use client';

import Image from 'next/image';
import { MouseEvent, useState } from 'react';

import { Heart } from '@/shared/components/icons/Heart';
import { cn } from '@/shared/libs/cn';

import { Activity } from '../../schemas/main';

interface ActivityCardProp {
  activity: Activity;
  className?: string;
}

export default function ActivityCard({
  activity,
  className,
}: ActivityCardProp) {
  const { bannerImageUrl, title, price, rating, category, reviewCount } =
    activity;
  const [filled, setFilled] = useState<boolean | undefined>(false);

  const handleHeartClick = (e: MouseEvent<SVGElement>) => {
    setFilled((prev) => !prev);
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <article
      className={cn(
        'flex w-full max-w-330 transform flex-col rounded-3xl bg-white p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2',
        className,
      )}
    >
      <figure className='relative aspect-[5/6] overflow-hidden rounded-3xl'>
        <Image
          src={bannerImageUrl}
          alt={`${title} 액티비티 이미지`}
          fill
          className='object-cover'
        />

        <div className='absolute inset-0 flex items-start justify-between p-12'>
          <span className='font-size-14 rounded-3xl bg-gray-800/40 px-8 py-2 font-semibold text-white backdrop-blur-xs select-none'>
            {category}
          </span>
          <div className='flex-center size-25 active:scale-90'>
            <Heart
              className='size-23 cursor-pointer'
              filled={filled}
              onClick={handleHeartClick}
            />
          </div>
        </div>
      </figure>

      <section className='w-auto p-8 text-gray-900'>
        <div className='font-size-14 line-clamp-1 truncate font-semibold'>
          {title}
        </div>
        <div className='font-size-12 flex items-center truncate text-gray-800'>
          <span className='font-semibold'>
            ₩ {price.toLocaleString()}
            /인 ㆍ
          </span>
          <span className='truncate'>
            <span className='text-yellow-500'>★</span> {rating.toFixed(1)}{' '}
            <span className='text-gray-400'>({reviewCount})</span>
          </span>
        </div>
      </section>
    </article>
  );
}
