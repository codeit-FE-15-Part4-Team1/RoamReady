import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import Button from '../shared/components/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'ghost', 'primary'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    selected: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'Button',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼
export const Default: Story = {
  args: {
    children: '기본 버튼',
  },
};

// Primary 버튼
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary 버튼',
  },
};

// Outline 버튼
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline 버튼',
  },
};

// Ghost 버튼
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost 버튼',
  },
};

// 크기별 버튼
export const Small: Story = {
  args: {
    size: 'small',
    children: '작은 버튼',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: '중간 버튼',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: '큰 버튼',
  },
};

// 선택된 버튼
export const Selected: Story = {
  args: {
    selected: true,
    children: '선택된 버튼',
  },
};

// 로딩 상태 버튼
export const Loading: Story = {
  args: {
    loading: true,
    children: '로딩 중...',
  },
};

// 비활성화된 버튼
export const Disabled: Story = {
  args: {
    disabled: true,
    children: '비활성화된 버튼',
  },
};

// 아이콘이 있는 버튼
export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: '➕ 아이콘과 함께',
  },
};
