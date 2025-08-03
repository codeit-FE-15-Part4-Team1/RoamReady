import { ReactNode } from 'react';

export default function ActivityDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className='mx-auto w-full max-w-1200 flex-1 px-24 py-20'>
      {children}
    </main>
  );
}
