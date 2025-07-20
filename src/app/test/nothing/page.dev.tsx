'use client';

import Nothing from '@/shared/components/ui/nothing';

export default function NothingTestPage() {
  return (
    <div className='flex h-screen w-full content-start items-center justify-center gap-100'>
      <div className='flex flex-col items-center gap-20'>
        <Nothing type='reservation' />
        <span className='font-size-16 text-gray-700'>type: reservation</span>
        <p className='font-size-13'>
          버튼 클릭시 /activities 페이지로 이동합니다.
        </p>
      </div>
      <div className='flex flex-col items-center gap-20'>
        <Nothing type='activity' />
        <span className='font-size-16 text-gray-700'>type: activity</span>
      </div>
      <div className='flex flex-col items-center gap-20'>
        <Nothing type='review' />
        <span className='font-size-16 text-gray-700'>type: review</span>
      </div>
    </div>
  );
}
