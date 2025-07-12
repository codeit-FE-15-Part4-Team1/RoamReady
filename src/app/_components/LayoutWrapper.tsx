import { ReactNode } from 'react';

import Footer from '@/shared/components/layouts/footer/Footer';
import Header from '@/shared/components/layouts/header/Header';

type Props = {
  children: ReactNode;
  hasFullLayout?: boolean;
};

export default function LayoutWrapper({ children, hasFullLayout }: Props) {
  return (
    <div className='min-h-[100dvh] min-w-[100dvw]'>
      {withHeader && <Header />}
      <div className='tablet:px-32 desktop:px-40 mx-auto max-w-1200 px-24'>
        {children}
      </div>
      {hasFullLayout && <Footer />}
    </div>
  );
}
