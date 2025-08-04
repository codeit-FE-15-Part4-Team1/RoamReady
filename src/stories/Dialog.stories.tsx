import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { Dialog } from '@/shared/components/ui/dialog';

const meta: Meta<typeof Dialog.Root> = {
  title: 'Components/Dialog',
  component: Dialog.Root,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog.Root>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button
          className='rounded-[8px] bg-black px-[20px] py-[14px] text-[16px] font-medium text-white transition-colors hover:bg-gray-800'
          onClick={() => setOpen(true)}
        >
          Controlled Dialog 열기
        </button>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Content variant='complete'>
            <div className='text-center'>
              <h1 className='mb-4 text-[20px] font-bold text-gray-900'>
                외부 상태로 제어되는 Dialog
              </h1>
              <p className='mb-6 text-gray-700'>
                open/onOpenChange props로 외부에서 Dialog를 열고 닫을 수
                있습니다.
              </p>
              <Dialog.Footer variant='complete'>
                <button
                  className='w-[130px] rounded-[8px] bg-black px-[16px] py-[12px] text-[14px] font-medium text-white transition-colors hover:bg-gray-800 md:w-[160px] md:text-[16px]'
                  onClick={() => setOpen(false)}
                >
                  닫기
                </button>
              </Dialog.Footer>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    );
  },
};
