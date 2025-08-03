'use client';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EllipsisVertical } from 'lucide-react';
import * as React from 'react';

import Dropdown from '@/shared/components/ui/dropdown';

const meta: Meta<typeof Dropdown.Root> = {
  title: 'Components/Dropdown',
  component: Dropdown.Root,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown.Root>;
function DropdownExample({
  trigger,
  items,
}: {
  trigger: React.ReactNode;
  items: { label: string; onClick: () => void }[];
}) {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>{trigger}</Dropdown.Trigger>
      <Dropdown.Menu menuClassName='top-40'>
        {items.map((item, idx) => (
          <Dropdown.Item key={idx} onClick={item.onClick}>
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown.Root>
  );
}

export const Default: Story = {
  render: () => (
    <div className='mt-100 flex justify-center'>
      <DropdownExample
        trigger={<EllipsisVertical />}
        items={[
          { label: '수정하기', onClick: () => alert('수정하기') },
          { label: '삭제하기', onClick: () => alert('삭제하기') },
        ]}
      />
    </div>
  ),
};

export const CircleTrigger: Story = {
  render: () => (
    <div className='mt-100 flex justify-center'>
      <DropdownExample
        trigger={<div className='bg-brand-2 h-30 w-30 rounded-full' />}
        items={[
          { label: '로그아웃', onClick: () => alert('로그아웃') },
          { label: '마이페이지', onClick: () => alert('마이페이지') },
        ]}
      />
    </div>
  ),
};
