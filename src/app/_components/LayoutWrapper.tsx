import { ReactNode } from 'react';

import Header from '@/shared/components/layouts/header/Header';
import Footer from '@/shared/components/layouts/footer/Footer';

type Props = {
  children: ReactNode;
  withHeader?: boolean;
};

export default function LayoutWrapper({ children, withHeader }: Props) {
  return (
    <div className='min-h-[100dvh] min-w-[100dvw]'>
      {withHeader && <Header />}
      <div className='tablet:px-32 desktop:px-40 desktop:text-40 text-14 mx-auto min-h-screen max-w-1200 px-24'>
        {children}
      </div>
      {withHeader && <Footer />}
    </div>
  );
}
