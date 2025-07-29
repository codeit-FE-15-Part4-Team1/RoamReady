'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import CategoryBadge from '@/domain/Activity/components/main/ActivityCard/CategoryBadge';
import LikeButton from '@/domain/Activity/components/main/ActivityCard/LikeButton';
import { Activity } from '@/domain/Activity/schemas/main';
import LogoSymbol from '@/shared/assets/logos/LogoSymbol';
import { cn } from '@/shared/libs/cn';

interface ActivityCardProp {
  activity: Activity;
  className?: string;
}

export default function ActivityCard({
  activity,
  className,
}: ActivityCardProp) {
  const { id, bannerImageUrl, title, price, rating, reviewCount } = activity;

  const [hasImageError, setHasImageError] = useState<boolean | undefined>(
    false,
  );

  useEffect(() => {
    setHasImageError(false);
  }, [bannerImageUrl]);

  return (
    <Link href={`/activities/${id}`}>
      <article
        className={cn(
          'flex w-full max-w-360 transform flex-col rounded-3xl bg-white p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2',
          className,
        )}
      >
        <figure className='relative aspect-[5/6] overflow-hidden rounded-3xl'>
          {hasImageError ? (
            <div className='bg-brand-1 flex-center absolute inset-0'>
              <LogoSymbol className='text-brand-2 w-[40%]' />
            </div>
          ) : (
            <Image
              src={bannerImageUrl}
              alt={`${title} 액티비티 이미지`}
              fill
              className='object-cover'
              onError={() => setHasImageError(true)}
              sizes='(max-width: 768px) 50dvw, (max-width: 1024px) 25dvw, 20dvw'
            />
          )}

          <div className='absolute inset-0 flex items-start justify-between p-12'>
            <CategoryBadge activity={activity} />
            <LikeButton activity={activity} />
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
    </Link>
  );
}
