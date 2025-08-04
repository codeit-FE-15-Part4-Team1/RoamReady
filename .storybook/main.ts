import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'], // ← 경로 구분자 슬래시(`/`)로!
  async viteFinal(config, { configType }) {
    // Production build 시 base 경로 설정
    if (configType === 'PRODUCTION') {
      config.base = '/storybook/';
    }
    return config;
  },
};

export default config;
