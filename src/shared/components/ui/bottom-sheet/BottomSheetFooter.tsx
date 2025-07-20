'use client';

import { cloneElement, MouseEventHandler, ReactElement, useMemo } from 'react';

import { useBottomSheet } from './BottomSheetContext';

/**
 * BottomSheet 하단 버튼 영역 및 스텝별 동작 자동 처리
 *
 * **동작 로직:**
 * - 단일 모드(totalSteps=0): 버튼 클릭 시 BottomSheet 닫기
 * - 다중 스텝 중간: 버튼 클릭 시 다음 스텝으로 이동
 * - 다중 스텝 마지막: 버튼 클릭 시 BottomSheet 닫기
 *
 * **cloneElement 사용 이유:**
 * - 사용자가 전달한 버튼 컴포넌트의 기존 props 유지
 * - 기존 onClick과 새로운 onClick을 조합하여 실행
 * - 버튼의 스타일, 크기, 텍스트 등은 그대로 보존
 *
 * **최적화:**
 * - useMemo로 스텝 상태 계산을 캐싱하여 불필요한 재계산 방지
 */
export function BottomSheetFooter({ children }: { children: ReactElement }) {
  const { onOpenChange, currentStep, totalSteps, goToNextStep } =
    useBottomSheet();

  // 스텝 상태 계산 (useMemo로 최적화)
  const { isLastStep, isSingleView, isMiddleStep } = useMemo(
    () => ({
      isLastStep: currentStep === totalSteps - 1 && totalSteps > 0,
      isSingleView: totalSteps === 0,
      isMiddleStep: totalSteps > 1 && currentStep < totalSteps - 1,
    }),
    [currentStep, totalSteps],
  );

  const buttonElement = children as ReactElement<{
    onClick?: MouseEventHandler;
  }>;

  if (isLastStep || isSingleView) {
    // 마지막 스텝 또는 단일 모드: BottomSheet 닫기
    const button = cloneElement(buttonElement, {
      onClick: (event) => {
        // 기존 onClick 먼저 실행
        buttonElement.props.onClick?.(event);
        // BottomSheet 닫기
        onOpenChange(false);
      },
    });
    return (
      <div className='tablet:pt-40 flex w-full items-center justify-center pt-30'>
        {button}
      </div>
    );
  }

  if (isMiddleStep) {
    // 중간 스텝: 다음 스텝으로 이동
    const button = cloneElement(buttonElement, {
      onClick: (event) => {
        // 기존 onClick 먼저 실행
        buttonElement.props.onClick?.(event);
        // 다음 스텝으로 이동
        goToNextStep();
      },
    });
    return (
      <div className='tablet:pt-40 flex w-full items-center justify-center pt-30'>
        {button}
      </div>
    );
  }

  // 예외 상황: 기본 버튼 렌더링 (동작 추가 없음)
  return (
    <div className='tablet:pt-40 flex w-full items-center justify-center pt-30'>
      {children}
    </div>
  );
}
