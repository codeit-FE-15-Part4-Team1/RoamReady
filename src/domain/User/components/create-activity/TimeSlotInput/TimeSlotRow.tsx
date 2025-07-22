'use client';

import { Minus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import Input from '@/shared/components/ui/input';
import Select from '@/shared/components/ui/select';

import { getEndTimeOptions, timeOptions } from '../../../utils/create-activity';

// 1. TimeSlotRowProps 인터페이스를 새롭게 정의합니다.
// 부모로부터 'index'와 'onRemove' 함수만 받습니다.
interface TimeSlotRowProps {
  index: number;
  onRemove: () => void;
}

export default function TimeSlotRow({ index, onRemove }: TimeSlotRowProps) {
  // 2. useFormContext를 통해 RHF의 핵심 기능들을 가져옵니다.
  const {
    register, // 입력 필드를 RHF에 등록하는 함수
    watch, // 특정 필드의 값을 실시간으로 감시하는 함수
    setValue, // 특정 필드의 값을 프로그래매틱하게 변경하는 함수
    formState: { errors }, // 폼 전체의 에러 상태 객체
  } = useFormContext();

  // 3. watch 함수로 현재 행의 'startTime' 값을 실시간으로 감시합니다.
  // 이 값이 변경되면 endTimeOptions가 다시 계산되어 UI가 업데이트됩니다.
  const startTime = watch(`schedules.${index}.startTime`);
  const endTime = watch(`schedules.${index}.endTime`);
  const endTimeOptions = getEndTimeOptions(startTime);

  // 4. [오류 해결] Array.isArray로 타입 가드를 적용하여 TypeScript 에러를 해결합니다.
  //    - errors.schedules가 배열인 경우에만 현재 인덱스의 에러 객체를 가져옵니다.
  const scheduleErrors = Array.isArray(errors.schedules)
    ? errors.schedules[index]
    : undefined;
  //    - 해당 에러 객체에서 endTime 필드의 메시지를 안전하게 추출합니다.
  const endTimeErrorMessage = scheduleErrors?.endTime?.message;

  return (
    <div className='relative border-b border-gray-100 py-10'>
      <div className='grid grid-cols-10 gap-10'>
        {/* 날짜 입력 */}
        <div className='col-span-6'>
          {/* 5. RHF의 register 함수를 Input.Field에 직접 연결합니다. */}
          {/* name을 "배열이름[인덱스].필드이름" 형식으로 지정합니다. */}
          <Input.Root
            name={`schedules.${index}.date`}
            id={`date-${index}`}
            type='date'
            className='col-span-6'
          >
            <Input.Field className='w-full' />
          </Input.Root>
        </div>

        <div className='col-span-3 flex items-center justify-between gap-10'>
          {/* 2. [수정] Select.Root에 RHF의 현재 값(startTime)을 value prop으로 전달합니다. */}
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
              className='font-size-14 w-full px-20 py-17.5'
              placeholder='00:00'
            >
              {/* 3. [수정] Select.Value에서 register를 제거합니다. */}
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

          {/* 4. [수정] 종료 시간 Select에도 동일하게 적용합니다. */}
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
              className='font-size-14 w-full px-20 py-17.5'
              placeholder='00:00'
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
            // 부모(TimeSlotInput)로부터 받은 remove(index) 함수를 실행합니다.
            onClick={() => {
              (console.log(`빼기 버튼 클릭됨, index: ${index}`), onRemove());
            }}
          >
            <Minus className='size-20 font-semibold' />
          </button>
        </div>
      </div>

      {/* 7. Zod 스키마와 연동된 에러 메시지를 표시합니다. */}
      {/* 추출한 에러 메시지가 있을 경우에만 p 태그를 렌더링합니다. */}
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
