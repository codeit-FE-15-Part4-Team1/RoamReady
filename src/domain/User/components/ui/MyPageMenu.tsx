'use client';

import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/libs/cn';

import { useMyPageMenu } from '../../hooks/useMyPageMenu';

/**
 * 마이페이지 메뉴 컴포넌트
 * - 좌측 메뉴 UI를 렌더링하며,
 * - hover 또는 현재 경로에 따라 하이라이트를 표시함
 * - 유저 아바타 수정도 포함
 */
export default function MyPageMenu() {
  // 커스텀 훅으로부터 필요한 상태와 함수들을 구조 분해 할당
  const {
    menuItems, // 메뉴 항목 배열
    hoveredItem, // 현재 hover 중인 메뉴 href
    navRef, // <ul> 전체 메뉴 참조
    highlightStyle, // 하이라이트 위치 및 스타일
    setItemRef, // 각 메뉴 항목에 대한 ref 등록 함수
    setHoveredItem, // hover 상태 설정 함수
    isActive, // 메뉴 항목이 현재 경로 기준으로 active 여부 판단 함수
  } = useMyPageMenu();

  const pathname = usePathname();
  const create = pathname.includes('create');
  const edit = pathname.includes('edit');

  if (create || edit) {
    return null;
  }

  return (
    <aside className='tablet:sticky tablet:top-24 tablet:w-178 desktop:w-290 tablet:block hidden'>
      <div className='tablet:border-brand-1 tablet:border tablet:shadow-lg tablet:px-24 tablet:py-16 w-full rounded-3xl'>
        {/* 유저 프로필 아바타 (수정 가능) */}

        {/* 메뉴 리스트 영역 */}
        <ul
          ref={navRef} // 전체 <ul> DOM 참조 설정
          className='relative flex w-full flex-col gap-4'
          onMouseLeave={() => setHoveredItem(null)} // 마우스 나갈 시 hover 상태 초기화
        >
          {/* 동적으로 움직이는 하이라이트 배경 */}
          <motion.div
            className='bg-brand-1 pointer-events-none absolute left-0 w-full rounded-3xl'
            animate={highlightStyle} // top, height, opacity 애니메이션 적용
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            aria-hidden='true'
            role='presentation'
          />

          {/* 메뉴 항목 리스트 렌더링 */}
          {menuItems.map((item) => {
            const active = isActive(item.href); // 현재 활성 경로인지 판단
            const MenuIcon = item.icon; // 아이콘 컴포넌트
            const isHovered = hoveredItem === item.href;

            return (
              <li
                key={item.href}
                ref={(node) => setItemRef(item.href, node)} // 각 항목의 DOM 참조 등록
                className='relative'
                onMouseEnter={() => setHoveredItem(item.href)} // hover 시작 시 상태 업데이트
              >
                {/* 링크로 이동 (Next.js Link 사용) */}
                <Link href={item.href} className='relative z-10 block'>
                  <div
                    className={cn(
                      'tablet:px-20 relative flex items-center justify-between rounded-3xl',
                      'tablet:py-14 desktop:py-17.5 py-17.5',
                    )}
                  >
                    <div className='flex items-center gap-8'>
                      {/* 아이콘 렌더링 */}
                      <MenuIcon
                        className={cn(
                          'tablet:size-16 desktop:size-18 size-18 flex-shrink-0 text-gray-600',
                          (active || isHovered) && 'text-brand-2', // 활성 or hover 시 강조 색상
                        )}
                      />
                      {/* 라벨 텍스트 */}
                      <span
                        className={cn(
                          'font-size-16 whitespace-nowrap',
                          active || isHovered
                            ? 'font-medium text-gray-900' // 강조 스타일
                            : 'text-gray-600', // 기본 회색
                        )}
                      >
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight className='tablet:hidden tablet:size-16 desktop:size-18 size-18 text-gray-600' />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
