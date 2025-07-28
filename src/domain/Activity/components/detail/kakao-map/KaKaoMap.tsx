'use client';

import { useKakaoMap } from '@/domain/Activity/hooks/detail/useKakaoMap';
import LogoSymbol from '@/shared/assets/logos/LogoSymbol';
import { cn } from '@/shared/libs/cn';

import KaKaoMapSkeleton from '../skeleton/KaKaoMapSkeleton';

// 전역 객체에 kakao 속성 추가
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    kakao: any;
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * KaKaoMap
 * 주소 문자열을 입력받아 Kakao 지도를 렌더링하고, 해당 위치에 커스텀 오버레이를 표시하는 컴포넌트입니다.
 *
 * - 주소(`address`)를 받아 Kakao Maps API로 위도/경도 좌표를 조회합니다.
 * - 좌표 조회 후 해당 위치를 중심으로 지도를 초기화하고, 커스텀 오버레이를 그립니다.
 * - `react-dom/server`의 `renderToString`을 활용해 React 컴포넌트인 `CustomOverlay`를 문자열로 변환하여 Kakao 지도 위에 표시합니다.
 * - 주소 변환 실패 또는 지도 초기화 실패 시, 오류 메시지와 함께 fallback UI를 렌더링합니다.
 * - 스크립트가 로딩되는 동안에는 skeleton UI(애니메이션)로 로딩 상태를 표현합니다.
 *
 * @param {string} [className] - 외부에서 전달되는 Tailwind 등 사용자 정의 클래스
 * @param {string} [address] - 지도를 표시할 주소 문자열
 *
 * @example
 * <KaKaoMap address="서울특별시 중구 세종대로 110" />
 */
export default function KaKaoMap({
  className,
  address,
}: {
  className?: string;
  address: string;
}) {
  const { isLoading, error, finalAddress } = useKakaoMap(address);

  return (
    <div className='flex flex-col gap-8'>
      {/* 지도 상단에 표시되는 주소 */}
      <h3 className='font-size-14 text-base font-semibold text-gray-700'>
        {finalAddress}
      </h3>

      {/* 로딩 중일 때 Skeleton UI */}
      {isLoading ? (
        <KaKaoMapSkeleton className={className} />
      ) : error ? (
        // 에러 발생 시 메시지 출력
        <div
          className={cn(
            'font-size-16 bg-brand-1 text-brand-2 flex h-300 w-full items-center justify-center rounded-3xl',
            className,
          )}
        >
          <div className='flex flex-col items-center justify-center gap-20'>
            <LogoSymbol className='h-130 w-130' />
            {error === 'map' && '지도를 불러오는 중 오류가 발생했습니다.'}
            {error === 'address' && '해당 위치를 찾을 수 없습니다.'}
          </div>
        </div>
      ) : (
        // 지도 정상 렌더링
        <div
          id='kakao-map'
          className={cn('h-300 w-full rounded-3xl', className)}
        />
      )}
    </div>
  );
}
