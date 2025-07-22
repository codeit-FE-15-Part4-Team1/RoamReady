'use client';

import { ReactNode, useState } from 'react';

import { BottomSheetContext } from './BottomSheetContext';

/**
 * **`BottomSheet.Root`의 파라미터로 전달받는 인수들의 인터페이스**
 *
 * 제어 모드 관련 상태 및 상태 변경 함수와 `children`을 포함합니다.
 */
interface BottomSheetRootProps {
  /** 제어 모드에서 외부에서 `BottomSheet`가 열렸는지 확인하는 상태 (`undefined`면 비제어 모드) */
  open?: boolean;
  /** **상태 변경 시 호출되는 콜백**
   *
   * - 제어 모드: `BottomSheet.Root`에 `open` 상태 변경 함수를 전달받습니다.
   * - 비제어 모드: `BottomSheet.Content` 내부적으로 사용됩니다.
   */
  onOpenChange?: (open: boolean) => void;
  /** BottomSheet 내부 자식 컴포넌트들 */
  children: ReactNode;
}

/**
 * BottomSheet 최상위 컨테이너 및 Context Provider
 *
 * **제어/비제어 패턴:**
 * - open prop 제공 시: 제어 모드 (외부 상태 우선)
 * - open prop 없을 시: 비제어 모드 (내부 상태 사용)
 *
 * **다중 스텝 관리:**
 * - Content에서 setTotalSteps로 스텝 수 동적 설정
 * - 닫힐 때 300ms 후 currentStep 초기화 (애니메이션 완료 대기)
 * - 스텝 이동 시 경계값 검사로 범위 보장
 */
export function BottomSheetRoot({
  open,
  onOpenChange,
  children,
}: BottomSheetRootProps) {
  // 비제어 모드에서 사용되는 열림/닫힘 상태
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  // 다중 스텝 여부 확인 및 다중 스텝 모드에서 현재 스텝을 확인하는데 사용되는 상태
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  /**
   * - `open` prop 존재 여부로 제어/비제어 모드를 결정합니다
   *
   * - BottomSheetRoot에서 `open` prop을 전달 받았다면 제어 모드로 만듭니다. (`isControlled === true`)
   *
   * - 이 값은 `handleOpenChange`에서 사용됩니다.
   */
  const isControlled = open !== undefined;

  /**
   * - 제어 모드(`isControlled === true`)에서 `open` prop을 열림/닫힘 상태 값으로 사용합니다.
   *
   * - `open` prop을 전달받지 않은 경우에는 `uncontrolledOpen` 상태를 사용합니다.
   *
   * - 이때 제어/비제어 모드 모두 닫힘 상태(`false`)로 초기화됩니다.
   */
  const isOpen = isControlled ? open : uncontrolledOpen;

  /**
   * **`BottomSheet` 컴포넌트 전역에서 사용하는 BottomSheet 열림/닫힘 핸들러**
   *
   * - 이 핸들러는 `BottomSheetContext`의 `onOpenChange`의 구현체로 사용됩니다.
   * - 열림/닫힘 상태를 `boolean` 값으로 전달받아 상태 변경을 수행합니다.
   *
   * @param newOpen - 열림/닫힘을 제어하는 `boolean` 값
   */
  const handleOpenChange = (newOpen: boolean) => {
    // 비제어 모드에서는 `setUncontrolledOpen` 호출
    if (!isControlled) setUncontrolledOpen(newOpen);

    // 제어 모드에서는 외부 콜백 호출
    // `onOpenChange`가 정의되어 있을 때만 호출
    if (isControlled) onOpenChange?.(newOpen);

    // 닫힐 때(`newOpen === false`) 스텝 초기화
    // 애니메이션 완료 후 상태 변경을 해주기 위해 딜레이를 겁니다.
    if (!newOpen) {
      setTimeout(() => setCurrentStep(0), 300);
    }
  };

  // 스텝 네비게이션 (경계값 체크로 안전성 보장)

  /**
   * 다음 스텝으로 이동하는 함수
   *
   * - `setCurrentStep` 함수를 이용하여 현재 스텝을 업데이트 합니다.
   * - 현재 스텝은 `이전 스텝 + 1`, `최대 스텝 - 1` 중 더 작은 값으로 업데이트 됩니다. (값 클램핑)
   */
  const goToNextStep = () =>
    setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps - 1));

  /**
   * 이전 스텝으로 이동하는 함수
   *
   * - `setCurrentStep` 함수를 이용하여 현재 스텝을 업데이트 합니다.
   * - 현재 스텝은 `이전 스텝 - 1`, `0` 중 더 큰 값으로 업데이트 됩니다.
   */
  const goToPrevStep = () =>
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));

  // BottomSheetContext Provider에 사용할 값을 객체로 묶습니다.
  const value = {
    isOpen,
    onOpenChange: handleOpenChange,
    currentStep,
    totalSteps,
    setTotalSteps,
    goToNextStep,
    goToPrevStep,
  };

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
    </BottomSheetContext.Provider>
  );
}
