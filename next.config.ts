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
};

export default nextConfig;
