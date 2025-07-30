import Link from 'next/link';

import { ROUTES } from '@/shared/constants/routes';

/**
 * GuestMenu 컴포넌트 입니다.
 *
 * 로그인되지 않은 사용자를 위한 메뉴 컴포넌트입니다.
 * '로그인'과 '회원가입' 페이지로 이동할 수 있는 링크를 제공합니다.
 *
 */
export default function GuestMenu() {
  return (
    <div className='font-size-14 flex cursor-pointer gap-20 font-medium'>
      <Link href={ROUTES.SIGNIN} className='hover:text-gray-200'>
        로그인
      </Link>
      <Link href={ROUTES.SIGNUP} className='hover:text-gray-200'>
        회원가입
      </Link>
    </div>
  );
}
