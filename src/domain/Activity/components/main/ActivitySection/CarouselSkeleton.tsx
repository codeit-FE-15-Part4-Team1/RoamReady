import ActivityCardSkeleton from '@/domain/Activity/components/main/ActivityCard/ActivityCardSkeleton';

export default function CarouselSkeleton() {
  return (
    <article className='space-y-60'>
      <section className='mb-5 flex items-center justify-between'>
        <h2 className='font-size-24 desktop:font-size-26 mb-10 font-bold text-gray-900'>
          🔥 인기 체험
        </h2>
        <div className='flex gap-4' role='group' aria-label='캐러셀 네비게이션'>
          <div className='size-24 animate-pulse rounded-full bg-gray-200' />
          <div className='size-24 animate-pulse rounded-full bg-gray-200' />
        </div>
      </section>
      <section className='scrollbar-none flex gap-10 overflow-x-auto scroll-smooth pb-20'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className='w-[calc(100%/2.1)] shrink-0 snap-start md:w-[calc(100%/3.3)] lg:w-[calc(100%/4.3)] xl:w-[calc(100%/5.3)]'
          >
            <ActivityCardSkeleton />
          </div>
        ))}
      </section>
    </article>
  );
}
