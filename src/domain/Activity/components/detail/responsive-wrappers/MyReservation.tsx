'use client';

import { CircleAlert } from 'lucide-react';
import Link from 'next/link';

import Button from '@/shared/components/Button';

export default function MyReservation() {
  return (
    <div className='flex-col-center h-700 w-400 gap-30 rounded-4xl border-1 border-gray-50 bg-white px-24 py-32 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]'>
      <div className='font-size-18 flex-col-center mb-12 gap-15'>
        <CircleAlert className='text-brand-2 h-30 w-30' />
        <span className='font-bold'> 예약 불가</span>
        <p className='font-size-15 leading-35 text-gray-600'>
          이 체험은 회원님이 직접 등록한 체험입니다.
          <br />
          본인의 체험은 예약할 수 없어요.
        </p>
      </div>

      <div className='flex-col-center gap-20'>
        <Button
          className='hover:bg-brand-2 font-size-12 h-40 w-160 border-gray-50 hover:text-white'
          asChild
        >
          <Link href='/mypage/reservations-status'>
            내 체험 예약 현황 보러가기
          </Link>
        </Button>
      </div>
    </div>
  );
}
