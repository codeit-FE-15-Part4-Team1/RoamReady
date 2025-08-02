'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/shared/constants/routes';

interface MyPageContentHeader {
  title?: string;
  description?: string;
}

export default function MyPageContentHeader({
  title,
  description,
}: MyPageContentHeader) {
  return (
    <div>
      <div className='flex items-center gap-20'>
        <Link href={ROUTES.MYPAGE.ROOT} className='tablet:hidden'>
          <ChevronLeft className='tablet:size-30 size-24 cursor-pointer text-neutral-800' />
        </Link>
        <h1 className='font-size-20 tablet:font-size-24 font-bold text-neutral-800'>
          {title}
        </h1>
      </div>
      <p className='hideen tablet:block font-size-16 mb-30 text-neutral-700'>
        {description}
      </p>
    </div>
  );
}
