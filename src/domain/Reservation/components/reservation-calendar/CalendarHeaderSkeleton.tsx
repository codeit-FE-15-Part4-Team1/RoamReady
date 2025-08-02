// components/ReservationCalendar/skeletons/CalendarHeaderSkeleton.tsx
import React from 'react';

export default function CalendarHeaderSkeleton() {
  return (
    <div className='flex animate-pulse items-center justify-center gap-[1.5rem] py-20 text-3xl'>
      {/* 이전 달 버튼 스켈레톤 */}
      <div className='h-8 w-12 rounded-full bg-neutral-200' />

      {/* 'YYYY년 MM월' 텍스트 스켈레톤 */}
      <div className='h-22 w-100 rounded-md bg-neutral-200' />

      {/* 다음 달 버튼 스켈레톤 */}
      <div className='h-8 w-12 rounded-full bg-neutral-200' />
    </div>
  );
}
