// src/hooks/useTimeSlots.ts
import dayjs from 'dayjs';
import { useState } from 'react';

import type { TimeSlot } from '../../types/create-activity';

const createNewTimeSlot = (): TimeSlot => ({
  id: crypto.randomUUID(),
  date: '',
  startTime: '',
  endTime: '',
});

export function useTimeSlots() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([createNewTimeSlot()]);

  const addTimeSlot = () => {
    setTimeSlots((prev) => [...prev, createNewTimeSlot()]);
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
        if (slot.id !== id) return slot;

        const updatedSlot = { ...slot, [field]: value };

        if (field === 'startTime') {
          updatedSlot.endTime = '';
        }

        // --- 여기부터 수정 ---

        const { date, startTime, endTime } = updatedSlot;

        // 날짜, 시작 시간, 종료 시간이 모두 있어야 유효성 검사 실행
        if (date && startTime && endTime) {
          // 날짜와 시간을 합쳐서 dayjs 객체 생성
          const start = dayjs(`${date} ${startTime}`);
          const end = dayjs(`${date} ${endTime}`);

          updatedSlot.error = end.isAfter(start)
            ? undefined
            : '종료 시간은 시작 시간보다 늦어야 합니다.';
        } else {
          updatedSlot.error = undefined;
        }
        return updatedSlot;
      }),
    );
  };

  return { timeSlots, addTimeSlot, removeTimeSlot, handleTimeSlotChange };
}
