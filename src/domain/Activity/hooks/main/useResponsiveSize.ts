import { useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
  window.addEventListener('resize', callback);
  return () => {
    window.removeEventListener('resize', callback);
  };
};

const getSnapshot = () => {
  if (typeof window === 'undefined') {
    return 8; // 서버사이드 기본값
  }

  if (window.matchMedia('(min-width: 1536px)').matches) {
    return 14;
  }
  if (window.matchMedia('(min-width: 1280px)').matches) {
    return 12;
  }
  if (window.matchMedia('(min-width: 1024px)').matches) {
    return 10;
  }
  return 8; // md 이하 및 기본값
};

/**
 * 화면 크기에 따라 적절한 페이지 사이즈를 반환하는 훅
 * 2xl: 14개 (7*2), xl: 12개 (6*2), lg: 10개 (5*2), md: 8개 (4*2), sm: 4개 (2*2)
 * useSyncExternalStore를 사용하여 SSR과 클라이언트 간의 불일치를 최소화합니다.
 */
export function useResponsiveSize(): number {
  // 서버에서는 getServerSnapshot을 사용하고, 클라이언트에서는 getSnapshot을 사용합니다.
  // subscribe 함수는 클라이언트에서만 호출됩니다.
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => 8, // getServerSnapshot
  );
}
