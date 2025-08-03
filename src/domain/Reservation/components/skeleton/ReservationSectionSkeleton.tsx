function ReservationStatusFilterSkeleton() {
  return (
    <div className='desktop:px-0 flex min-w-fit gap-8 overflow-x-hidden px-4 py-12'>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className='bg-brand-1 h-32 w-80 animate-pulse rounded-full'
        />
      ))}
    </div>
  );
}

export function ReservationCardSkeleton() {
  return (
    <div className='mx-auto flex w-full max-w-full flex-col'>
      <article className='border-brand-1 flex w-full rounded-3xl border bg-white shadow-lg'>
        <section className='desktop:px-40 flex-1 p-12 py-20 sm:p-16 sm:py-24 md:p-20 md:py-30 lg:px-32 lg:py-30'>
          <div>
            {/* 상태 배지 스켈레톤 */}
            <div className='bg-brand-1 mb-10 h-20 w-60 animate-pulse rounded-full' />
          </div>
          {/* 제목 스켈레톤 */}
          <div className='bg-brand-1 mb-10 h-16 w-200 animate-pulse rounded' />
          {/* 날짜/시간 정보 스켈레톤 */}
          <div className='bg-brand-1 mb-10 h-14 w-180 animate-pulse rounded' />
          <div className='flex justify-between'>
            <div className='flex gap-10'>
              {/* 가격 스켈레톤 */}
              <div className='bg-brand-1 mb-10 h-14 w-80 animate-pulse rounded' />
              {/* 인원수 스켈레톤 */}
              <div className='bg-brand-1 mb-10 h-14 w-40 animate-pulse rounded' />
            </div>
            {/* 데스크톱 액션 버튼 스켈레톤 */}
            <div className='desktop:block hidden'>
              <div className='bg-brand-1 h-32 w-60 animate-pulse rounded' />
            </div>
          </div>
        </section>
        <figure className='desktop:max-w-250 aspect-video w-full max-w-136'>
          <div className='bg-brand-1 h-full w-full animate-pulse rounded-tr-3xl rounded-br-3xl' />
        </figure>
      </article>
      {/* 모바일 액션 버튼 스켈레톤 */}
      <div className='desktop:hidden mt-8'>
        <div className='bg-brand-1 h-32 w-full animate-pulse rounded' />
      </div>
    </div>
  );
}

export function ReservationListSkeleton() {
  return (
    <div className='space-y-16'>
      {[...Array(5)].map((_, i) => (
        <ReservationCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function ReservationSectionSkeleton() {
  return (
    <>
      <ReservationStatusFilterSkeleton />
      <ReservationListSkeleton />
    </>
  );
}
