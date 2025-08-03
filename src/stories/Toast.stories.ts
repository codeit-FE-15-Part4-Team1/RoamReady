import { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import Toast from '@/shared/components/ui/toast/Toast';
import { ToastState } from '@/shared/slices/toastSlice';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    toast: {
      control: 'object',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

const Template = (args: { toast: ToastState }) =>
  React.createElement(Toast, args);

export const Success: Story = {
  render: Template,
  args: {
    toast: {
      id: 'toast-1',
      type: 'success',
      message: '성공적으로 완료되었습니다!',
      duration: 4000,
    },
  },
};

export const Error: Story = {
  render: Template,
  args: {
    toast: {
      id: 'toast-2',
      type: 'error',
      message: '문제가 발생했습니다.',
      duration: 4000,
    },
  },
};

export const Info: Story = {
  render: Template,
  args: {
    toast: {
      id: 'toast-3',
      type: 'info',
      message: '이건 참고용 정보입니다.',
      duration: 4000,
    },
  },
};

export const Warning: Story = {
  render: Template,
  args: {
    toast: {
      id: 'toast-4',
      type: 'warning',
      message: '주의가 필요합니다!',
      duration: 4000,
    },
  },
};

export const Default: Story = {
  render: Template,
  args: {
    toast: {
      id: 'toast-5',
      type: 'info',
      message: '알림 메시지를 확인하세요.',
      duration: 4000,
    },
  },
};
