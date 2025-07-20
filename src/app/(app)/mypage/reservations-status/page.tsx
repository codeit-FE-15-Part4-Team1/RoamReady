'use client';

import { useState } from 'react';

import ReservationCalendar from '@/domain/Reservation/components/reservation-calendar/ReservationCalendar';
import Select from '@/shared/components/ui/select';

export default function MyReservationStatusPage() {
  const [selected, setSelected] = useState('');

  return (
    <div className='flex w-full flex-col gap-16'>
      <div className='flex-start flex flex-col'>
        <h3>예약 현황</h3>
        <span>내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.</span>
      </div>

      <div className='w-full'>
        <Select.Root value={selected} onValueChange={setSelected}>
          <Select.Trigger>
            <Select.Value placeholder='함께 배우면 즐거운 스트릿 댄스' />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value='여행은 먹으러 다니는 거지 스트릿 푸드'>
              여행은 먹으러 다니는 거지 스트릿 푸드
            </Select.Item>
            <Select.Item value='함께 배우면 즐거운 스트릿 댄스'>
              함께 배우면 즐거운 스트릿 댄스
            </Select.Item>
            <Select.Item value='밤에는 야경이 짱이야'>
              밤에는 야경이 짱이야
            </Select.Item>
          </Select.Content>
        </Select.Root>
      </div>

      <div className='w-full'>
        <ReservationCalendar />
      </div>
    </div>
  );
}
