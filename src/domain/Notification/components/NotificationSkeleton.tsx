export default function NotificationSkeleton() {
  return (
    <div className='space-y-8 p-10'>
      {/* 승인 여부 및 체험 제목 */}
      <div className='flex justify-between'>
        <div className='flex gap-3'>
          {/* 승인 / 거절 */}
          <div className='h-20 w-35 animate-pulse rounded-xl bg-gray-100' />
          {/* 체험 제목 */}
          <div className='h-20 w-130 animate-pulse rounded-xl bg-gray-100' />
        </div>
        {/* x 버튼 */}
        <div className='h-15 w-15 animate-pulse rounded-md bg-gray-100' />
      </div>

      {/* 일정 정보 */}
      <div className='flex items-center gap-3'>
        <div className='h-10 w-10 animate-pulse rounded-sm bg-gray-100' />
        <div className='h-10 w-150 animate-pulse rounded-md bg-gray-100' />
      </div>

      {/* 생성 시각 */}
      <div className='flex items-center gap-3'>
        <div className='h-10 w-10 animate-pulse rounded-sm bg-gray-100' />
        <div className='mt-1 h-10 w-30 animate-pulse rounded-sm bg-gray-100' />
      </div>
    </div>
  );
}
