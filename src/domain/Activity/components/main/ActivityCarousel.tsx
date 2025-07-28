'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import ActivityCard from '@/domain/Activity/components/main/ActivityCard';
import { Activity } from '@/domain/Activity/schemas/main';
import { cn } from '@/shared/libs/cn';

interface ActivityCarouselProps {
  activities: Activity[];
}

export default function ActivityCarousel({
  activities,
}: ActivityCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1); // -1 for float precision
  }, []);

  const handleScroll = useCallback(
    (direction: 'left' | 'right') => {
      if (isScrollingRef.current) return;

      const container = scrollRef.current;
      if (!container) return;

      const scrollAmount = container.clientWidth;

      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });

      isScrollingRef.current = true;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        updateScrollState(); // 업데이트
      }, 300);
    },
    [updateScrollState],
  );

  useEffect(() => {
    updateScrollState();

    const handleResize = () => updateScrollState();
    const container = scrollRef.current;

    container?.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', handleResize);

    return () => {
      container?.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateScrollState]);

  return (
    <article>
      <section className='mb-5 flex items-center justify-between'>
        <h2 className='font-size-18 desktop:font-size-20 font-bold text-gray-900'>
          🔥 인기 체험
        </h2>
        <div className='flex gap-4'>
          <button
            type='button'
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            className='flex-center size-24 cursor-pointer rounded-full border border-gray-100 bg-gray-100 ring-gray-100 hover:ring-2 disabled:cursor-not-allowed disabled:bg-transparent disabled:ring-0'
          >
            <ChevronLeft
              className={cn(
                'size-20',
                canScrollLeft ? 'text-gray-900' : 'text-gray-200',
              )}
            />
          </button>
          <button
            type='button'
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            className={cn(
              'flex-center size-24 cursor-pointer rounded-full border border-gray-100 bg-gray-100 ring-gray-100 hover:ring-2 disabled:cursor-not-allowed disabled:bg-transparent disabled:ring-0',
            )}
          >
            <ChevronRight
              className={cn(
                'size-20',
                canScrollRight ? 'text-gray-900' : 'text-gray-200',
              )}
            />
          </button>
        </div>
      </section>

      <section
        ref={scrollRef}
        className={cn(
          'scrollbar-none flex snap-x snap-mandatory gap-10 overflow-x-auto scroll-smooth pb-20',
        )}
      >
        {activities.slice(0, 10).map((activity) => (
          <div
            key={`${activity.id}`}
            className={cn(
              'shrink-0 snap-start',
              'w-[calc(100%/2.1)] md:w-[calc(100%/3.3)] lg:w-[calc(100%/4.3)] xl:w-[calc(100%/5.3)]',
            )}
          >
            <ActivityCard activity={activity} />
          </div>
        ))}
      </section>
    </article>
  );
}
