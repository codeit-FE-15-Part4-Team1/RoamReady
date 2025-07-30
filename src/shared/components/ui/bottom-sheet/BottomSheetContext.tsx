'use client';

import { createContext, Dispatch, SetStateAction, useContext } from 'react';

/**
 * **BottomSheet Context 값 인터페이스**
 *
 * 열림 상태, 열림 상태 변경 함수, 스텝 관련 상태 및 함수를 포함합니다.
 *
 */
interface BottomSheetContextValues {
  /** 현재 BottomSheet 열림/닫힘 상태 */
  isOpen: boolean;
  /** BottomSheet 상태 변경 함수 (제어/비제어 모드 모두 처리) */
  onOpenChange: (open: boolean) => void;
  /** 현재 활성 스텝 인덱스 (0부터 시작) */
  currentStep: number;
  /** 전체 스텝 개수 (0이면 단일 모드) */
  totalSteps: number;
  /** Content에서 자식 수를 기반으로 총 스텝 수 설정 */
  setTotalSteps: Dispatch<SetStateAction<number>>;
  /** 다음 스텝으로 이동 */
  goToNextStep: () => void;
  /** 이전 스텝으로 이동 */
  goToPrevStep: () => void;
}

/**
 * **BottomSheet 컴포넌트 트리 전체에서 공유되는 상태 컨텍스트**
 * - `BottomSheetRoot`에서 Provider로 값 제공
 * - 하위 컴포넌트에서 `useBottomSheet`로 접근
 */
export const BottomSheetContext =
  createContext<BottomSheetContextValues | null>(null);

/**
 * **BottomSheetContext의 값을 사용하는 커스텀 훅**
 * - `BottomSheet` 내부 컴포넌트만 사용 가능
 * @throws {Error} BottomSheet.Root 외부에서 호출 시 에러를 발생시킵니다.
 */
export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet는 BottomSheet 내부에서만 사용해야 합니다.');
  }
  return context;
};
