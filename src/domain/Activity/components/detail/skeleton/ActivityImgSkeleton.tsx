export default function ActivityImgSkeleton() {
  return (
    <div className='tablet:h-410 grid h-220 w-full animate-pulse grid-cols-2 grid-rows-2 gap-4'>
      <div className='bg-brand-1 h-full w-full rounded-xl' />
      <div className='bg-brand-1 h-full w-full rounded-xl' />
      <div className='bg-brand-1 h-full w-full rounded-xl' />
      <div className='bg-brand-1 h-full w-full rounded-xl' />
    </div>
  );
}
