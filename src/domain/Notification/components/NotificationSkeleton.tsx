export default function NotificationSkeleton() {
  return (
    <div className='animate-pulse space-y-8 p-10'>
      {/* 승인 여부 및 체험 제목 */}
      <div className='flex justify-between'>
        <div className='flex gap-3'>
          {/* 승인 / 거절 */}
          <div className='bg-brand-1 h-20 w-35 rounded-xl' />
          {/* 체험 제목 */}
          <div className='bg-brand-1 h-20 w-130 rounded-xl' />
        </div>
        {/* x 버튼 */}
        <div className='bg-brand-1 h-15 w-15 rounded-md' />
      </div>

      {/* 일정 정보 */}
      <div className='flex items-center gap-3'>
        <div className='bg-brand-1 h-10 w-10 rounded-sm' />
        <div className='bg-brand-1 h-10 w-150 rounded-md' />
      </div>

      {/* 생성 시각 */}
      <div className='flex items-center gap-3'>
        <div className='bg-brand-1 h-10 w-10 rounded-sm' />
        <div className='bg-brand-1 mt-1 h-10 w-30 rounded-sm' />
      </div>
    </div>
  );
}
