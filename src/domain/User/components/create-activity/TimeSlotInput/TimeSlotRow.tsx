// src/components/TimeSlotRow.tsx
'use client';

import { Minus } from 'lucide-react';

import Input from '@/shared/components/ui/input';
import Select from '@/shared/components/ui/select';

import type { TimeSlot } from '../../../types/create-activity';
import { getEndTimeOptions, timeOptions } from '../../../utils/create-activity';

interface TimeSlotRowProps {
  index?: number;
  slot: TimeSlot;
  onRemove: (id: string) => void;
  onChange: (
    id: string,
    field: 'date' | 'startTime' | 'endTime',
    value: string,
  ) => void;
}

export default function TimeSlotRow({
  index,
  slot,
  onRemove,
  onChange,
}: TimeSlotRowProps) {
  const endTimeOptions = getEndTimeOptions(slot.startTime);
  const baseName = `slots.${index}`;

  return (
    <div className='relative py-10'>
      <div className='grid grid-cols-10 gap-10'>
        {/* 날짜 입력 */}
        <Input.Root
          name={`${baseName}.date`}
          id={`date-${slot.id}`}
          type='date'
          className='col-span-6'
        >
          <Input.Field />
        </Input.Root>

        {/* 시간 입력 */}
        <div className='col-span-3 flex items-center justify-between gap-10'>
          <Select.Root
            value={slot.startTime}
            onValueChange={(value) => onChange(slot.id, 'startTime', value)}
          >
            <Select.Trigger
              editable
              className='font-size-14 px-20 py-17.5'
              placeholder='0:00'
            >
              <Select.Value />
            </Select.Trigger>
            <Select.Content className='font-size-14'>
              {timeOptions.map((time) => (
                <Select.Item key={time} value={time} className='px-20 py-17.5'>
                  {time}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          <div className='font-size-16 flex items-center font-bold'>
            <Minus />
          </div>

          <Select.Root
            value={slot.endTime}
            onValueChange={(value) => onChange(slot.id, 'endTime', value)}
          >
            <Select.Trigger
              editable
              className='font-size-14 px-20 py-17.5'
              placeholder='0:00'
            >
              <Select.Value />
            </Select.Trigger>
            <Select.Content className='font-size-14'>
              {endTimeOptions.map((time) => (
                <Select.Item key={time} value={time} className='px-20 py-17.5'>
                  {time}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>

        {/* 삭제 버튼 */}
        <div className='col-span-1 flex items-center justify-center'>
          <button
            type='button'
            className='cursor-pointer rounded-full bg-gray-400 p-15 text-white'
            onClick={() => onRemove(slot.id)}
          >
            <Minus className='size-20 font-semibold' />
          </button>
        </div>
      </div>

      {/* 에러 메시지 */}
      {slot.error && (
        <div className='mt-4 grid grid-cols-10 gap-10'>
          <p className='font-size-12 col-span-4 col-start-7 text-red-500'>
            {slot.error}
          </p>
        </div>
      )}
    </div>
  );
}
