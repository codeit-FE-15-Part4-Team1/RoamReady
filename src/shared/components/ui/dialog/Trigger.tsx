'use client';

import { ReactNode } from 'react';
import { useDialogStore } from '@/shared/store/dialog.store';
import { useDialogContext } from './Root';

/**
 * DialogTrigger 컴포넌트의 Props 타입
 */
interface DialogTriggerProps {
  /** 트리거로 사용될 자식 요소 (보통 버튼이나 클릭 가능한 요소) */
  children: ReactNode;
}

/**
 * Dialog 트리거 컴포넌트
 *
 * Dialog를 열기 위한 트리거 역할을 하는 컴포넌트입니다.
 * 클릭 시 해당 Dialog를 열도록 하는 이벤트 핸들러를 자동으로 연결합니다.
 *
 * **주요 기능:**
 * - 자동 modalId 바인딩 (컨텍스트에서 가져옴)
 * - 클릭 이벤트 자동 연결
 * - 임의의 자식 요소를 트리거로 사용 가능
 *
 * **접근성 고려사항:**
 * - 자식 요소가 적절한 ARIA 속성을 가지도록 해야 합니다
 * - 키보드 접근이 가능한 요소(button, a 등)를 자식으로 사용하는 것을 권장합니다
 *
 * @param props - DialogTrigger 컴포넌트의 props
 * @param props.children - 트리거로 사용될 자식 요소
 *
 * @example
 * ```tsx
 * <Dialog.Root>
 *   <Dialog.Trigger>
 *     <button className="btn-primary">
 *       설정 열기
 *     </button>
 *   </Dialog.Trigger>
 *
 *   <Dialog.Content variant="complete">
 *     <SettingsPanel />
 *   </Dialog.Content>
 * </Dialog.Root>
 * ```
 *
 * @example
 * ```tsx
 * // 복잡한 트리거 요소도 가능
 * <Dialog.Trigger>
 *   <div className="card clickable">
 *     <img src="profile.jpg" alt="프로필" />
 *     <span>프로필 편집</span>
 *   </div>
 * </Dialog.Trigger>
 * ```
 */
export function DialogTrigger({ children }: DialogTriggerProps) {
  const { modalId } = useDialogContext();
  const { open } = useDialogStore();

  /**
   * 트리거 클릭 핸들러
   * 컨텍스트에서 가져온 modalId를 사용하여 해당 Dialog를 엽니다.
   */
  const handleClick = () => {
    open(modalId);
  };

  return <div onClick={handleClick}>{children}</div>;
}
