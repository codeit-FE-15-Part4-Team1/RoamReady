// components/ReservationCalendar/skeletons/DayCellSkeleton.tsx
import React from 'react';

interface DayCellSkeletonProps {
  // 이전/다음 달의 날짜처럼 흐리게 표시할지 여부
  isOutOfMonth?: boolean;
}

export default function DayCellSkeleton({}: DayCellSkeletonProps) {
  const baseCellClasses =
    'relative border border-neutral-200 bg-neutral-100 h-full flex aspect-square flex-col items-center justify-start p-1 md:p-2 animate-pulse';

  return (
    <div className={`${baseCellClasses}`}>
      <div className='mt-2 flex w-full flex-col items-center space-y-1 overflow-hidden'>
        {/* --- 모바일 뷰 스켈레톤 (md 사이즈 미만) --- */}
        <div className='h-full w-[90%] md:hidden'>
          <div className='h-4 w-full rounded-xl bg-neutral-200' />
        </div>

        {/* --- 데스크톱 뷰 스켈레톤 (md 사이즈 이상) --- */}
        <div className='hidden w-full flex-col items-center space-y-1 md:flex'></div>
      </div>
    </div>
  );
}
