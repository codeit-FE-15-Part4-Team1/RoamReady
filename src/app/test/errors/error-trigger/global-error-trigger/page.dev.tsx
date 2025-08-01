'use client';

import { useEffect } from 'react';

/**
 * @component GlobalErrorTestPage
 * @description
 * 전역 에러 바운더리(`src/app/error.tsx`)의 동작을 테스트하기 위한 헬퍼 페이지입니다.
 * 이 페이지는 `(app)` 라우트 그룹 밖에 위치하며, 컴포넌트가 마운트된 직후 `useEffect` 훅을 통해 의도적으로 에러를 발생시킵니다.
 * 이 에러는 `src/app/error.tsx` (글로벌 에러 바운더리)에 의해 포착되어
 * 페이지 전체를 대체하는 에러 UI를 표시하도록 유도합니다.
 * 이 페이지 자체의 UI는 에러 바운더리에 의해 즉시 대체되므로 화면에 나타나지 않을 수 있습니다.
 * 시각적인 확인을 원할 시 네트워크 throttling을 사용하여 잠시 동안 페이지의 내용을 볼 수 있습니다.
 *
 * @returns {JSX.Element} 에러 발생을 알리는 간단한 UI를 포함하는 React 요소입니다.
 *
 */
export default function GlobalErrorTestPage() {
  useEffect(() => {
    throw new Error('전역 에러 테스트를 위한 의도적인 에러입니다.');
  }, []);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100 p-10 text-center'>
      <h1 className='font-size-30 font-bold text-gray-800'>
        전역 에러 트리거 페이지
      </h1>
      <p className='font-size-15 text-gray-700'>
        이 페이지는 로드되자마자 전역 에러를 발생시킵니다.
        <br />
        잠시 후 `src/app/error.tsx`에 정의된 UI가 나타날 것입니다.
      </p>
    </div>
  );
}
