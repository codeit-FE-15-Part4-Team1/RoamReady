'use client';

import { useState } from 'react';

import Button from '@/shared/components/Button';

import Participation from './Participation';

export default function Reservation() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [participantCount, setParticipantCount] = useState(1);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(selectedTime === time ? null : time);
  };

  const handleIncrease = () => {
    setParticipantCount((prev) => Math.min(prev + 1, 10)); // 최대 10명
  };

  const handleDecrease = () => {
    setParticipantCount((prev) => Math.max(prev - 1, 1)); // 최소 1명
  };

  const totalPrice = participantCount * 1000;

  return (
    <aside
      aria-label='예약 정보'
      className='h-850 w-400 rounded-4xl border-1 border-gray-50 bg-white p-30 shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
    >
      <form className='flex flex-col gap-24'>
        <section aria-labelledby='pricing'>
          <div className='flex items-center gap-8'>
            <h2 id='pricing' className='font-size-24 font-bold'>
              ₩ 1,000
            </h2>
            <span className='font-size-20 font-medium text-gray-500'>/ 인</span>
          </div>
        </section>

        <section aria-labelledby='date-select' className='flex flex-col gap-8'>
          <h3 id='date-select' className='font-size-16 font-bold'>
            날짜
          </h3>
          {/* DatePicker 컴포넌트 */}
          <div className='h-350 w-full bg-gray-50' />
        </section>

        <section
          aria-labelledby='participation'
          className='flex items-center justify-between'
        >
          <h3 id='participation' className='font-size-16 font-bold'>
            참여 인원 수
          </h3>
          <Participation
            count={participantCount}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        </section>

        <section
          aria-labelledby='available-times'
          className='flex flex-col gap-14'
        >
          <h3 id='available-times' className='font-size-16 font-bold'>
            예약 가능한 시간
          </h3>
          {/* 예약 가능 시간 버튼 목록 */}
          <div className='flex flex-col gap-10'>
            <Button
              type='button'
              variant='outline'
              selected={selectedTime === '14:00-15:00'}
              onClick={() => handleTimeSelect('14:00-15:00')}
              className='font-size-16 h-50 w-full border-2 font-medium text-gray-950'
            >
              14:00-15:00
            </Button>
            <Button
              type='button'
              variant='outline'
              selected={selectedTime === '15:00-16:00'}
              onClick={() => handleTimeSelect('15:00-16:00')}
              className='font-size-16 h-50 w-full border-2 font-medium text-gray-950'
            >
              15:00-16:00
            </Button>
          </div>
        </section>

        <div className='flex items-center justify-between border-t-1 border-gray-100 pt-24'>
          <section aria-labelledby='total-price'>
            <div className='flex items-center gap-8'>
              <h3
                className='font-size-20 font-medium text-gray-400'
                id='total-price'
              >
                총 합계
              </h3>
              <span className='font-size-20 text-950 font-bold'>
                ₩{totalPrice.toLocaleString()}
              </span>
            </div>
          </section>

          <Button
            variant='primary'
            className='font-size-16 h-50 w-135'
            type='submit'
          >
            예약하기
          </Button>
        </div>
      </form>
    </aside>
  );
}
