'use client';

import { ReactNode } from 'react';

import { useDialogStore } from '@/shared/store/dialog.store';

import { useDialogContext } from './Root';

/**
 * Dialog 오버레이 컴포넌트
 *
 * 모달 배경에 어두운 오버레이를 렌더링하여 콘텐츠를 강조하고
 * 클릭 시 모달을 닫는 기능을 제공합니다.
 *
 * **주요 기능:**
 * - 반투명 배경 오버레이 (검은색 50% 투명도)
 * - 백드롭 블러 효과 적용
 * - 오버레이 클릭 시 모달 닫기 (백드롭 클릭)
 * - 전체 화면을 덮는 고정 위치 스타일
 *
 * **스타일 특징:**
 * - `fixed inset-0`: 전체 뷰포트를 덮음
 * - `bg-black/50`: 검은색 50% 투명도
 * - `backdrop-blur-md`: 배경 블러 효과
 *
 * **UX 고려사항:**
 * - 백드롭 클릭으로 모달을 닫을 수 있어 사용자 경험을 개선
 * - 모달 콘텐츠와 배경을 명확히 구분하여 집중도 향상
 *
 * @returns {JSX.Element} 오버레이 div 요소
 *
 * @example
 * ```tsx
 * // DialogContent 내부에서 자동으로 렌더링됩니다
 * <DialogPortal>
 *   <DialogOverlay />
 *     <div className="modal-content">
 *   </div>
 * </DialogPortal>
 * ```
 *
 * @internal 이 컴포넌트는 Dialog 시스템 내부에서만 사용되며 직접 사용하지 마세요.
 */
export function DialogOverlay({ children }: { children: ReactNode }) {
  const { modalId } = useDialogContext();
  const { close } = useDialogStore();

  /**
   * 오버레이 클릭 핸들러 (백드롭 클릭)
   * 사용자가 모달 외부 영역을 클릭했을 때 모달을 닫습니다.
   */
  const handleOverlayClick = () => {
    close(modalId);
  };

  return (
    <div
      className='fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-md'
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  );
}
