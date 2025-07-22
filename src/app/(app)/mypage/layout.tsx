'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

interface MyPageLayoutProps {
  children: ReactNode;
  menu: ReactNode;
}

export default function MyPageLayout({ children, menu }: MyPageLayoutProps) {
  const pathname = usePathname();

  /** 현재 페이지가 /mypage 경로인지 확인하는 변수 */
  const isMyPageRoot = pathname === '/mypage';

  return (
    <div className='tablet:gap-20 desktop:gap-20 flex'>
      {/* 메뉴(사이드바) 영역 */}
      <aside
        className={cn(
          'tablet:sticky tablet:top-24 tablet:w-178 tablet:flex-shrink-0 tablet:self-start desktop:w-290 mt-20 h-full w-full',
          isMyPageRoot ? 'block' : 'tablet:block hidden',
        )}
      >
        {menu}
      </aside>

      {/* 컨텐츠(children) 영역 */}
      <main
        className={cn(
          'mt-20 flex-1',
          isMyPageRoot ? 'tablet:block hidden' : 'block',
        )}
      >
        {children}
      </main>
    </div>
  );
}
