export default function ActivityFilterSkeleton() {
  return (
    <section className='py-8 pb-12'>
      {/* 데스크톱: 기존 레이아웃 */}
      <div className='hidden items-center justify-between lg:flex'>
        <div className='flex gap-8 px-4 py-12'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className='bg-brand-1 h-36 w-80 animate-pulse rounded-full'
            />
          ))}
        </div>
        <div className='bg-brand-1 h-36 w-120 animate-pulse rounded-full' />
      </div>

      {/* 태블릿: Sort 고정, Category 스크롤 */}
      <div className='hidden items-center gap-16 md:flex lg:hidden'>
        <div className='bg-brand-1 h-36 w-120 animate-pulse rounded-full' />
        <div className='scrollbar-none flex-1 overflow-x-auto'>
          <div className='flex gap-8 px-4 py-12'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className='bg-brand-1 h-36 w-80 animate-pulse rounded-full'
              />
            ))}
          </div>
        </div>
      </div>

      {/* 모바일: 세로 배치 */}
      <div className='space-y-12 md:hidden'>
        <div className='bg-brand-1 h-36 w-120 animate-pulse rounded-full' />
        <div className='scrollbar-none overflow-x-auto'>
          <div className='flex gap-8 px-4 py-12'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className='bg-brand-1 h-36 w-80 animate-pulse rounded-full'
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
