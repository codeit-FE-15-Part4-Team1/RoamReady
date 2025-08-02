'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import Button from '@/shared/components/Button';

/**
 * ! api 구현하고 업데이트 예정
 * @component ErrorTriggerDashboardPage
 * @description
 * 다양한 유형의 에러 처리 UI를 테스트하기 위한 대시보드 페이지입니다.
 * 이 페이지는 Next.js의 에러 바운더리(`error.tsx`) 동작과 API 에러 토스트 알림을
 * 시각적으로 확인하고 디버깅하는 데 사용됩니다.
 * 각 버튼은 해당 에러 유형을 유도하는 헬퍼 페이지로 이동하여 테스트를 수행합니다.
 *
 * @function triggerGlobalErrorPage
 * '글로벌 에러 발생' 버튼 클릭 시 호출됩니다.
 * `src/app/test/error-trigger/global-error-trigger` 페이지로 이동하여
 * `src/app/error.tsx` (글로벌 에러 바운더리)의 동작을 유도합니다.
 * 이 에러 바운더리는 페이지 전체를 대체하는 UI를 렌더링합니다.
 *
 * @function triggerSegmentErrorPage
 * '세그먼트 렌더링 에러 발생' 버튼 클릭 시 호출됩니다.
 * `src/app/(app)/test/segment-error-trigger` 페이지로 이동하여
 * `src/app/(app)/error.tsx` (세그먼트-레벨 에러 바운더리)의 동작을 유도합니다.
 * 이 에러 바운더리는 헤더/푸터 등 상위 레이아웃을 유지한 채 콘텐츠 영역만 대체합니다.
 *
 * @function triggerApiErrorPage
 * ! 수정 예정
 * 'API 에러 테스트' 버튼 클릭 시 호출됩니다.
 * `src/app/(app)/test/api-error-trigger` 페이지로 이동하여
 * API 호출 실패 상황을 시뮬레이션하고, `useToast`를 통한 에러 알림이
 * 올바르게 표시되는지 테스트합니다. 이 에러는 `error.tsx` 바운더리에 의해 직접 잡히지 않습니다.
 *
 * @returns {JSX.Element} 세 가지 에러 유형을 시작하는 버튼들이 포함된 React 요소입니다.
 */
export default function ErrorTriggerDashboardPage() {
  const router = useRouter();

  const triggerGlobalErrorPage = () => {
    router.push('/test/error-trigger/global-error-trigger');
  };

  const triggerSegmentErrorPage = () => {
    router.push('/test/error-trigger/segment-error-trigger');
  };

  const triggerApiErrorPage = () => {
    router.push('/test/error-trigger/api-error-trigger');
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-10 bg-gray-100 p-4 text-center'>
      <h1 className='font-size-30 font-bold text-gray-800'>
        에러 유형 테스트 대시보드
      </h1>
      <p className='font-size-16 tablet:max-w-4xl max-w-2xl text-gray-700'>
        아래 버튼들을 클릭하여 세 가지 다른 에러 처리 메커니즘을 테스트할 수
        있습니다.
      </p>

      <div className='tablet:flex-row tablet:max-w-4xl flex max-w-2xl flex-col justify-center gap-10'>
        <Button
          onClick={triggerGlobalErrorPage}
          variant='primary'
          className='font-size-15 px-8 py-4 font-semibold shadow-md transition-all duration-200 hover:scale-105'
        >
          글로벌 에러 발생 (`/error.tsx`)
        </Button>

        <Button
          onClick={triggerSegmentErrorPage}
          variant='primary'
          className='font-size-15 px-8 py-4 font-semibold shadow-md transition-all duration-200 hover:scale-105'
        >
          세그먼트 렌더링 에러 발생 (`(app)/error.tsx`)
        </Button>

        <Button
          onClick={triggerApiErrorPage}
          variant='primary'
          className='font-size-15 px-8 py-4 font-semibold shadow-md transition-all duration-200 hover:scale-105'
        >
          API 에러 발생 (`(app)/error.tsx`)
        </Button>
      </div>

      <p className='font-size-14 text-gray-500'>
        (각 버튼 클릭 시 해당하는 에러 처리 UI가 렌더링됩니다.)
      </p>
    </div>
  );
}
