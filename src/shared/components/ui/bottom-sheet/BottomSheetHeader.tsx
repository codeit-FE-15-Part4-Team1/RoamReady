'use client';

import { ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';

import { useBottomSheet } from './BottomSheetContext';

/**
 * BottomSheet의 헤더 영역 및 네비게이션 제어
 *
 * **뒤로가기 버튼 조건부 렌더링:**
 * - currentStep > 0인 경우에만 뒤로가기 버튼 표시
 * - 첫 번째 스텝(인덱스 0)에서는 뒤로가기 숨김
 * - 단일 모드에서는 currentStep이 항상 0이므로 버튼 없음
 *
 * @example
 * ```tsx
 * <BottomSheet.Header>
 *   <span>스텝 {currentStep + 1}</span>
 * </BottomSheet.Header>
 * ```
 */
export function BottomSheetHeader({ children }: { children: ReactNode }) {
  const { goToPrevStep, currentStep } = useBottomSheet();

  return (
    <div className='font-size-18 tablet:font-size-20 tablet:mb-24 mb-8 flex items-center gap-8 font-bold'>
      {/* 첫 번째 스텝이 아닌 경우에만 뒤로가기 버튼 표시 */}
      {currentStep > 0 && (
        <button onClick={goToPrevStep} className='cursor-pointer'>
          <ArrowLeft />
        </button>
      )}
      {children}
    </div>
  );
}
