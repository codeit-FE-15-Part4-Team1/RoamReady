import { ReactNode } from 'react';

import LayoutWrapper from '../_components/LayoutWrapper';

export default function AppLayout({ children }: { children: ReactNode }) {
  return <LayoutWrapper hasFullLayout>{children}</LayoutWrapper>;
}
