'use client';

import { CircleAlert } from 'lucide-react';

/**
 * @description
 * `ComponentErrorBoundary`에서 기본적으로 사용되는 폴백 UI 컴포넌트입니다.
 * 컴포넌트 렌더링 중 예상치 못한 에러가 발생했을 때,
 * 사용자에게 친절한 에러 메시지와 함께 로고를 표시합니다.
 * @returns {React.ReactNode} - 에러 발생 시 표시될 UI
 */
const ErrorFallback = () => {
  return (
    <div className='flex-col-center w-full gap-8 rounded-lg border border-red-300 bg-red-50 p-8 text-center text-gray-600'>
      <div className='flex-center gap-10'>
        <CircleAlert className='font-size-15 size-30 text-red-700' />
        <h2 className='font-size-20 font-bold'>
          예상치 못한 문제가 발생했습니다.
        </h2>
      </div>
      <p className='font-size-15'>
        잠시 후 다시 시도 하시거나, 페이지를 새로고침해 주세요.
      </p>
    </div>
  );
};

export default ErrorFallback;
