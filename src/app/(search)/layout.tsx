'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

import SearchHeader from '@/app/(search)/_components/SearchHeader';
import Footer from '@/shared/components/layouts/footer/Footer';

interface SearchLayoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

/**
 * 검색 전용 레이아웃
 */
export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='min-h-screen bg-white'>
        <SearchHeader />
        <main className='tablet:px-32 desktop:px-40 mx-auto max-w-2550 px-24 py-18'>
          {children}
        </main>
      </div>
      <Footer />
    </QueryClientProvider>
  );
}
