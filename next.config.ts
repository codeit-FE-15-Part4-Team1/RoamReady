import type { NextConfig } from 'next';

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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
