'use client';
import { useState } from 'react';

import Select from '@/shared/components/ui/select';

export default function ReservationSelect() {
  const [selected, setSelected] = useState('');
  return (
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
  );
}
