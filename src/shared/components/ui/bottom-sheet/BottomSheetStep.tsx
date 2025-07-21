'use client';

import { ReactNode } from 'react';

interface BottomSheetStepProps {
  /** 해당 스텝에서 렌더링할 컨텐츠 */
  children: ReactNode;
}

/**
 * 다중 스텝 BottomSheet에서 개별 스텝을 정의하는 구조적 컴포넌트
 *
 * **구조적 역할:**
 * - BottomSheetContent의 Children.toArray()에서 개별 요소로 인식
 * - 각 Step이 하나의 스텝 단위로 처리됨
 * - currentStep 인덱스로 해당 Step 선택하여 렌더링
 *
 * **사용 필요성:**
 * - 명시적 스텝 구분: "이것이 하나의 스텝"임을 선언
 * - 배열 인덱싱: Content에서 childrenArray[currentStep]로 접근
 * - 애니메이션 키: React key로 스텝 전환 애니메이션 트리거
 *
 * **사용 예시:**
 * ```tsx
 * <BottomSheet.Content hasMultiStep>
 *   <BottomSheet.Step>첫 번째 스텝</BottomSheet.Step>
 *   <BottomSheet.Step>두 번째 스텝</BottomSheet.Step>
 * </BottomSheet.Content>
 * ```
 */
export function BottomSheetStep({ children }: BottomSheetStepProps) {
  return <div>{children}</div>;
}
