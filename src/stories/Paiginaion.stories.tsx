'use client';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps, useState } from 'react';

import Pagination from '@/shared/components/ui/Pagination';

function renderPaginationWithState(args: ComponentProps<typeof Pagination>) {
  const [page, setPage] = useState(args.currentPage ?? 1);

  return (
    <div className='flex flex-col items-center'>
      <div className='mb-4 text-gray-700'>현재 페이지: {page}</div>
      <Pagination
        {...args}
        currentPage={page}
        onPageChange={(newPage) => {
          setPage(newPage);
          (args.onPageChange as (page: number) => void)?.(newPage);
        }}
      />
    </div>
  );
}

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
    pageRange: { control: { type: 'number', min: 1 } },
    onPageChange: { action: 'page changed' },
  },
  args: {
    currentPage: 1,
    totalPages: 20,
    pageRange: 5,
    onPageChange: () => {},
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: renderPaginationWithState,
};

export const FewPages: Story = {
  args: {
    totalPages: 5,
  },
  render: renderPaginationWithState,
};

export const NarrowRange: Story = {
  args: {
    pageRange: 3,
  },
  render: renderPaginationWithState,
};

export const MiddlePage: Story = {
  args: {
    currentPage: 10,
  },
  render: renderPaginationWithState,
};
