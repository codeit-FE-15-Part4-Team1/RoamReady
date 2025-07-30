import { useEffect, useState } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'wide';

/**
 * 현재 화면 크기에 따른 브레이크포인트를 반환하는 훅
 */
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('mobile');

  useEffect(() => {
    function updateBreakpoint() {
      if (window.matchMedia('(min-width: 1600px)').matches) {
        setBreakpoint('wide');
      } else if (window.matchMedia('(min-width: 1280px)').matches) {
        setBreakpoint('desktop');
      } else if (window.matchMedia('(min-width: 950px)').matches) {
        setBreakpoint('laptop');
      } else if (window.matchMedia('(min-width: 640px)').matches) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('mobile');
      }
    }

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
}
