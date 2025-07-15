'use client';

import dayjs from 'dayjs';
import React, { useState } from 'react';

import { Calendar } from '@/shared/components/ui/DatePicker/Calendar';

export default function DatePickerTestPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    console.log('선택한 날짜:', dayjs(date).format('YYYY-MM-DD'));
  };

  return (
    <div className='mx-auto max-w-sm p-4'>
      <div className='h-368 w-360'>
        <Calendar
          selectedDate={selectedDate ?? undefined}
          onDateClick={handleDateClick}
        />
      </div>

      <div className='mt-4 text-center text-sm'>
        선택된 날짜:{' '}
        {selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : '없음'}
      </div>
    </div>
  );
}
