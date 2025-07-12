'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Bell from '../../icons/bell';

export default function Header() {
  const [isLogin] = useState(false);

  return (
    <header className='border-b border-gray-50'>
      <div className='tablet:px-32 desktop:px-40 desktop:text-40 text-14 mx-auto mt-20 mb-20 flex h-30 w-full max-w-1200 items-center justify-between px-24'>
        <div className='shrink-0'>
          <Link href='/activities'>
            <div className='tablet:w-130 tablet:h-100 relative h-70 w-100'>
              <Image src='/logos/logo-3-black.svg' fill alt='Logo' />
            </div>
          </Link>
        </div>
        <div>
          {isLogin ? (
            <div className='flex items-center justify-center gap-20'>
              <Bell />
              <div className='flex items-center justify-center gap-15'>
                {/* 세로 구분선 */}
                <div className='h-20 w-1 self-center bg-gray-100' />

                <div className='h-30 w-30 rounded-full bg-black' />
                <span className='text-14'>닉네임</span>
              </div>
            </div>
          ) : (
            <div className='text-14 flex cursor-pointer gap-20 font-medium'>
              <Link href='/login' className='hover:text-gray-200'>
                로그인
              </Link>
              <Link href='/signup' className='hover:text-gray-200'>
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
