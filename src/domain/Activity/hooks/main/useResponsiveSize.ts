import { useEffect, useLayoutEffect, useState } from 'react';

/**
 * 화면 크기에 따라 적절한 페이지 사이즈를 반환하는 훅
 * 2xl: 14개 (7*2), xl: 12개 (6*2), lg: 10개 (5*2), md: 8개 (4*2), sm: 4개 (2*2)
 */
export function useResponsiveSize(): number {
  const [size, setSize] = useState<number>(8); // SSR 호환을 위한 데스크톱 기본값
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 화면 페인트 이전에 화면 크기 업데이트를 통해 깜빡임 방지
  useLayoutEffect(() => {
    if (!mounted) return;

    function updateSize() {
      if (window.matchMedia('(min-width: 1536px)').matches) {
        // 2xl: 7열 * 2줄
        setSize(14);
      } else if (window.matchMedia('(min-width: 1280px)').matches) {
        // xl: 6열 * 2줄
        setSize(12);
      } else if (window.matchMedia('(min-width: 1024px)').matches) {
        // lg: 5열 * 2줄
        setSize(10);
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        // md: 4열 * 2줄
        setSize(8);
      } else if (window.matchMedia('(min-width: 640px)').matches) {
        // sm: 2열 * 2줄
        setSize(4);
      } else {
        // mobile: 1열 * 2줄
        setSize(2);
      }
    }

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [mounted]);

  return size;
}
