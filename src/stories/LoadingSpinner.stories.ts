import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { LoadingSpinner } from '@/shared/components/ui/loading-spinner';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Tailwind text-* 클래스 (ex. text-blue-500)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {
  args: {
    className: 'text-gray-500',
  },
};

export const BlueSpinner: Story = {
  args: {
    className: 'text-blue-500',
  },
};

export const RedSpinner: Story = {
  args: {
    className: 'text-red-500',
  },
};

export const LargeYellowSpinner: Story = {
  args: {
    className: 'text-yellow-500 h-20 w-20 md:h-24 md:w-24',
  },
};
