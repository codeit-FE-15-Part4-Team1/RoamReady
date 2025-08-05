'use client';

import { TriangleAlert } from 'lucide-react';
import { useEffect } from 'react';

import Button from '@/shared/components/Button';

/**
 * @interface ErrorPageProps
 * @description
 * Next.js의 `error.tsx` 컴포넌트에 전달되는 props의 타입을 정의합니다.
 * 이 인터페이스는 에러 바운더리 컴포넌트가 포착한 오류 객체(`error`)와,
 * 오류 상태를 리셋하고 해당 세그먼트의 재렌더링을 시도할 수 있는 함수(`reset`)를 포함합니다.
 * `error` 객체는 오류 메시지, 스택 트레이스 등 상세 정보를 제공하며,
 * `reset` 함수는 사용자에게 '다시 시도'와 같은 복구 옵션을 제공할 때 사용됩니다.
 */
interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

/**
 * @component SegmentError
 * @description
 * Next.js 애플리케이션의 `(app)` 라우트 그룹 내에서 발생하는 에러를 처리하는 세그먼트-레벨 에러 바운더리 컴포넌트입니다.
 * 즉, 앱 콘텐츠 영역에서 발생하는 에러를 처리하는 세그먼트-레벨 에러 바운더리입니다.
 * 이 에러 바운더리는 상위 레이아웃(예: 헤더, 푸터)은 유지한 채,
 * 에러가 발생한 콘텐츠 영역만 대체하는 폴백(fallback) UI를 제공합니다.
 * 에러 정보는 개발 콘솔에 로깅되며, 필요시 외부 에러 로깅 서비스와 통합될 수 있습니다.
 *
 * @section 복구 버튼 역할
 * - **콘텐츠 다시 불러오기 (reset)**:
 * `reset` 함수를 호출하여 현재 에러가 발생한 콘텐츠 영역을 처음부터 다시 렌더링하도록 시도합니다.
 * 이는 일시적인 오류로 콘텐츠 로딩에 실패한 경우 유용합니다.
 * - **메인 페이지로 이동 (window.location.href = '/')**:
 * 애플리케이션의 메인 페이지로 사용자를 이동시켜, 현재 페이지의 오류와 관계없이 다른 기능을 사용할 수 있도록 합니다.
 *
 * @param {object} props - 컴포넌트의 props입니다.
 * @param {Error} props.error - 발생한 에러 객체입니다.
 * @param {() => void} props.reset - 에러 바운더리를 리셋하고 해당 세그먼트의 재렌더링을 시도하는 함수입니다.
 * @returns {JSX.Element} 에러 메시지, 오류 상세 정보 (개발 환경), 그리고 두 가지 복구 버튼을 포함하는 React 요소입니다.
 *
 */
export default function SegmentError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('[Segment Error] 콘텐츠 영역에서 에러 발생:', error);
  }, [error]);

  return (
    <div className='flex-col-center min-h-screen gap-8 bg-white py-50 text-center text-gray-800'>
      <h2 className='font-size-20 tablet:font-size-30 flex-center font-bold'>
        <TriangleAlert className='mr-8 size-30' />
        콘텐츠를 불러오지 못했습니다.
      </h2>
      <p className='font-size-13 tablet:font-size-20 text-gray-700'>
        현재 페이지의 내용을 표시하는 데 문제가 발생했습니다.
        <br />
        잠시 후 다시 시도해 주시거나 다른 페이지로 이동해 주세요.
      </p>

      {process.env.NODE_ENV === 'development' && (
        <div className='font-size-12 tablet:font-size-15 tablet:max-w-4xl desktop:max-w-7xl flex w-full flex-col gap-4 overflow-x-auto rounded-md border border-gray-200 bg-gray-50 p-10 text-left font-mono text-gray-700'>
          <h3 className='font-semibold'>
            오류 상세 정보 (개발 환경에서만 표시):
          </h3>
          <p>
            <strong>메시지:</strong> {error.message}
          </p>
          <pre className='whitespace-pre-wrap'>
            <code>{error.stack}</code>
          </pre>
        </div>
      )}

      <div className='font-size-12 tablet:font-size-15 mt-10 flex flex-row gap-4'>
        <Button
          onClick={() => reset()}
          variant='primary'
          className='px-16 py-13'
        >
          콘텐츠 다시 불러오기
        </Button>
        <Button
          onClick={() => window.location.reload()}
          variant='primary'
          className='bg-gray-500 px-16 py-13'
        >
          페이지 새로고침
        </Button>
      </div>
    </div>
  );
}
