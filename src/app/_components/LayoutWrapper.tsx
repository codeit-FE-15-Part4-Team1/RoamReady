import { ReactNode } from 'react';

import Footer from '@/shared/components/layouts/footer/Footer';
import Header from '@/shared/components/layouts/header/Header';

type Props = {
  children: ReactNode;
  hasFullLayout?: boolean;
};

/**
 * Provides a responsive page layout with optional header and footer sections.
 *
 * Renders its children within a styled container. If `hasFullLayout` is true, a header is displayed above and a footer below the main content.
 *
 * @param hasFullLayout - If true, includes the header and footer in the layout
 */
export default function LayoutWrapper({ children, hasFullLayout }: Props) {
  return (
    <div className='flex min-h-screen flex-col justify-between'>
      {hasFullLayout && <Header />}
      <div className='tablet:px-32 desktop:px-40 desktop:text-40 text-14 mx-auto max-w-1200 px-24'>
        {children}
      </div>
      {hasFullLayout && <Footer />}
    </div>
  );
}
