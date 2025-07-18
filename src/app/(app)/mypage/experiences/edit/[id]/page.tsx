'use client';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'; // 1. 플러그인 import
import { Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import Button from '@/shared/components/Button';
import Input from '@/shared/components/ui/input';
import Select from '@/shared/components/ui/select';
import { useImagePreview } from '@/shared/hooks/useImagePreview';

dayjs.extend(customParseFormat); // 2. dayjs에 플러그인 적용

interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  error?: string; // 에러 메시지 필드
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

export default function CreateExperiencePage() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: crypto.randomUUID(),
      date: '',
      startTime: '',
      endTime: '',
    },
  ]);
  const [price, setPrice] = useState<number | null>(null);
  const bannerPreview = useImagePreview();
  const introPreview = useImagePreview();

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
    <div className='mb-[3.4rem] w-[120rem]'>
      <h1 className='font-size-18 py-20 font-bold'>내 체험 등록</h1>

      <form className='flex flex-col gap-[2.4rem]'>
        <Input.Root id='title' type='text' className='my-10'>
          <Input.Label className='font-size-16 font-bold'>제목</Input.Label>
          <Input.Field placeholder='제목을 입력해 주세요' />
        </Input.Root>

        <h3 className='font-size-16 font-bold'>카테고리</h3>
        <Select.Root className='font-size-14'>
          <Select.Trigger className='font-size-14 px-20 py-17.5'>
            <Select.Value placeholder='카테고리를 선택해 주세요.' />
          </Select.Trigger>
          <Select.Content className='font-size-14'>
            <Select.Item value='1' className='px-20 py-17.5'>
              카테고리 1
            </Select.Item>
            <Select.Item value='2' className='px-20 py-17.5'>
              카테고리 2
            </Select.Item>
            <Select.Item value='3' className='px-20 py-17.5'>
              카테고리 3
            </Select.Item>
          </Select.Content>
        </Select.Root>

        <Input.Root id='description' type='textarea' className='my-10'>
          <Input.Label className='font-size-16 font-bold'>설명</Input.Label>
          <Input.Field
            placeholder='체험에 대한 설명을 입력해 주세요'
            rows={10}
          />
        </Input.Root>

        <Input.Root id='price' type='number' className='my-10'>
          <Input.Label className='font-size-16 font-bold'>가격</Input.Label>
          <Input.Field
            placeholder='체험 금액을 입력해 주세요'
            step='1000'
            min='0'
            onChange={(e) => {
              const value =
                e.target.value === '' ? null : Number(e.target.value);
              setPrice(value);
            }}
          />
        </Input.Root>

        {/* --- 서식이 적용된 금액 표시 --- */}
        {typeof price === 'number' && price > 0 && (
          <p className='mt-4 text-gray-600'>
            입력된 금액: {price.toLocaleString('ko-KR')}원
          </p>
        )}

        <Input.Root id='location' type='text' className='my-10'>
          <Input.Label className='font-size-16 font-bold'>주소</Input.Label>
          <Input.Field placeholder='주소를 입력해 주세요' />
        </Input.Root>

        <h3 className='font-size-16 mb-[1.8rem] font-bold'>
          예약 가능한 시간대
        </h3>

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
        <div>
          <Input.Root
            id='banner'
            type='file'
            fileName={bannerPreview.files.map((file) => file.name).join(',')}
            handleFileChange={bannerPreview.handleFileChange}
            className='my-10'
          >
            <Input.Label className='font-size-16 font-bold'>
              배너 이미지 등록
            </Input.Label>

            <Input.Trigger triggerType='file-upload'>
              <div className='flex flex-wrap items-center gap-20'>
                <label
                  htmlFor='banner'
                  className='cursor-pointer border border-gray-500 p-30'
                >
                  <Plus className='size-50' />
                </label>
                {bannerPreview.previewUrls.length > 0 &&
                  bannerPreview.previewUrls.map((url, index) => (
                    <div key={index} className='relative h-[20rem] w-[20rem]'>
                      <button
                        type='button'
                        className='absolute -top-5 -right-5 z-10 cursor-pointer rounded-full border bg-black p-5 text-white'
                      >
                        <X
                          className='size-20'
                          onClick={(e) => {
                            e.stopPropagation();
                            bannerPreview.removeImage(index);
                          }}
                        />
                      </button>
                      <Image
                        src={url}
                        alt='Image preview'
                        width={200}
                        height={200}
                        className='aspect-square rounded-3xl object-cover'
                      />
                    </div>
                  ))}
              </div>
            </Input.Trigger>
            <Input.Field accept='image/*' multiple />
          </Input.Root>
        </div>
        <div>
          <Input.Root
            id='intro'
            type='file'
            fileName={introPreview.files.map((file) => file.name).join(',')}
            handleFileChange={introPreview.handleFileChange}
            className='my-10'
          >
            <Input.Label className='font-size-16 font-bold'>
              소개 이미지 등록
            </Input.Label>

            <Input.Trigger triggerType='file-upload'>
              <div className='flex flex-wrap items-center gap-20'>
                <label
                  htmlFor='intro'
                  className='cursor-pointer border border-gray-500 p-30'
                >
                  <Plus className='size-50' />
                </label>
                {introPreview.previewUrls.length > 0 &&
                  introPreview.previewUrls.map((url, index) => (
                    <div key={index} className='relative h-[20rem] w-[20rem]'>
                      <button
                        type='button'
                        className='absolute -top-5 -right-5 z-10 cursor-pointer rounded-full border bg-black p-5 text-white'
                      >
                        <X
                          className='size-20'
                          onClick={(e) => {
                            e.stopPropagation();
                            introPreview.removeImage(index);
                          }}
                        />
                      </button>
                      <Image
                        src={url}
                        alt='Image preview'
                        width={200}
                        height={200}
                        className='aspect-square rounded-3xl object-cover'
                      />
                    </div>
                  ))}
              </div>
            </Input.Trigger>
            <Input.Field accept='image/*' multiple />
          </Input.Root>
        </div>
        <div className='flex w-full justify-center'>
          <Button
            variant='primary'
            size='medium'
            className='h-40'
            type='submit'
          >
            등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}
