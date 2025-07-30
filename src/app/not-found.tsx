'use client';

import Link from 'next/link';

import Button from '@/shared/components/Button';

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 text-center'>
      <h1 className='text-brand-2 font-size-100 tablet:font-size-150 leading-none font-extrabold'>
        404
      </h1>

      <h2 className='font-size-40 tablet:font-size-50 font-semibold text-gray-800'>
        요청하신 페이지가 존재하지 않습니다.
      </h2>

      <p className='font-size-20 tablet:font-size-25 text-gray-500'>
        주소가 잘못 입력되었거나, 삭제된 페이지일 수 있어요.
      </p>

      <Button asChild variant='primary' className='font-size-25 mt-10 p-20'>
        <Link href='/'>홈으로 돌아가기</Link>
      </Button>
    </div>
  );
}
