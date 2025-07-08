import './globals.css';

import { QueryClientProvider } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { queryClient } from '@/shared/libs/queryClient';

export const metadata: Metadata = {
  title: {
    default: 'RoamReady',
    template: '%s | RoamReady',
  },
  description: '여행 준비는 RoamReady에서!',
  keywords: ['여행', '예약', 'RoamReady'],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ko'>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
