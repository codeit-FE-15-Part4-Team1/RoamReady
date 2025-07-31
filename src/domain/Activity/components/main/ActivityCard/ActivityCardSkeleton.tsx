'use client';

import { cn } from '@/shared/libs/cn';

export default function ActivityCardSkeleton() {
  return (
    <article
      className={cn(
        'border-brand-1 flex w-full max-w-360 animate-pulse flex-col rounded-3xl border bg-white p-6 shadow-lg',
      )}
    >
      <figure className='relative aspect-[5/6] overflow-hidden rounded-3xl bg-gray-200'>
        {/* 상단 배경 (이미지 영역) */}
        <div className='bg-brand-1 absolute inset-0' />

        {/* 카테고리 뱃지와 하트 아이콘 */}
        <div className='absolute inset-0 flex items-start justify-between p-12'>
          <div className='bg-brand-2/20 size-25 rounded-3xl px-25 backdrop-blur-xs select-none' />
          <div className='bg-brand-2/20 size-25 rounded-full' />
        </div>
      </figure>

      {/* 텍스트 영역 */}
      <section className='mt-6 space-y-4 p-8'>
        <div className='bg-brand-1 h-14 w-[70%] rounded-xl' />
        <div className='bg-brand-1 h-12 w-[90%] rounded-xl' />
      </section>
    </article>
  );
}
