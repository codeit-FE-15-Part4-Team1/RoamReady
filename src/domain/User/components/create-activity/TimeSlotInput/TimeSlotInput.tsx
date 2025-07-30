'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';

import TimeSlotHeader from './TimeSlotHeader';
import TimeSlotRow from './TimeSlotRow';

// 1. useTimeSlots 훅은 더 이상 사용하지 않습니다.

export default function TimeSlotInput() {
  // 2. useFormContext를 통해 부모(CreateExperienceForm)의 RHF 상태에 접근합니다.
  const { control } = useFormContext();

  // 3. useFieldArray 훅을 사용하여 'schedules' 필드를 관리합니다.
  //    name은 Zod 스키마에 정의한 배열 필드명과 일치해야 합니다.
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schedules',
  });

  // 4. '시간대 추가' 버튼 클릭 시 RHF 상태에 새로운 필드를 추가하는 함수
  const addTimeSlot = () => {
    // append 함수에 추가할 필드의 기본값을 전달합니다.
    append({ date: '', startTime: '', endTime: '' });
  };

  return (
    <div>
      <h3 className='font-size-16 mb-[1.8rem] font-bold'>예약 가능한 시간대</h3>

      <TimeSlotHeader onAdd={addTimeSlot} />
      <div className='border-b-2 border-gray-100 py-10' />

      {/* 5. RHF의 'fields' 배열을 매핑하여 각 시간대 행을 렌더링합니다. */}
      {fields.map((field, index) => (
        <TimeSlotRow
          // 6. RHF가 제공하는 안정적인 field.id를 key로 사용합니다. (Hydration 에러 방지)
          key={field.id}
          index={index}
          // 7. remove 함수는 특정 인덱스의 필드를 RHF 상태에서 제거합니다.
          onRemove={() => remove(index)}
          scheduleId={Number(field.id)} // 기존 스케줄의 경우 서버에서 받은 ID
        />
      ))}
    </div>
  );
}
