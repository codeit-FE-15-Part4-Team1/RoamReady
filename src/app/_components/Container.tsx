import { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className='tablet:px-32 desktop:px-40 mx-auto w-full max-w-1920 px-24'>
      {children}
    </div>
  );
}
