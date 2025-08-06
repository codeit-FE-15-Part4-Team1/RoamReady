import './global.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ReactNode, Suspense } from 'react';

import ClientProvider from './_components/ClientProvider';

export const metadata: Metadata = {
  title: {
    default: 'RoamReady',
    template: '%s | RoamReady',
  },
  description: '여행 준비는 RoamReady에서!',
  keywords: ['여행', '예약', 'RoamReady'],
  icons: {
    icon: '/favicon.ico',
  },
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
      <body className={pretendard.className}>
        <div id='portal-root'></div>
        <Suspense>
          <ClientProvider>{children}</ClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
