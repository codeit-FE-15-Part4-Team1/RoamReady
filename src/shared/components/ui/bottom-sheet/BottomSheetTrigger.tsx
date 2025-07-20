'use client';

import {
  cloneElement,
  isValidElement,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react';

import { useBottomSheet } from './BottomSheetContext';

/**
 * BottomSheet를 열기 위한 트리거 래퍼 컴포넌트
 *
 * **동작 원리:**
 * - 전달받은 자식 컴포넌트를 cloneElement로 복제
 * - 기존 onClick 이벤트를 보존하면서 BottomSheet 열기 기능 추가
 * - onClick 실행 순서: BottomSheet 열기 → 기존 onClick 실행
 *
 * **타입 안전성:**
 * - isValidElement로 유효한 React 엘리먼트인지 검증
 * - 유효하지 않은 경우 Fragment로 감싸서 안전하게 렌더링
 *
 * **사용 예시:**
 * ```tsx
 * <BottomSheet.Trigger>
 *   <Button onClick={customHandler}>열기</Button>
 * </BottomSheet.Trigger>
 * ```
 * → 클릭 시: BottomSheet 열림 + customHandler 실행
 */
export function BottomSheetTrigger({ children }: { children: ReactNode }) {
  const { onOpenChange } = useBottomSheet();

  // 유효한 React 엘리먼트가 아닌 경우 그대로 반환
  if (!isValidElement(children)) return <>{children}</>;

  const triggerElement = children as ReactElement<{
    onClick?: MouseEventHandler<HTMLElement>;
  }>;

  // 기존 props를 유지하면서 onClick 이벤트 조합
  return cloneElement(triggerElement, {
    onClick: (event) => {
      // 1. BottomSheet 열기 (우선 실행)
      onOpenChange(true);
      // 2. 기존 onClick 이벤트 실행 (옵셔널)
      triggerElement.props.onClick?.(event);
    },
  });
}
