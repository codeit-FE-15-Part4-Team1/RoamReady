import { ReactNode } from 'react';

import Footer from '@/shared/components/layouts/footer/Footer';
import Header from '@/shared/components/layouts/header/Header';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col justify-between'>
      <Header />
      <div className='tablet:px-32 desktop:px-40 font-size-14 max-w-1200 px-24'>
        {children}
      </div>
      <Footer />
    </div>
  );
}
