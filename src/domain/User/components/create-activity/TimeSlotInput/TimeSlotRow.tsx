'use client';

import { Minus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import Input from '@/shared/components/ui/input';
import Select from '@/shared/components/ui/select';

import { getEndTimeOptions, timeOptions } from '../../../utils/create-activity';

interface TimeSlotRowProps {
  index: number;
  scheduleId?: number; // 기존 스케쥴의 ID (있으면 기존, 없으면 새 항목)
  onRemove: () => void;
}

export default function TimeSlotRow({ index, onRemove }: TimeSlotRowProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const startTime = watch(`schedules.${index}.startTime`);
  const endTime = watch(`schedules.${index}.endTime`);
  const endTimeOptions = getEndTimeOptions(startTime);
  const scheduleErrors = Array.isArray(errors.schedules)
    ? errors.schedules[index]
    : undefined;
  const endTimeErrorMessage = scheduleErrors?.endTime?.message;

  return (
    <div className='relative py-10'>
      <div className='tablet:grid tablet:grid-cols-10 flex flex-col gap-10'>
        <div className='col-span-6'>
          <Input.Root
            name={`schedules.${index}.date`}
            id={`date-${index}`}
            type='date'
            className='col-span-6'
          >
            <Input.Field className='w-full' />
          </Input.Root>
        </div>

        <div className='col-span-4 flex items-center justify-between gap-10'>
          <Select.Root
            value={startTime}
            onValueChange={(value) => {
              setValue(`schedules.${index}.startTime`, value, {
                shouldValidate: true,
              });
              setValue(`schedules.${index}.endTime`, '', {
                shouldValidate: true,
              });
            }}
          >
            <Select.Trigger
              editable
              className='font-size-14 w-full min-w-[8.9rem] px-20 py-17.5'
              placeholder='00:00'
            >
              <Select.Value />
            </Select.Trigger>
            <Select.Content className='font-size-14 scrollbar-none'>
              {timeOptions.map((time) => (
                <Select.Item key={time} value={time} className='px-20 py-17.5'>
                  {time}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          <input
            type='hidden'
            name={`schedules.${index}.startTime`}
            value={startTime || ''}
          />

          <div className='font-size-16 flex items-center font-bold'>
            <Minus />
          </div>

          <Select.Root
            value={endTime}
            onValueChange={(value) => {
              setValue(`schedules.${index}.endTime`, value, {
                shouldValidate: true,
              });
            }}
          >
            <Select.Trigger
              editable
              className='font-size-14 w-full min-w-[8.9rem] px-20 py-17.5'
              placeholder='00:00'
            >
              <Select.Value />
            </Select.Trigger>
            <Select.Content className='font-size-14 scrollbar-none'>
              {endTimeOptions.map((time) => (
                <Select.Item key={time} value={time} className='px-20 py-17.5'>
                  {time}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          <input
            type='hidden'
            name={`schedules.${index}.endTime`}
            value={endTime || ''}
          />

          <div className='flex items-center justify-center'>
            <button
              type='button'
              className='cursor-pointer rounded-full bg-gray-500 p-15 text-white'
              onClick={onRemove}
            >
              <Minus className='size-20 font-semibold' />
            </button>
          </div>
        </div>
      </div>

      {endTimeErrorMessage && (
        <div className='mt-4 grid grid-cols-10 gap-10'>
          <p className='font-size-12 col-span-4 col-start-7 text-red-500'>
            {String(endTimeErrorMessage)}
          </p>
        </div>
      )}
    </div>
  );
}
