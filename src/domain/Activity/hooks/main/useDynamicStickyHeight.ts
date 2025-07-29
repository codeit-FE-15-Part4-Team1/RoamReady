import { useEffect, useLayoutEffect, useState } from 'react';

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

  const calculateDimensions = () => {
    // 헤더 높이 계산
    let headerHeight = 0;
    if (headerRef?.current) {
      headerHeight = headerRef.current.getBoundingClientRect().height;
    } else {
      // 헤더가 없다면 기본 헤더 높이 추정 (일반적으로 64-80px)
      const headerElement = document.querySelector('header');
      headerHeight = headerElement?.getBoundingClientRect().height || 72;
    }

    // sticky top 계산: 헤더 높이 + 추가 오프셋
    const stickyTop = headerHeight + additionalOffset;

    // 사용 가능한 높이 계산: 전체 viewport - 헤더 - 오프셋 - 하단 여백
    const calculatedHeight = window.innerHeight - stickyTop - bottomMargin;

    setDimensions({
      stickyTop,
      calculatedHeight: Math.max(calculatedHeight, 300), // 최소 높이 300px 보장
      topValue: `${stickyTop}px`,
      heightValue: `${Math.max(calculatedHeight, 300)}px`,
    });
  };

  // 초기 계산 및 resize 이벤트 리스너
  useLayoutEffect(() => {
    calculateDimensions();

    const handleResize = () => {
      calculateDimensions();
    };

    window.addEventListener('resize', handleResize);

    // ResizeObserver로 헤더 크기 변화도 감지
    let resizeObserver: ResizeObserver | null = null;

    if (headerRef?.current) {
      resizeObserver = new ResizeObserver(() => {
        calculateDimensions();
      });
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver?.disconnect();
    };
  }, [headerRef, additionalOffset, bottomMargin]);

  // 헤더 ref가 변경될 때마다 재계산
  useEffect(() => {
    if (headerRef?.current) {
      calculateDimensions();
    }
  }, [headerRef?.current]);

  return dimensions;
}
