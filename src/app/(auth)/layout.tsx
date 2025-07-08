import { ReactNode } from 'react';

import LayoutWrapper from '../_components/LayoutWrapper';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
