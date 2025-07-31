import ActivityCardSkeleton from '@/domain/Activity/components/main/ActivityCard/ActivityCardSkeleton';
import { useResponsiveSize } from '@/domain/Activity/hooks/main/useResponsiveSize';

export default function SectionSkeleton() {
  const pageSize = useResponsiveSize();

  return (
    <section className='space-y-40'>
      {/* 헤더 스켈레톤 */}
      <div className='bg-brand-1 h-40 w-1/3 animate-pulse rounded' />

      {/* 필터 스켈레톤 */}
      <div className='py-8 pb-12'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-8'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className='bg-brand-1 h-36 w-80 animate-pulse rounded-full'
              />
            ))}
          </div>
          <div className='bg-brand-1 h-36 w-120 animate-pulse rounded' />
        </div>
      </div>

      {/* 카드 그리드 스켈레톤 */}
      <div className='grid grid-cols-2 gap-24 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'>
        {Array.from({ length: pageSize }).map((_, index) => (
          <ActivityCardSkeleton key={index} />
        ))}
      </div>

      {/* 페이지네이션 스켈레톤 */}
      <div className='flex justify-center pt-40'>
        <div className='flex flex-col'>
          <div className='mx-auto grid auto-cols-[40px] grid-flow-col items-center gap-5'>
            <div className='bg-brand-1 size-40 animate-pulse rounded' />
            <div className='bg-brand-1 size-40 animate-pulse rounded' />
            <div className='bg-brand-1 size-40 animate-pulse rounded' />
            <div className='bg-brand-1 size-40 animate-pulse rounded' />
            <div className='bg-brand-1 size-40 animate-pulse rounded' />
            <div className='bg-brand-1 size-40 animate-pulse rounded' />
            <div className='bg-brand-1 size-40 animate-pulse rounded' />
          </div>
        </div>
      </div>
    </section>
  );
}
