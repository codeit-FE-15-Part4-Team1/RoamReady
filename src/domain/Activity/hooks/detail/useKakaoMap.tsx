'use client';

import { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';

import MapMarker from '../../components/detail/kakao-map/MapMarker';
import { getLatLngByAddress } from '../../libs/detail/getLatLngByAddress';

interface UseKakaoMapResult {
  isLoading: boolean;
  error: 'map' | 'address' | null;
  finalAddress: string;
}

const KAKAO_MAP_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&autoload=false&libraries=services`;

export const useKakaoMap = (address: string): UseKakaoMapResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<'map' | 'address' | null>(null);
  const [finalAddress, setFinalAddress] = useState(address);

  useEffect(() => {
    // 환경 변수 존재 여부 검사
    if (!process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY) {
      console.warn(
        '[KakaoMap] NEXT_PUBLIC_KAKAO_MAP_APP_KEY가 정의되지 않았습니다. env 파일을 확인해주세요.',
      );
      setError('map');
      setIsLoading(false);
      return;
    }

    // 언마운트 감지를 위한 플래그 및 이벤트 리스너 추적 배열 추가
    let isCleanedUp = false;
    const listeners: Array<{
      element: HTMLElement;
      event: string;
      handler: EventListener;
    }> = [];

    /**
     * Kakao Map SDK를 비동기적으로 로드하는 함수입니다.
     *
     * - 이미 스크립트가 로드되어 있다면, 즉시 resolve됩니다.
     * - 아직 로드되지 않았다면 script 태그를 동적으로 삽입하고,
     *   'load' 이벤트가 발생하면 resolve, 'error' 발생 시 reject 합니다.
     * - SDK URL에는 NEXT_PUBLIC_KAKAO_MAP_APP_KEY 환경 변수가 사용되며,
     *   autoload는 false로 설정되어 있습니다.
     *
     * @returns {Promise<void>} Kakao SDK 로드가 완료되었을 때 resolve됩니다.
     */
    const loadKakaoScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        // 언마운트된 경우 무시
        if (isCleanedUp)
          return reject(new Error('해당 컴포넌트가 언마운트 되었습니다.'));

        const SCRIPT_ID = 'kakao-map-script';
        const existingScript = document.getElementById(
          SCRIPT_ID,
        ) as HTMLScriptElement | null;

        // 이미 로드된 경우
        if (existingScript) {
          if (window.kakao?.maps) {
            resolve();
          } else {
            // 리스너 정의 및 배열에 저장
            const loadHandler = () => resolve();
            const errorHandler = () =>
              reject(new Error('카카오 스크립트 로드 실패'));

            // Kakao Maps가 아직 로드되지 않은 경우, load/error 이벤트 리스너를 등록하여 로딩 상태를 비동기적으로 감지함
            existingScript.addEventListener('load', loadHandler);
            existingScript.addEventListener('error', errorHandler);
            listeners.push(
              { element: existingScript, event: 'load', handler: loadHandler },
              {
                element: existingScript,
                event: 'error',
                handler: errorHandler,
              },
            );
          }
          return;
        }

        // 처음 로드하는 경우 스크립트 태그 삽입
        const script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.src = KAKAO_MAP_SDK_URL;
        script.async = true;

        // 새로 삽입한 script에도 이벤트 리스너 등록
        const loadHandler = () => resolve();
        const errorHandler = () =>
          reject(new Error('카카오 스크립트 로드 실패'));
        script.addEventListener('load', loadHandler);
        script.addEventListener('error', errorHandler);
        listeners.push(
          { element: script, event: 'load', handler: loadHandler },
          { element: script, event: 'error', handler: errorHandler },
        );

        document.head.appendChild(script);
      });
    };

    /**
     * Kakao 지도를 초기화하고 오버레이를 렌더링하는 함수입니다.
     *
     * @param {string} targetAddress - 지도에 표시할 주소입니다.
     *
     * - Kakao SDK 로드 후, 주소를 위도/경도 좌표로 변환합니다.
     * - 변환 실패 시 'address' 에러 상태를 설정합니다.
     * - 변환 성공 시, 지도 중심을 해당 좌표로 설정하고 level(확대 정도)은 3으로 지정합니다.
     * - CustomOverlay 컴포넌트를 문자열로 렌더링하여 지도 위에 커스텀 오버레이로 표시합니다.
     * - 에러가 발생하면 'map' 에러로 처리됩니다.
     * - 로딩 완료 시, isLoading 상태를 false로 변경합니다.
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
          const container = document.getElementById('kakao-map');
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
            content: renderToString(<MapMarker address={targetAddress} />),
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

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => {
      isCleanedUp = true;
      listeners.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler);
      });
    };
  }, [address]);

  return { isLoading, error, finalAddress };
};
