'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback,useEffect, useState } from 'react';

import CategorySelect from '@/domain/Activity/components/main/ActivityFilter/CategorySelect';
import SortSelect from '@/domain/Activity/components/main/ActivityFilter/SortSelect';
import ActivitySearchBar from '@/domain/Activity/components/main/ActivitySearch/ActivitySearchBar';
import { GetActivitiesRequestQuery } from '@/domain/Activity/schemas/main';
import Logo from '@/shared/assets/logos/Logo';
import { ROUTES } from '@/shared/constants/routes';
import type { User } from '@/shared/slices/userSlice';
import { useRoamReadyStore } from '@/shared/store';

export type SortOption = NonNullable<GetActivitiesRequestQuery['sort']>;

/**
 * 검색 전용 헤더 컴포넌트
 */
export default function SearchHeader() {
  const userFromStore = useRoamReadyStore((state) => state.user);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get(
    'category',
  ) as GetActivitiesRequestQuery['category'];
  const sort = (searchParams.get('sort') ?? 'latest') as SortOption;

  useEffect(() => {
    setUser(userFromStore);
  }, [userFromStore]);

  const handleFilterChange = useCallback(
    (key: 'category' | 'sort', value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams.toString()],
  );

  return (
    <header className='sticky top-0 z-40 border-b border-neutral-200 bg-white'>
      {/* 메인 헤더: 로고 + 검색바 + 메뉴 */}
      <div className='tablet:px-32 desktop:px-40 mx-auto max-w-2550 px-24'>
        <div className='flex items-center justify-between py-4'>
          {/* 로고 */}
          <Link href={ROUTES.ACTIVITIES.ROOT}>
            <Logo className='tablet:w-130 tablet:h-100 relative h-70 w-100 shrink-0' />
          </Link>

          {/* 가운데 검색바 */}

          <ActivitySearchBar />

          {/* 오른쪽 메뉴 */}
          <nav>
            {user ? (
              <div className='flex items-center justify-center gap-20'>
                <Image
                  src='/icons/bell.svg'
                  alt='알림 아이콘'
                  width={24}
                  height={24}
                />
                <div className='flex items-center justify-center gap-15'>
                  <div className='h-20 w-1 self-center bg-gray-100' />
                  <div className='h-30 w-30 rounded-full bg-black' />
                  <span className='font-size-14'>닉네임</span>
                </div>
              </div>
            ) : (
              <div className='flex items-center gap-10'>
                <Link
                  href={ROUTES.SIGNIN}
                  className='font-size-14 font-medium text-gray-600 hover:text-gray-900'
                >
                  로그인
                </Link>
                <Link
                  href={ROUTES.SIGNUP}
                  className='font-size-14 rounded-lg bg-blue-600 px-16 py-8 font-medium text-white hover:bg-blue-700'
                >
                  회원가입
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* 필터 영역 */}
      <div className='tablet:px-32 desktop:px-40 mx-auto max-w-2550 border-t border-neutral-200 bg-white px-24'>
        {/* 태블릿 이상: 기존 레이아웃 */}
        <div className='tablet:flex hidden items-center gap-20'>
          <SortSelect
            value={sort}
            onValueChange={(newSort) => handleFilterChange('sort', newSort)}
          />
          <CategorySelect
            value={category}
            onValueChange={(newCategory) =>
              handleFilterChange('category', newCategory)
            }
          />
        </div>

        {/* 태블릿 이하: Sort 고정, Category 스크롤 */}
        <div className='tablet:hidden flex min-w-0 items-center gap-16'>
          <SortSelect
            value={sort}
            onValueChange={(newSort) => handleFilterChange('sort', newSort)}
          />
          <div className='scrollbar-none min-w-0 flex-1 overflow-x-auto'>
            <CategorySelect
              value={category}
              onValueChange={(newCategory) =>
                handleFilterChange('category', newCategory)
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
}
