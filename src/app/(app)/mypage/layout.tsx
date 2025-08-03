import { ReactNode } from 'react';

import MyPageMenu from '@/domain/User/components/ui/MyPageMenu';

interface MyPageLayoutProps {
  children: ReactNode;
}

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <div className='tablet:gap-20 desktop:gap-20 mx-auto flex w-full max-w-1200'>
      {/* 메뉴(사이드바) */}
      <aside className='tablet:block hidden'>
        <MyPageMenu />
      </aside>
      {/* 컨텐츠 */}
      <main className='min-w-0 flex-1'>{children}</main>
    </div>
  );
}
