'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useDialogStore } from '@/shared/store/dialog.store';

import { useDialogContext } from './Root';

/**
 * DialogPortal 컴포넌트의 Props 타입
 */
interface DialogPortalProps {
  /** Portal을 통해 document.body에 렌더링될 자식 요소들 */
  children: ReactNode;
}

/**
 * Dialog 포털 컴포넌트
 *
 * React Portal을 사용하여 Dialog 컴포넌트를 document.body에 직접 렌더링합니다.
 * 이를 통해 z-index 문제를 해결하고 모달이 항상 최상위에 표시되도록 보장합니다.
 *
 * **주요 기능:**
 * - React Portal을 통한 DOM 트리 외부 렌더링
 * - 모달 열림/닫힘 상태에 따른 조건부 렌더링
 * - 배경 스크롤 방지 (body position: fixed 적용)
 * - 스크롤 위치 보존 및 복원
 * - SSR 호환성 (mounted 상태 관리)
 *
 * **스크롤 관리:**
 * - 모달이 열릴 때: 현재 스크롤 위치를 저장하고 body를 고정
 * - 모달이 닫힐 때: body 고정을 해제하고 원래 스크롤 위치로 복원
 * - 컴포넌트 언마운트 시: 스크롤 상태를 안전하게 정리
 *
 * @param props - DialogPortal 컴포넌트의 props
 * @param props.children - Portal을 통해 렌더링될 Dialog 콘텐츠
 *
 * @returns {ReactPortal | null} Portal로 렌더링된 children 또는 null
 *
 * @example
 * ```tsx
 * // 직접 사용하지 않고 DialogContent 내부에서 자동으로 사용됩니다
 * <DialogPortal>
 *   <div className="modal-overlay">
 *     <div className="modal-content">
 *       Modal Content
 *     </div>
 *   </div>
 * </DialogPortal>
 * ```
 *
 * @internal 이 컴포넌트는 Dialog 시스템 내부에서만 사용되며 직접 사용하지 마세요.
 */
export function DialogPortal({ children }: DialogPortalProps) {
  const { modalId } = useDialogContext();
  const { isOpen } = useDialogStore();
  const [mounted, setMounted] = useState(false);

  /**
   * 컴포넌트 마운트 상태를 관리합니다.
   * SSR 환경에서 hydration mismatch를 방지하기 위해 필요합니다.
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * 모달 상태에 따른 스크롤 제어
   *
   * 모달이 열려있을 때 배경 스크롤을 방지하고,
   * 닫힐 때 원래 스크롤 위치를 복원합니다.
   *
   * **동작 순서:**
   * 1. 모달 열림: 현재 스크롤 위치(scrollY) 저장
   * 2. body를 position: fixed로 고정하고 top: -scrollY로 설정
   * 3. 모달 닫힘: body 스타일 초기화 후 저장된 위치로 스크롤
   * 4. cleanup: 컴포넌트 언마운트 시 안전하게 정리
   */
  useEffect(() => {
    if (!mounted) return;

    const isModalOpen = isOpen(modalId);

    if (isModalOpen) {
      // 현재 스크롤 위치 저장 후 body 고정
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // 스크롤 위치 복원
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      // 컴포넌트 언마운트 시 정리
      if (isModalOpen) {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
      }
    };
  }, [mounted, isOpen(modalId), modalId]);

  // 모달이 닫혀있거나 아직 마운트되지 않은 경우 렌더링하지 않음
  if (!isOpen(modalId) || !mounted) return null;

  // document.body에 Portal을 통해 children 렌더링
  return createPortal(children, document.body);
}
