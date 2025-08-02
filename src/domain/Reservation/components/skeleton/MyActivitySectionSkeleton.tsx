export function MyActivityCardSkeleton() {
  return (
    <article className='border-brand-1 flex rounded-3xl border bg-white shadow-lg'>
      <section className='desktop:px-40 flex-1 p-20 py-30'>
        <div className='bg-brand-1 mb-8 h-20 w-200 animate-pulse rounded' />
        <div className='mb-8 flex items-center gap-8'>
          <div className='bg-brand-1 h-16 w-60 animate-pulse rounded-full' />
          <div className='bg-brand-1 h-16 w-80 animate-pulse rounded' />
        </div>
        <div className='bg-brand-1 mb-8 h-32 w-full animate-pulse rounded' />
        <div className='flex items-center justify-between'>
          <div className='bg-brand-1 h-20 w-100 animate-pulse rounded' />
          <div className='bg-brand-1 h-16 w-120 animate-pulse rounded' />
        </div>
      </section>
      <figure className='desktop:w-181 relative aspect-square w-136'>
        <div className='bg-brand-1 h-full w-full animate-pulse rounded-tr-3xl rounded-br-3xl' />
      </figure>
    </article>
  );
}

export function MyActivityListSkeleton() {
  return (
    <div className='space-y-16'>
      {[1, 2, 3].map((i) => (
        <MyActivityCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * 내 체험 섹션 스켈레톤 컴포넌트
 */
export default function MyActivitySectionSkeleton() {
  return <MyActivityListSkeleton />;
}
