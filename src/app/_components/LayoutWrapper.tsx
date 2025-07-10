import { ReactNode } from 'react';

import Footer from '@/shared/components/layouts/footer/Footer';
import Header from '@/shared/components/layouts/header/Header';

type Props = {
  children: ReactNode;
  withLayout?: boolean;
};

export default function LayoutWrapper({ children, withLayout }: Props) {
  return (
    <div className='min-h-[100dvh] min-w-[100dvw]'>
      {withLayout && <Header />}
      <div className='tablet:px-32 desktop:px-40 desktop:text-40 text-14 mx-auto min-h-screen max-w-1200 px-24'>
        {children}
      </div>
      {withLayout && <Footer />}
    </div>
  );
}
