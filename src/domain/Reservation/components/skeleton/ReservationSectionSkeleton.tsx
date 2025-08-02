function ReservationStatusFilterSkeleton() {
  return (
    <div className='desktop:px-0 flex min-w-fit gap-8 px-4 py-12'>
      {[1, 2, 3, 4, 5].map((i) => (
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
    <article className='border-brand-1 flex rounded-3xl border bg-white shadow-lg'>
      <section className='desktop:px-40 flex-1 p-20 py-30'>
        <div className='bg-brand-1 mb-8 h-20 w-200 animate-pulse rounded' />
        <div className='bg-brand-1 h-16 w-150 animate-pulse rounded' />
      </section>
      <figure className='desktop:w-181 relative aspect-square w-136'>
        <div className='bg-brand-1 h-full w-full animate-pulse rounded-tr-3xl rounded-br-3xl' />
      </figure>
    </article>
  );
}

export function ReservationListSkeleton() {
  return (
    <div className='space-y-16'>
      {[1, 2, 3].map((i) => (
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
