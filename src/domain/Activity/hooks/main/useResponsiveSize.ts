import { useEffect, useState } from 'react';

/**
 * 화면 크기에 따라 적절한 페이지 사이즈를 반환하는 훅
 * 2xl: 17개, xl: 12개, lg: 10개, md 이하: 8개
 */
export function useResponsiveSize(): number {
  const [size, setSize] = useState<number>(8); // 기본값은 모바일 사이즈

  useEffect(() => {
    function updateSize() {
      if (window.matchMedia('(min-width: 1536px)').matches) {
        // 2xl
        setSize(14);
      } else if (window.matchMedia('(min-width: 1280px)').matches) {
        // xl
        setSize(12);
      } else if (window.matchMedia('(min-width: 1024px)').matches) {
        // lg
        setSize(10);
      } else {
        // md 이하
        setSize(8);
      }
    }

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}
