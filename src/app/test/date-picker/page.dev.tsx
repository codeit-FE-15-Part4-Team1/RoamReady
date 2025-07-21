'use client';

import dayjs from 'dayjs';
import { Calendar } from 'lucide-react';
import React, { useState } from 'react';

import { DatePicker } from '@/shared/components/ui/date-picker';

export default function DatePickerTestPage() {
  // 각각의 DatePicker별 상태를 따로 관리
  const [selectedDateL1, setSelectedDateL1] = useState<Date | null>(null);
  const [selectedDateL2, setSelectedDateL2] = useState<Date | null>(null);
  const [selectedDateS, setSelectedDateS] = useState<Date | null>(null);
  const [showSmallCalendar, setShowSmallCalendar] = useState(false);

  const reservableDates = [
    '2025-07-05',
    '2025-07-20',
    '2025-07-25',
    '2025-07-30',
    '2025-07-31',
    '2025-08-01',
    '2025-08-02',
    '2025-08-03',
    '2025-08-13',
    '2025-08-15',
  ];

  return (
    <main className='flex min-h-screen items-center justify-center bg-white px-4 py-10'>
      <div className='flex w-full max-w-screen-md flex-col items-center space-y-14'>
        <button
          onClick={() => setSelectedDateL1(new Date('2025-08-01'))}
          className='border-brand-2 text-brand-2 hover:bg-brand-2 mt-4 rounded-md border px-4 py-1 hover:text-white'
        >
          📅 외부에서 8월 1일 선택하기
        </button>

        {/* ✅ Large DatePicker (예약 가능 날짜 있음) */}
        <section className='flex flex-col items-center'>
          <h2 className='font-size-16 mb-10 font-bold text-gray-800'>
            ✅ Large DatePicker - 예약 가능 날짜 있음
          </h2>
          <p className='font-size-13 mb-6 w-300 text-center break-words text-gray-600'>
            예약 가능 날짜: {reservableDates.join(', ')}
          </p>
          <DatePicker.Root
            selectedDate={selectedDateL1 ?? undefined}
            onDateClick={(date) => setSelectedDateL1(date)}
            size='l'
          >
            <DatePicker.Month />
            <DatePicker.Week />
            <DatePicker.Date reservableDates={reservableDates} />
          </DatePicker.Root>
          <div className='font-size-13 mt-2 text-gray-600'>
            선택된 날짜:{' '}
            <span className='font-semibold'>
              {selectedDateL1
                ? dayjs(selectedDateL1).format('YYYY-MM-DD')
                : '없음'}
            </span>
          </div>
        </section>

        {/* ✅ Large DatePicker (예약 날짜 없음) */}
        <section className='flex flex-col items-center'>
          <h2 className='font-size-16 mb-10 font-bold text-gray-800'>
            ✅ Large DatePicker - 모든 미래 날짜 선택 가능
          </h2>
          <DatePicker.Root
            selectedDate={selectedDateL2 ?? undefined}
            onDateClick={(date) => setSelectedDateL2(date)}
            size='l'
          >
            <DatePicker.Month />
            <DatePicker.Week />
            <DatePicker.Date />
          </DatePicker.Root>
          <div className='font-size-13 mt-2 text-gray-600'>
            선택된 날짜:{' '}
            <span className='font-semibold'>
              {selectedDateL2
                ? dayjs(selectedDateL2).format('YYYY-MM-DD')
                : '없음'}
            </span>
          </div>
        </section>

        {/* ✅ s 사이즈 캘린더 */}
        <section className='mb-200 flex flex-col items-center'>
          <h2 className='font-size-16 mb-2 font-bold text-gray-800'>
            📌 S사이즈 DatePicker - Input + Calendar Icon
          </h2>
          <div className='relative w-fit'>
            <div className='flex items-center gap-2'>
              <input
                type='text'
                readOnly
                value={
                  selectedDateS ? dayjs(selectedDateS).format('YY/MM/DD') : ''
                }
                placeholder='YY/MM/DD'
                className='font-size-13 h-30 w-100 rounded-md border px-2 py-1'
              />
              <button
                onClick={() => setShowSmallCalendar((prev) => !prev)}
                className='text-gray-600 hover:text-gray-900'
              >
                <Calendar className='cursor-pointer' size={20} />
              </button>
            </div>

            {showSmallCalendar && (
              <div className='absolute top-full left-0 z-50 mt-2 rounded-md border border-gray-300 bg-white p-4 shadow-md'>
                <DatePicker.Root
                  selectedDate={selectedDateS ?? undefined}
                  onDateClick={(date) => {
                    setSelectedDateS(date);
                    setShowSmallCalendar(false);
                  }}
                  size='s'
                >
                  <DatePicker.Month />
                  <DatePicker.Week />
                  <DatePicker.Date />
                </DatePicker.Root>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
