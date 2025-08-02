import Link from 'next/link';

import MyPageContentHeader from '@/domain/Reservation/components/header';
import MyActivitySection from '@/domain/Reservation/components/my-activity-section/MyActivitySection';
import { ROUTES } from '@/shared/constants/routes';

export default function MyExperiencePage() {
  return (
    <div>
      <div className='flex justify-between'>
        <MyPageContentHeader
          title='내 체험 관리'
          description='체험을 등록하거나 수정 및 삭제가 가능합니다.'
        />
        <Link
          href={ROUTES.MYPAGE.EXPERIENCES_CREATE}
          className='tablet:block hidden cursor-auto'
        >
          <button
            type='button'
            className='font-size-16 bg-brand-2 flex-center hover:bg-brand-2/80 mt-10 cursor-pointer rounded-3xl px-14 py-8 font-semibold text-white'
          >
            체험 등록
          </button>
        </Link>
      </div>
      <MyActivitySection />
    </div>
  );
}
