import KaKaoMapSkeleton from '@/domain/Activity/components/detail/skeleton/KaKaoMapSkeleton';

export default function KaKaoSkeleton() {
  return (
    <div className='flex w-full animate-pulse flex-col justify-center gap-8 border-b border-gray-100 pb-40'>
      <div className='bg-brand-1 h-25 w-80 rounded-xl' />
      <div className='flex flex-col gap-8'>
        <div className='bg-brand-1 h-18 w-200 rounded-xl' />
        <KaKaoMapSkeleton />
      </div>
    </div>
  );
}
