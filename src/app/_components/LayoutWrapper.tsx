import { ReactNode } from 'react';

import Header from '@/shared/components/layouts/header/Header';

type Props = {
  children: ReactNode;
  withHeader?: boolean;
};

export default function LayoutWrapper({ children, withHeader }: Props) {
  return (
    <div className="min-h-[100dvh] min-w-[100dvw]">
      {withHeader && <Header />}
      <div className="mx-auto max-w-[120rem] px-[2.4rem] md:px-[3rem] lg:px-[4rem]">
        {children}
      </div>
    </div>
  );
}
