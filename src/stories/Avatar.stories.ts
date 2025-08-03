// Avatar.stories.tsx

import { Meta, StoryObj } from '@storybook/nextjs-vite';

import Avatar from '@/shared/components/ui/avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    profileImageUrl: {
      control: 'text',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'lg'],
    },
    isLoading: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const DefaultImageSM: Story = {
  args: {
    profileImageUrl: '',
    size: 'sm',
    isLoading: false,
  },
};

export const DefaultImageLG: Story = {
  args: {
    profileImageUrl: '',
    size: 'lg',
    isLoading: false,
  },
};

export const CustomImageSM: Story = {
  args: {
    profileImageUrl: 'https://i.pravatar.cc/300?img=12',
    size: 'sm',
    isLoading: false,
  },
};

export const CustomImageLG: Story = {
  args: {
    profileImageUrl: 'https://i.pravatar.cc/300?img=22',
    size: 'lg',
    isLoading: false,
  },
};

export const LoadingWithDefaultImage: Story = {
  args: {
    profileImageUrl: '',
    size: 'lg',
    isLoading: true,
  },
};

export const LoadingWithCustomImage: Story = {
  args: {
    profileImageUrl: 'https://i.pravatar.cc/300?img=35',
    size: 'lg',
    isLoading: true,
  },
};
