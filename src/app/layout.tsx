import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ReactNode } from 'react';

import ClientProviders from './_components/ClientProvider';

export const metadata: Metadata = {
  title: {
    default: 'RoamReady',
    template: '%s | RoamReady',
  },
  description: '여행 준비는 RoamReady에서!',
  keywords: ['여행', '예약', 'RoamReady'],
};

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '100 900',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ko'>
      <body className={pretendard.className} suppressHydrationWarning>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
