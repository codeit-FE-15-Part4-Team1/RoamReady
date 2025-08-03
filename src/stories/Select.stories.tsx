import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import Select from '@/shared/components/ui/select';

const meta: Meta<typeof Select.Root> = {
  title: 'Components/Select',
  component: Select.Root,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select.Root>;

// 1. 기본 Select (Controlled)
export const Basic: Story = {
  render: () => {
    const [basicValue, setBasicValue] = useState('');
    return (
      <div style={{ maxWidth: 320 }}>
        <Select.Root value={basicValue} onValueChange={setBasicValue}>
          <Select.Trigger className='w-full'>
            <Select.Value placeholder='옵션을 선택하세요' />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value='option1'>옵션 1</Select.Item>
            <Select.Item value='option2'>옵션 2</Select.Item>
            <Select.Item value='option3'>옵션 3</Select.Item>
          </Select.Content>
        </Select.Root>
        <p>선택된 값: {basicValue || '없음'}</p>
      </div>
    );
  },
};

// 2. 카테고리 Select (Controlled)
export const Category: Story = {
  render: () => {
    const [categoryValue, setCategoryValue] = useState('');
    return (
      <div style={{ maxWidth: 320 }}>
        <Select.Root value={categoryValue} onValueChange={setCategoryValue}>
          <Select.Trigger className='w-full'>
            <Select.Value placeholder='카테고리를 선택하세요' />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value='여행'>🧳 여행</Select.Item>
            <Select.Item value='음식'>🍽️ 음식</Select.Item>
            <Select.Item value='문화'>🎭 문화</Select.Item>
            <Select.Item value='스포츠'>⚽ 스포츠</Select.Item>
            <Select.Item value='엔터테인먼트'>🎬 엔터테인먼트</Select.Item>
            <Select.Item value='education'>📚 교육</Select.Item>
          </Select.Content>
        </Select.Root>
        <p>선택된 값: {categoryValue || '없음'}</p>
      </div>
    );
  },
};

// 3. 비활성화된 Select
export const Disabled: Story = {
  render: () => {
    const [disabledValue, setDisabledValue] = useState('option1');
    return (
      <div style={{ maxWidth: 320 }}>
        <Select.Root
          value={disabledValue}
          onValueChange={setDisabledValue}
          disabled
        >
          <Select.Trigger className='w-full'>
            <Select.Value placeholder='비활성화됨' />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value='option1'>옵션 1</Select.Item>
            <Select.Item value='option2'>옵션 2</Select.Item>
            <Select.Item value='option3'>옵션 3</Select.Item>
          </Select.Content>
        </Select.Root>
        <p>값: {disabledValue}</p>
      </div>
    );
  },
};

// 5. 커스텀 스타일링 테스트
export const CustomStyling: Story = {
  render: () => {
    const [customValue, setCustomValue] = useState('');
    return (
      <div style={{ maxWidth: 320 }}>
        <Select.Root value={customValue} onValueChange={setCustomValue}>
          <Select.Trigger className='w-full border-blue-200 bg-blue-50 hover:border-blue-300'>
            <Select.Value placeholder='커스텀 스타일 적용' />
          </Select.Trigger>
          <Select.Content className='bg-blue-50'>
            <Select.Item value='커스텀 옵션 1' className='hover:bg-blue-100'>
              커스텀 옵션 1
            </Select.Item>
            <Select.Item value='커스텀 옵션 2' className='hover:bg-blue-100'>
              커스텀 옵션 2
            </Select.Item>
            <Select.Item value='커스텀 옵션 3' className='hover:bg-blue-100'>
              커스텀 옵션 3
            </Select.Item>
          </Select.Content>
        </Select.Root>
        <p>선택된 값: {customValue || '없음'}</p>
      </div>
    );
  },
};

// 6. Editable Select (직접 입력 + 선택)
export const EditableSelect: Story = {
  render: () => {
    const [timeValue, setTimeValue] = useState('');
    const [dateValue, setDateValue] = useState('');
    const [numberValue, setNumberValue] = useState('');
    const [disabledEditableValue, setDisabledEditableValue] = useState('12:00');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ maxWidth: 320 }}>
          <label>시간 선택 (선택된 값: {timeValue || '없음'})</label>
          <Select.Root value={timeValue} onValueChange={setTimeValue}>
            <Select.Trigger editable type='time' placeholder='12:00' />
            <Select.Content>
              <Select.Item value='0:00'>0:00</Select.Item>
              <Select.Item value='0:30'>0:30</Select.Item>
              <Select.Item value='1:00'>1:00</Select.Item>
              <Select.Item value='1:30'>1:30</Select.Item>
              <Select.Item value='2:00'>2:00</Select.Item>
              <Select.Item value='12:00'>12:00</Select.Item>
              <Select.Item value='12:30'>12:30</Select.Item>
              <Select.Item value='13:00'>13:00</Select.Item>
              <Select.Item value='18:00'>18:00</Select.Item>
              <Select.Item value='20:00'>20:00</Select.Item>
              <Select.Item value='23:30'>23:30</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <div style={{ maxWidth: 320 }}>
          <label>날짜 입력 (입력된 값: {dateValue || '없음'})</label>
          <Select.Root value={dateValue} onValueChange={setDateValue}>
            <Select.Trigger editable type='date' placeholder='2024-01-01' />
            <Select.Content>
              <Select.Item value='2024-01-01'>2024-01-01</Select.Item>
              <Select.Item value='2024-01-15'>2024-01-15</Select.Item>
              <Select.Item value='2024-02-01'>2024-02-01</Select.Item>
              <Select.Item value='2024-03-15'>2024-03-15</Select.Item>
              <Select.Item value='2024-12-25'>2024-12-25</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <div style={{ maxWidth: 320 }}>
          <label>가격 입력 (입력된 값: {numberValue || '없음'})</label>
          <Select.Root value={numberValue} onValueChange={setNumberValue}>
            <Select.Trigger editable type='number' placeholder='10000' />
            <Select.Content>
              <Select.Item value='5000'>5,000원</Select.Item>
              <Select.Item value='10000'>10,000원</Select.Item>
              <Select.Item value='20000'>20,000원</Select.Item>
              <Select.Item value='50000'>50,000원</Select.Item>
              <Select.Item value='100000'>100,000원</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <div style={{ maxWidth: 320 }}>
          <label>
            비활성화된 Editable Select (고정 값: {disabledEditableValue})
          </label>
          <Select.Root
            value={disabledEditableValue}
            onValueChange={setDisabledEditableValue}
            disabled
          >
            <Select.Trigger editable placeholder='비활성화됨' />
            <Select.Content>
              <Select.Item value='12:00'>12:00</Select.Item>
              <Select.Item value='13:00'>13:00</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
      </div>
    );
  },
};
