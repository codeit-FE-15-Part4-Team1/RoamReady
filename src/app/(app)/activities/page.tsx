import { Suspense } from 'react';

import UrlMessageToast from '@/app/_components/UrlMessageToast';
import ResponsiveSearchBar from '@/domain/Activity/components/main/ActivitySearch/ResponsiveSearchBar';
import ActivityCarouselWrapper from '@/domain/Activity/components/main/ActivitySection/ActivityCarouselWrapper';
import ActivitySection from '@/domain/Activity/components/main/ActivitySection/ActivitySection';

interface ActivityPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ActivityPage({
  searchParams,
}: ActivityPageProps) {
  return (
    <>
      {/* URL 쿼리 파라미터를 처리하여 토스트를 띄우는 컴포넌트를 추가합니다. */}
      <Suspense fallback={null}>
        <UrlMessageToast />
      </Suspense>
      <div className='space-y-60'>
        <div className='flex-col-center gap-20 py-40'>
          <h1 className='font-size-24 tablet:font-size-30 font-bold text-neutral-800'>
            무엇을 체험하고 싶으신가요?
          </h1>
          <ResponsiveSearchBar />
        </div>

        {/* 검색 조건에 따른 캐러셀 표시/숨김을 실시간으로 제어 */}
        <ActivityCarouselWrapper />

        <ActivitySection searchParamsPromise={searchParams} />
      </div>
    </>
  );
}
