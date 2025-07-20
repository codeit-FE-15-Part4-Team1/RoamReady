import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-screen items-center justify-center bg-white px-24 py-50'>
      {children}
    </div>
  );
}
