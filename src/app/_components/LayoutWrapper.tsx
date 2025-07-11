import { ReactNode } from 'react';

import Header from '@/shared/components/layouts/header/Header';

type Props = {
  children: ReactNode;
  withHeader?: boolean;
};

export default function LayoutWrapper({ children, withHeader }: Props) {
  return (
    <div className='min-h-[100dvh] min-w-[100dvw]'>
      {withHeader && <Header />}
      <div className='tablet:px-32 desktop:px-40 mx-auto max-w-1200 px-24'>
        {children}
      </div>
    </div>
  );
}
