'use client';

import { Ban as ErrorIcon } from 'lucide-react';
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
 * @component Error
 * @description
 * Next.js 애플리케이션의 최상위 (글로벌) 에러 바운더리 컴포넌트입니다.
 * 애플리케이션 전반에서 발생하는 예측 불가능한 렌더링 에러를 포착하여,
 * 사용자에게 페이지 전체를 대체하는 폴백(fallback) UI를 제공합니다.
 * 에러 정보는 개발 콘솔에 로깅되며, 필요시 외부 에러 로깅 서비스와 통합될 수 있습니다.
 *
 * @section 복구 버튼 역할
 * - **다시 시도 (reset)**:
 * `reset` 함수를 호출하여 현재 에러가 발생한 컴포넌트 트리를 처음부터 다시 렌더링하도록 시도합니다.
 * 일시적인 네트워크 문제나 데이터 로딩 오류 등 자체적으로 복구될 수 있는 경우에 유용합니다.
 * - **페이지 새로고침 (window.location.reload())**:
 * 브라우저의 전체 페이지를 새로고침하여 애플리케이션의 상태를 완전히 초기화합니다.
 * `reset`으로 해결되지 않는 복합적인 오류나 캐싱 문제 등이 있을 때 사용됩니다.
 *
 * @param {object} props - 컴포넌트의 props입니다.
 * @param {Error} props.error - 발생한 에러 객체입니다.
 * @param {() => void} props.reset - 에러 바운더리를 리셋하고 해당 세그먼트의 재렌더링을 시도하는 함수입니다.
 * @returns {JSX.Element} 에러 메시지와 재시도 버튼을 포함하는 React 요소입니다.
 *
 */
export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('[Global Error] 예상치 못한 클라이언트 에러 발생:', error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center gap-8 bg-red-50 p-50 text-center text-red-800'>
      <h1 className='font-size-25 tablet:font-size-30 flex items-center justify-center font-bold'>
        <ErrorIcon className='mr-8 size-30' />
        문제가 발생했습니다.
      </h1>
      <p className='font-size-15 tablet:font-size-20 text-gray-700'>
        서비스 이용에 불편을 드려 죄송합니다. 문제가 계속되면 고객센터에
        문의해주세요.
      </p>

      {process.env.NODE_ENV === 'development' && (
        <div className='font-size-12 tablet:font-size-15 tablet:max-w-4xl desktop:max-w-7xl flex w-full flex-col gap-4 overflow-x-auto rounded-md border border-gray-200 bg-white p-10 text-left font-mono text-gray-700'>
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
          다시 시도
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
