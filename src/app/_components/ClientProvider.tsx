'use client';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/shared/libs/queryClient';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
