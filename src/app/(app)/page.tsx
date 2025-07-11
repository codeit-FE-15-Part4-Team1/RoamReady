'use client';

import Link from 'next/link';
import { useState } from 'react';

import Button from '@/shared/components/Button';

export default function HomePage() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(selectedTime === time ? null : time);
  };

  const handleReservation = () => {
    if (selectedTime) {
      alert(`예약 완료: ${selectedTime}`);
    } else {
      alert('시간을 선택해주세요');
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='mx-auto max-w-6xl space-y-8'>
        <div className='text-center'>
          <h1 className='mb-2 text-4xl font-bold text-gray-900'>
            Button Component
          </h1>
          <p className='text-gray-600'>
            다양한 버튼 스타일과 속성들을 확인해보세요
          </p>
        </div>

        {/* Variants */}
        <div className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            Variants
          </h2>
          <div className='flex flex-wrap gap-4'>
            <Button variant='default'>Default</Button>
            <Button variant='outline'>Outline</Button>
            <Button variant='ghost'>Ghost</Button>
            <Button variant='primary'>Primary</Button>
          </div>
        </div>

        {/* Sizes */}
        <div className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>Sizes</h2>
          <div className='flex flex-wrap items-center gap-4'>
            <Button size='small'>Small</Button>
            <Button size='medium'>Medium</Button>
            <Button size='large'>Large</Button>
          </div>
        </div>

        {/* States */}
        <div className='grid gap-8 md:grid-cols-2'>
          {/* Selected State */}
          <div className='rounded-xl bg-white p-8 shadow-sm'>
            <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
              Selected State
            </h2>
            <div className='space-y-4'>
              <div className='flex gap-4'>
                <Button selected={false}>Not Selected</Button>
                <Button selected={true}>Selected</Button>
              </div>
            </div>
          </div>

          {/* Disabled State */}
          <div className='rounded-xl bg-white p-8 shadow-sm'>
            <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
              Disabled State
            </h2>
            <div className='space-y-3'>
              <div className='flex flex-wrap gap-3'>
                <Button disabled>Default</Button>
                <Button variant='outline' disabled>
                  Outline
                </Button>
              </div>
              <div className='flex flex-wrap gap-3'>
                <Button variant='ghost' disabled>
                  Ghost
                </Button>
                <Button variant='primary' disabled>
                  Primary
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Time Selection Example */}
        <div className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            실제 사용 예시
          </h2>
          <div className='max-w-md space-y-6'>
            <div>
              <div className='mb-3 text-sm font-medium text-gray-700'>
                예약 가능한 시간
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <Button
                  selected={selectedTime === '14:00-15:00'}
                  onClick={() => handleTimeSelect('14:00-15:00')}
                >
                  14:00-15:00
                </Button>
                <Button
                  selected={selectedTime === '15:00-16:00'}
                  onClick={() => handleTimeSelect('15:00-16:00')}
                >
                  15:00-16:00
                </Button>
              </div>
            </div>

            <div className='border-t pt-4'>
              <div className='mb-3 text-sm text-gray-600'>총 합계 ₩ 10,000</div>
              <Button
                variant='primary'
                onClick={handleReservation}
                disabled={!selectedTime}
                className='w-full'
              >
                예약하기
              </Button>
            </div>
          </div>
        </div>

        {/* AsChild & Combined */}
        <div className='grid gap-8 md:grid-cols-2'>
          {/* AsChild Example */}
          <div className='rounded-xl bg-white p-8 shadow-sm'>
            <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
              AsChild with Link
            </h2>
            <div className='space-y-3'>
              <Button asChild className='w-full'>
                <Link href='/activities'>활동 보러가기</Link>
              </Button>
              <Button asChild variant='primary' className='w-full'>
                <Link href='/mypage'>마이페이지</Link>
              </Button>
            </div>
          </div>

          {/* Combined Properties */}
          <div className='rounded-xl bg-white p-8 shadow-sm'>
            <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
              조합 예시
            </h2>
            <div className='space-y-3'>
              <Button variant='outline' size='small' selected>
                Outline Small Selected
              </Button>
              <Button variant='primary' size='large' disabled>
                Primary Large Disabled
              </Button>
              <Button
                variant='ghost'
                size='medium'
                onClick={() => alert('클릭됨!')}
              >
                Ghost Medium Clickable
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
