'use client';

import dayjs from 'dayjs';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

import Input from '@/shared/components/ui/input';
import Select from '@/shared/components/ui/select';

interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  error?: string;
}

// 24시간 형식의 시간 옵션 생성 (00:00 ~ 23:30, 30분 간격)
const timeOptions = (() => {
  const options: string[] = [];
  // 23:30분까지 생성하기 위해 end를 24:00로 설정
  const end = dayjs().endOf('day');
  let current = dayjs().startOf('day');

  while (current.isBefore(end)) {
    options.push(current.format('HH:mm'));
    current = current.add(30, 'minute');
  }

  return options;
})();

const getEndTimeOptions = (startTime: string) => {
  if (!startTime) return timeOptions;

  const startTimeIndex = timeOptions.findIndex((time) => time === startTime);
  if (startTimeIndex === -1) return timeOptions;

  // 시작 시간 다음 옵션부터 반환
  return timeOptions.slice(startTimeIndex + 1);
};

export default function TimeSlotInput() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: crypto.randomUUID(),
      date: '',
      startTime: '',
      endTime: '',
    },
  ]);

  const addTimeSlot = () => {
    const newSlotId = crypto.randomUUID();
    setTimeSlots((prev) => [
      ...prev,
      {
        id: newSlotId,
        date: '',
        startTime: '',
        endTime: '',
      },
    ]);
  };

  const removeTimeSlot = (id: string) => {
    setTimeSlots((prev) => prev.filter((slot) => slot.id !== id));
  };

  const handleTimeSlotChange = (
    id: string,
    field: 'date' | 'startTime' | 'endTime',
    value: string,
  ) => {
    setTimeSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === id) {
          const updatedSlot = { ...slot, [field]: value };
          const { startTime, endTime } = updatedSlot;

          if (startTime && endTime) {
            const start = dayjs(startTime, 'HH:mm');
            const end = dayjs(endTime, 'HH:mm');

            if (!end.isAfter(start)) {
              updatedSlot.error = '종료 시간은 시작 시간보다 늦어야 합니다.';
            } else {
              updatedSlot.error = undefined;
            }
          } else {
            updatedSlot.error = undefined;
          }

          return updatedSlot;
        }
        return slot;
      }),
    );
  };
  return (
    <>
      <h3 className='font-size-16 mb-[1.8rem] font-bold'>예약 가능한 시간대</h3>

      {/* 시간대 입력 필드 헤더 (비활성화된 UI) */}
      <div className='grid grid-cols-10 gap-10'>
        <Input.Root id='date' type='date' className='disabled col-span-6'>
          <Input.Label className='font-size-14'>날짜</Input.Label>
          <Input.Field placeholder='날짜를 선택해 주세요' />
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
            onClick={addTimeSlot}
          >
            <Plus className='size-20 font-semibold' />
          </button>
        </div>
      </div>

      <div className='border-b border-gray-100' />

      {/* 실제 입력 가능한 시간대들 */}
      {timeSlots.map((slot) => (
        <div key={slot.id} className='relative'>
          <div className='grid grid-cols-10 gap-10'>
            <Input.Root
              id={`date-${slot.id}`}
              type='date'
              className='col-span-6'
            >
              <Input.Field
                value={slot.date}
                onChange={(e) =>
                  handleTimeSlotChange(slot.id, 'date', e.target.value)
                }
              />
            </Input.Root>

            <div className='col-span-3 flex items-center justify-between gap-10'>
              <Select.Root
                value={slot.startTime}
                onValueChange={(value) =>
                  handleTimeSlotChange(slot.id, 'startTime', value)
                }
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
                    <Select.Item
                      key={time}
                      value={time}
                      className='px-20 py-17.5'
                    >
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
                onValueChange={(value) =>
                  handleTimeSlotChange(slot.id, 'endTime', value)
                }
              >
                <Select.Trigger
                  editable
                  className='font-size-14 px-20 py-17.5'
                  placeholder='0:00'
                >
                  <Select.Value />
                </Select.Trigger>
                <Select.Content className='font-size-14'>
                  {getEndTimeOptions(slot.startTime).map((time) => (
                    <Select.Item
                      key={time}
                      value={time}
                      className='px-20 py-17.5'
                    >
                      {time}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>

            <div className='col-span-1 flex items-center justify-center'>
              <button
                type='button'
                className='cursor-pointer rounded-full bg-gray-400 p-15 text-white'
                onClick={() => removeTimeSlot(slot.id)}
              >
                <Minus className='size-20 font-semibold' />
              </button>
            </div>
          </div>

          {/* 에러 메시지 표시 */}
          {slot.error && (
            <div className='mt-4 grid grid-cols-10 gap-10'>
              <p className='font-size-12 col-span-3 col-start-7 text-red-500'>
                {slot.error}
              </p>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
