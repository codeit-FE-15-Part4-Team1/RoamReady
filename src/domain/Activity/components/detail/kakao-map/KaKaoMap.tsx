'use client';

import { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';

import { getLatLngByAddress } from '@/domain/Activity/libs/detail/getLatLngByAdress';
import LogoSymbol from '@/shared/assets/logos/LogoSymbol';
import { cn } from '@/shared/libs/cn';

import CustomOverlay from './CustomOverlay';

// 전역 객체에 kakao 속성 추가
declare global {
   
  interface Window {
    kakao: any;
  }
}

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
  address?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<'map' | 'address' | null>(null);
  const [finalAddress, setFinalAddress] = useState(address);

  useEffect(() => {
    /**
     * Kakao Map SDK를 비동기적으로 로드하는 함수입니다.
     *
     * - 이미 스크립트가 로드되어 있다면, 즉시 resolve됩니다.
     * - 아직 로드되지 않았다면 script 태그를 동적으로 삽입하고,
     *   'load' 이벤트가 발생하면 resolve, 'error' 발생 시 reject 합니다.
     * - SDK URL에는 `NEXT_PUBLIC_KAKAO_MAP_APP_KEY` 환경 변수가 사용되며,
     *   autoload는 false로 설정되어 있습니다.
     *
     * @returns {Promise<void>} Kakao SDK 로드가 완료되었을 때 resolve됩니다.
     */
    const loadKakaoScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        const scriptId = 'kakao-map-script';
        const existingScript = document.getElementById(
          scriptId,
        ) as HTMLScriptElement | null;

        // 이미 로드된 경우
        if (existingScript) {
          if (window.kakao?.maps) {
            resolve();
          } else {
            // 아직 완전히 로드되지 않았다면 이벤트 리스너로 기다림
            existingScript.addEventListener('load', () => resolve());
            existingScript.addEventListener('error', () =>
              reject(new Error('카카오 스크립트 로드 실패')),
            );
          }
          return;
        }

        // 처음 로드하는 경우 스크립트 태그 삽입
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&autoload=false&libraries=services`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('카카오 스크립트 로드 실패'));
        document.head.appendChild(script);
      });
    };

    /**
     * Kakao 지도를 초기화하고 오버레이를 렌더링하는 함수입니다.
     *
     * @param {string} targetAddress - 지도에 표시할 주소입니다.
     *
     * - Kakao SDK 로드 후, 주소를 위도/경도 좌표로 변환합니다.
     * - 변환 실패 시 `'address'` 에러 상태를 설정합니다.
     * - 변환 성공 시, 지도 중심을 해당 좌표로 설정하고 level(확대 정도)은 3으로 지정합니다.
     * - `CustomOverlay` 컴포넌트를 문자열로 렌더링하여 지도 위에 커스텀 오버레이로 표시합니다.
     * - 에러가 발생하면 `'map'` 에러로 처리됩니다.
     * - 로딩 완료 시, `isLoading` 상태를 false로 변경합니다.
     */
    const initMap = async (targetAddress: string) => {
      // Kakao SDK 로드
      try {
        await loadKakaoScript();

        // SDK 로드 완료 후 maps API 사용
        window.kakao.maps.load(async () => {
          const coords = await getLatLngByAddress(targetAddress);

          if (!coords) {
            // 주소 좌표 변환 실패 시 에러 처리
            setError('address');
            setFinalAddress(address);
            return;
          }

          // 에러 초기화 및 주소 업데이트
          setError(null);
          setFinalAddress(targetAddress);

          // 지도를 렌더링할 컨테이너 요소 가져오기
          const container = document.getElementById('map');
          if (!container) return;

          // 지도 생성
          const map = new window.kakao.maps.Map(container, {
            center: new window.kakao.maps.LatLng(coords.lat, coords.lng),
            level: 3,
          });

          // 커스텀 오버레이 생성 및 지도에 표시
          const overlay = new window.kakao.maps.CustomOverlay({
            position: new window.kakao.maps.LatLng(coords.lat, coords.lng),
            yAnchor: 1,
            content: renderToString(<CustomOverlay address={targetAddress} />),
          });
          overlay.setMap(map);

          map.relayout();
        });
      } catch {
        // 지도 또는 스크립트 관련 에러 처리
        setError('map');
        setFinalAddress(address);
      } finally {
        // 로딩 종료
        setIsLoading(false);
      }
    };

    // 컴포넌트 마운트 또는 주소 변경 시 지도 초기화
    initMap(address ?? '');
  }, [address]);

  return (
    <div className='flex flex-col gap-8'>
      {/* 지도 상단에 표시되는 주소 */}
      <h3 className='font-size-14 text-base font-semibold text-gray-700'>
        {finalAddress}
      </h3>

      {/* 로딩 중일 때 Skeleton UI */}
      {isLoading ? (
        <div
          className={cn(
            'h-300 w-full animate-pulse rounded-3xl border-none bg-gray-100',
            className,
          )}
        />
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
        <div id='map' className={cn('h-300 w-full rounded-3xl', className)} />
      )}
    </div>
  );
}
