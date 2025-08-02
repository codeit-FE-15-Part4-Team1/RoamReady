'use client';

import Header from '@/shared/components/layouts/header/Header';
import ToastExample from '@/shared/components/ui/toast/ToastExample';

/**
 * @description 토스트 컴포넌트 테스트를 위한 개발용 페이지입니다.
 *
 */
export default function ToastTestPage() {
  return (
    <>
      <Header user={null} />
      <main className='flex min-h-screen w-full items-center justify-center bg-gray-100'>
        <ToastExample />
      </main>
    </>
  );
}
