export default function ActivityDescriptionSkeleton() {
  return (
    <div className='flex w-full animate-pulse flex-col gap-8 border-b border-gray-100 pb-40'>
      <div className='bg-brand-1 h-25 w-80 rounded-xl' />
      <div className='flex flex-col gap-2'>
        <div className='bg-brand-1 h-20 w-full rounded-xl' />
        <div className='bg-brand-1 h-20 w-full rounded-xl' />
        <div className='bg-brand-1 h-20 w-full rounded-xl' />
        <div className='bg-brand-1 h-20 w-full rounded-xl' />
      </div>
    </div>
  );
}
