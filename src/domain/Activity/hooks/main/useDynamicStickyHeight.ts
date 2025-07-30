import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

interface DynamicStickyHeightProps {
  /** 헤더 요소의 ref */
  headerRef?: React.RefObject<HTMLElement>;
  /** 추가 오프셋 (기본값: 24px) */
  additionalOffset?: number;
  /** 하단 여백 (기본값: 24px) */
  bottomMargin?: number;
}

interface StickyDimensions {
  /** sticky top 값 */
  stickyTop: number;
  /** 계산된 높이 */
  calculatedHeight: number;
  /** CSS top 값 (px 단위 포함) */
  topValue: string;
  /** CSS height 값 */
  heightValue: string;
}

/**
 * viewport와 실제 DOM 요소들의 크기를 기반으로 sticky 요소의 높이를 동적으로 계산하는 훅
 */
export function useDynamicStickyHeight({
  headerRef,
  additionalOffset = 24,
  bottomMargin = 24,
}: DynamicStickyHeightProps = {}): StickyDimensions {
  const [dimensions, setDimensions] = useState<StickyDimensions>({
    stickyTop: 120,
    calculatedHeight: window.innerHeight - 200,
    topValue: '120px',
    heightValue: 'calc(100dvh - 200px)',
  });

  const calculateDimensions = useCallback(() => {
    // 헤더 높이 계산
    let headerHeight = 0;
    if (headerRef?.current) {
      headerHeight = headerRef.current.offsetHeight;
    }

    // viewport 높이
    const viewportHeight = window.innerHeight;
    const newStickyTop = headerHeight + additionalOffset;
    const newCalculatedHeight = viewportHeight - newStickyTop - bottomMargin;

    setDimensions({
      stickyTop: newStickyTop,
      calculatedHeight: newCalculatedHeight,
      topValue: `${newStickyTop}px`,
      heightValue: `${newCalculatedHeight}px`,
    });
  }, [headerRef, additionalOffset, bottomMargin]);

  // 초기 계산 및 Resize Observer 설정
  useLayoutEffect(() => {
    calculateDimensions();

    const handleResize = () => {
      calculateDimensions();
    };

    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      calculateDimensions();
    });

    if (headerRef?.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver?.disconnect();
    };
  }, [calculateDimensions, headerRef]);

  // 헤더 ref가 변경될 때마다 재계산
  useEffect(() => {
    if (headerRef?.current) {
      calculateDimensions();
    }
  }, [calculateDimensions, headerRef]);

  return dimensions;
}
