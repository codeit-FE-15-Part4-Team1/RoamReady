'use client';

import { useTimeSlots } from '../../../hooks/create-activity/useTimeSlot';
import TimeSlotHeader from './TimeSlotHeader';
import TimeSlotRow from './TimeSlotRow';

export default function TimeSlotInput() {
  const { timeSlots, addTimeSlot, removeTimeSlot, handleTimeSlotChange } =
    useTimeSlots();

  return (
    <>
      <h3 className='font-size-16 mb-[1.8rem] font-bold'>예약 가능한 시간대</h3>

      {/* 시간대 입력 필드 헤더 (비활성화된 UI) */}
      <TimeSlotHeader onAdd={addTimeSlot} />
      <div className='border-b border-gray-100' />

      {/* 실제 입력 가능한 시간대들 */}
      {timeSlots.map((slot) => (
        <TimeSlotRow
          key={slot.id}
          slot={slot}
          onRemove={removeTimeSlot}
          onChange={handleTimeSlotChange}
        />
      ))}
    </>
  );
}
