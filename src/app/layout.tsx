import './globals.css';

import type { Metadata } from 'next';
import { ReactNode } from 'react';

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
      <body>{children}</body>
    </html>
  );
}
