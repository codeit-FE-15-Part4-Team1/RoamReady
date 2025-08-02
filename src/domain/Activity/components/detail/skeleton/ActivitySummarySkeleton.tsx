export default function ActivitySummarySkeleton() {
  return (
    <div className='flex w-full animate-pulse flex-col items-start gap-8'>
      {/* 상단: 카테고리, 제목, 드롭다운 */}
      <div className='flex w-full items-start'>
        <div className='flex flex-col gap-8'>
          {/* 체험 카테고리 */}
          <div className='bg-brand-1 h-13 w-20 rounded-md' />
          {/* 체험 제목 */}
          <div className='bg-brand-1 h-20 w-50 rounded-xl' />
        </div>
      </div>

      {/* 평점 영역 */}
      <div className='flex items-center gap-6'>
        <div className='bg-brand-1 h-16 w-16 rounded-full' />
        <div className='bg-brand-1 h-16 w-50 rounded-xl' />
      </div>

      {/* 주소 영역 */}
      <div className='flex items-center gap-6'>
        <div className='bg-brand-1 h-10 w-10 rounded-full' />
        <div className='bg-brand-1 h-15 w-80 rounded-xl' />
      </div>
    </div>
  );
}
