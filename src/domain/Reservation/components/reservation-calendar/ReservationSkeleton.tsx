// components/ReservationCalendar/skeletons/ReservationCalendarSkeleton.tsx
import React from 'react';

import CalendarHeaderSkeleton from './CalendarHeaderSkeleton'; // 수정된 헤더 import
import DayCellSkeleton from './DayCellSkeleton';

const WEEKDAY_SKELETONS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function ReservationCalendarSkeleton() {
  return (
    <div className='flex flex-col gap-10'>
      <div
        className='w-full overflow-hidden rounded-2xl border border-gray-200 bg-white font-bold'
        role='status'
        aria-live='polite'
      >
        {/* 캘린더 헤더 스켈레톤 컴포넌트로 교체 */}
        <CalendarHeaderSkeleton />

        {/* 요일 헤더 스켈레톤 */}
        <div className='grid grid-cols-7 gap-1 border-b border-gray-100 py-10'>
          {WEEKDAY_SKELETONS.map((_, index) => (
            <div key={index} className='flex justify-center'>
              <div className='bg-brand-1 h-10 w-15 rounded-md' />
            </div>
          ))}
        </div>

        {/* 날짜 그리드 스켈레톤 */}
        <div className='grid auto-rows-fr grid-cols-7' role='grid'>
          {Array.from({ length: 35 }).map((_, index) => (
            <DayCellSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
