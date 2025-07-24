import { ReactNode } from 'react';

import Footer from '@/shared/components/layouts/footer/Footer';
import Header from '@/shared/components/layouts/header/Header';

import Container from '../_components/Container';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-[100dvh] flex-col'>
      <Header />
      <main className='flex-1'>
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
}
