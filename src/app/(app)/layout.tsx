import { ReactNode } from 'react';

import LayoutWrapper from '../_components/LayoutWrapper';

/**
 * Wraps child components in a full-layout wrapper.
 *
 * Renders the provided children inside a `LayoutWrapper` component configured for a full-page layout.
 *
 * @param children - The content to display within the layout
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  return <LayoutWrapper hasFullLayout>{children}</LayoutWrapper>;
}
