import type { NextConfig } from 'next';
import type { RuleSetCondition,RuleSetRule } from 'webpack';

const pageExtensions = ['tsx', 'ts', 'jsx', 'js'];

if (
  process.env.NODE_ENV === 'development' ||
  process.env.VERCEL_ENV === 'preview'
) {
  pageExtensions.unshift('dev.tsx');
}

const nextConfig: NextConfig = {
  pageExtensions,
  reactStrictMode: true,

  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule: RuleSetRule) =>
        rule.test instanceof RegExp && rule.test.test('.svg'),
    ) as RuleSetRule | undefined;

    if (!fileLoaderRule) return config;

    // resourceQuery가 객체이고 'not' 속성이 있는지 확인
    const query = fileLoaderRule.resourceQuery;
    let existingNotConditions: RuleSetCondition[] = [];

    if (typeof query === 'object' && query !== null && 'not' in query) {
      const not = (query as { not?: RuleSetCondition | RuleSetCondition[] })
        .not;
      if (Array.isArray(not)) {
        existingNotConditions = not;
      } else if (not) {
        existingNotConditions = [not];
      }
    }

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...existingNotConditions, /url/],
        },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              ext: 'tsx',
            },
          },
        ],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
