import { ReactNode } from 'react';

import Footer from '@/shared/components/layouts/footer/Footer';
import Header from '@/shared/components/layouts/header/Header';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-[100dvh] flex-col'>
      <Header />
      <main className='tablet:px-32 desktop:px-40 mx-auto w-full max-w-1200 flex-1 px-24'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
