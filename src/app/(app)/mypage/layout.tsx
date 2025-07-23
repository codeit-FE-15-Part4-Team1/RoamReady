import { ReactNode } from 'react';

import MyPageMenu from '@/domain/User/components/ui/MyPageMenu';

interface MyPageLayoutProps {
  children: ReactNode;
}

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <div className='tablet:gap-20 desktop:gap-20 flex'>
      {/* 메뉴(사이드바) */}
      <aside className='tablet:sticky tablet:top-24 tablet:w-178 tablet:flex-shrink-0 tablet:self-start desktop:w-290 tablet:block mt-20 hidden h-full w-full'>
        <MyPageMenu />
      </aside>
      {/* 컨텐츠 */}
      <main className='tablet:block mt-20 block flex-1'>{children}</main>
    </div>
  );
}
