'use client';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import dayjs from 'dayjs';
import { Calendar } from 'lucide-react';
import { useState } from 'react';

import { DatePicker } from '@/shared/components/ui/date-picker';

const meta: Meta = {
  title: 'Components/DatePicker',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
DatePicker 컴포넌트는 날짜 선택 기능을 제공하며, 내부적으로 Context를 통해 현재 월/선택된 날짜 등의 공통 값을 관리합니다.

## Props

- \`selectedDate?: Date\`  
  현재 선택된 날짜입니다. 선택되지 않았다면 \`undefined\`입니다.

- \`onDateClick?: (date: Date) => void\`  
  날짜 클릭 시 호출되는 콜백 함수입니다.

- \`size?: 's' | 'l'\`  
  전체 캘린더의 크기를 설정합니다. 기본값은 'l'(Large)입니다.

- \`wrapperClassName?: string\`  
  최상위 래퍼에 적용할 CSS 클래스입니다. 주로 위치/크기 제어 용도로 사용됩니다.

## 하위 컴포넌트

- \`<DatePicker.Month />\`: 월과 연도 탐색
- \`<DatePicker.Week />\`: 요일 헤더
- \`<DatePicker.Date />\`: 날짜 선택

\`<DatePicker.Date />\`에 \`reservableDates\`(string[])를 전달하면, 해당 날짜만 선택 가능하게 제한할 수 있습니다.  \
예: \`reservableDates={['2025-08-01', '2025-08-05']}\`
        `.trim(),
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/** 예약 가능 날짜 예시 */
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

export const LargeWithReservableDates: Story = {
  name: 'Large / 예약 가능 날짜 포함',
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    return (
      <div className='flex flex-col items-center gap-4'>
        <DatePicker.Root
          selectedDate={selectedDate ?? undefined}
          onDateClick={setSelectedDate}
          size='l'
        >
          <DatePicker.Month />
          <DatePicker.Week />
          <DatePicker.Date />
        </DatePicker.Root>
        <div className='text-sm text-gray-600'>
          선택된 날짜:{' '}
          <span className='font-semibold'>
            {selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : '없음'}
          </span>
        </div>
      </div>
    );
  },
};

export const LargeAllDates: Story = {
  name: 'Large / 모든 날짜 선택 가능',
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    return (
      <div className='flex flex-col items-center gap-4'>
        <DatePicker.Root
          selectedDate={selectedDate ?? undefined}
          onDateClick={setSelectedDate}
          size='l'
        >
          <DatePicker.Month />
          <DatePicker.Week />
          <DatePicker.Date />
        </DatePicker.Root>
        <div className='text-sm text-gray-600'>
          선택된 날짜:{' '}
          <span className='font-semibold'>
            {selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : '없음'}
          </span>
        </div>
      </div>
    );
  },
};

export const SmallWithInput: Story = {
  name: 'Small / Input + 아이콘',
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [show, setShow] = useState(false);

    return (
      <div className='relative flex flex-col items-center gap-4'>
        <div className='flex items-center gap-2'>
          <input
            type='text'
            readOnly
            placeholder='YY/MM/DD'
            value={selectedDate ? dayjs(selectedDate).format('YY/MM/DD') : ''}
            className='font-size-13 h-30 w-100 rounded-md border px-2 py-1'
          />
          <button onClick={() => setShow((prev) => !prev)}>
            <Calendar size={20} className='text-gray-600 hover:text-gray-900' />
          </button>
        </div>

        {show && (
          <div className='absolute top-full z-50 mt-2 rounded-md border bg-white p-4 shadow'>
            <DatePicker.Root
              selectedDate={selectedDate ?? undefined}
              onDateClick={(date) => {
                setSelectedDate(date);
                setShow(false);
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
    );
  },
};
