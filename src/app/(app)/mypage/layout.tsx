import { ReactNode } from 'react';

import MyPageMenu from '@/domain/User/components/ui/MyPageMenu';

interface MyPageLayoutProps {
  children: ReactNode;
}

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <div className='tablet:gap-20 desktop:gap-20 flex py-20'>
      {/* 메뉴(사이드바) */}
      <aside className='tablet:sticky tablet:top-24 tablet:w-178 desktop:w-290 tablet:block hidden'>
        <MyPageMenu />
      </aside>
      {/* 컨텐츠 */}
      <main className='flex-1'>{children}</main>
    </div>
  );
}
