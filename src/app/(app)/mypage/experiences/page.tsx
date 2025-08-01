import Link from 'next/link';

import MyActivitySection from '@/domain/Reservation/components/my-activity-section/MyActivitySection';

export default function MyExperiencePage() {
  return (
    <div>
      <div className='mb-20 flex items-center justify-between'>
        <div>
          <h1 className='font-size-18 font-bold text-neutral-900'>
            내 체험 관리
          </h1>
          <p className='font-size-16 font-medium text-neutral-500'>
            체험을 등록하거나 수정 및 삭제할 수 있습니다.
          </p>
        </div>
        <Link href='/mypage/experiences/create'>
          <button className='bg-brand-2 font-size-16 hover:bg-brand-2/80 cursor-pointer rounded-3xl px-12 py-12 font-semibold text-white'>
            체험 등록하기
          </button>
        </Link>
      </div>
      <MyActivitySection />
    </div>
  );
}
