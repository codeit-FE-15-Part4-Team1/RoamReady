// src/components/TimeSlotHeader.tsx
'use client';

import { Minus, Plus } from 'lucide-react';

import Input from '@/shared/components/ui/input';
import Select from '@/shared/components/ui/select';

interface TimeSlotHeaderProps {
  onAdd: () => void;
}

export default function TimeSlotHeader({ onAdd }: TimeSlotHeaderProps) {
  return (
    <div className='grid grid-cols-10 gap-10'>
      <Input.Root
        name='date-header'
        id='date-header'
        type='date'
        className='disabled col-span-6'
      >
        <Input.Label className='font-size-14'>날짜</Input.Label>
        <Input.Field disabled placeholder='날짜를 선택해 주세요' />
      </Input.Root>
      <div className='col-span-3 flex items-center justify-between gap-10'>
        <div className='flex w-full flex-col gap-10'>
          <h4 className='font-size-14'>시작 시간</h4>
          <Select.Root disabled>
            <Select.Trigger className='font-size-14 px-20 py-17.5'>
              <Select.Value placeholder='0:00' />
            </Select.Trigger>
          </Select.Root>
        </div>
        <div className='font-size-16 flex items-center pt-30 font-bold'>
          <Minus />
        </div>
        <div className='flex w-full flex-col gap-10'>
          <h4 className='font-size-14'>종료 시간</h4>
          <Select.Root disabled>
            <Select.Trigger className='font-size-14 px-20 py-17.5'>
              <Select.Value placeholder='0:00' />
            </Select.Trigger>
          </Select.Root>
        </div>
      </div>
      <div className='col-span-1 flex items-center justify-center pt-30'>
        <button
          type='button'
          className='bg-brand-2 cursor-pointer rounded-full p-15 text-white'
          onClick={onAdd}
        >
          <Plus className='size-20 font-semibold' />
        </button>
      </div>
    </div>
  );
}
