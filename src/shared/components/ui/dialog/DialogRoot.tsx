'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

/**
 * Dialog 푸터 변형 타입
 */
type DialogVariant = 'complete' | 'cancel' | 'review';

/**
 * Dialog 컨텍스트의 값 타입
 *
 * Dialog 컴포넌트 트리 내에서 공유되는 데이터를 정의합니다.
 *
 */
interface DialogContextValue {
  /** Dialog가 열려있는지 여부 */
  isOpen: boolean;
  /** Dialog를 여는 함수 */
  open: () => void;
  /** Dialog를 닫는 함수 */
  close: () => void;
  /** 비동기 작업 로딩 상태 */
  loading: boolean;
  /** 현재 로딩 중인 버튼의 인덱스 (-1은 로딩 중인 버튼 없음) */
  loadingButtonIndex: number;
  /** Dialog variant */
  variant: DialogVariant | null;
  /** 로딩 상태 설정 함수 */
  setLoading: (loading: boolean) => void;
  /** 로딩 중인 버튼 인덱스 설정 함수 */
  setLoadingButtonIndex: (index: number) => void;
  /** variant 설정 함수 */
  setVariant: (variant: DialogVariant) => void;
}

/**
 * Dialog 컨텍스트
 *
 * Dialog.Root에서 제공되고 하위 컴포넌트들에서 소비됩니다.
 *
 */
const DialogContext = createContext<DialogContextValue | null>(null);

/**
 * Dialog 컨텍스트를 사용하는 커스텀 훅
 *
 * @throws {Error} Dialog.Root 외부에서 사용될 경우 에러를 발생시킵니다.
 * @returns {DialogContextValue} Dialog 컨텍스트 값 (isOpen, open, close, loading 등 포함)
 *
 * @example
 * ```tsx
 * function MyDialogComponent() {
 *   const { isOpen, open, close, loading } = useDialogContext();
 *   // 상태 및 함수들 사용...
 * }
 * ```
 */
export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog 컴포넌트는 <Dialog.Root> 안에서 사용해야 합니다.');
  }
  return context;
};

/**
 * DialogRoot 컴포넌트의 Props 타입
 */
interface DialogRootProps {
  /** Dialog 내부에 렌더링될 자식 요소들 */
  children: ReactNode;
  /**
   * 페이지 로드 시 Dialog의 초기 열림 상태 (선택사항)
   * 기본값은 false입니다.
   *
   * @default false
   */
  defaultOpen?: boolean;
}

/**
 * Dialog 컴포넌트 트리의 최상위에 위치하여 하위 컴포넌트들이 공통된 상태와 함수들을 공유할 수 있도록 합니다.
 *
 * **주요 기능:**
 * - isOpen 상태 관리 (useState 사용)
 * - open, close 함수 제공
 * - loading 상태 관리 (비동기 작업 지원)
 * - 컨텍스트를 통한 상태 공유
 *
 * @param props - DialogRoot 컴포넌트의 props
 * @param props.children - Dialog 내부에 렌더링될 컴포넌트들
 * @param props.defaultOpen - Dialog의 초기 열림 상태 (optional, default: false)
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <Dialog.Root>
 *   <Dialog.Trigger>
 *     <button>Dialog 열기</button>
 *   </Dialog.Trigger>
 *   <Dialog.Content variant="complete">
 *     <MyDialogContent />
 *   </Dialog.Content>
 * </Dialog.Root>
 *
 * // 기본값으로 열림
 * <Dialog.Root defaultOpen={true}>
 *   <Dialog.Trigger>
 *     <button>이미 열린 Dialog</button>
 *   </Dialog.Trigger>
 *   <Dialog.Content variant="review">
 *     <ReviewForm />
 *   </Dialog.Content>
 * </Dialog.Root>
 * ```
 */
export function DialogRoot({ children, defaultOpen = false }: DialogRootProps) {
  // Dialog 기본 상태 관리
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // 비동기 작업 상태 관리
  const [loading, setLoading] = useState(false);
  const [loadingButtonIndex, setLoadingButtonIndex] = useState(-1);
  const [variant, setVariant] = useState<DialogVariant | null>(null);

  // Dialog 액션 함수들
  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setLoading(false); // Dialog 닫을 때 로딩 초기화
    setLoadingButtonIndex(-1); // Dialog 닫을 때 로딩 버튼 인덱스 초기화
  };

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        open,
        close,
        loading,
        loadingButtonIndex,
        variant,
        setLoading,
        setLoadingButtonIndex,
        setVariant,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
