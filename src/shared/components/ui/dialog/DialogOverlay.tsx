'use client';

import { KeyboardEvent, ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

import { useDialogContext } from './DialogRoot';

/**
 * Dialog Overlay 컴포넌트
 *
 * Dialog 배경에 어두운 오버레이를 렌더링하여 콘텐츠를 강조하고
 * 클릭 시 Dialog를 닫는 기능을 제공합니다.
 * @internal 이 컴포넌트는 Dialog 내부에서만 사용되며 직접 사용하지 마세요.
 *
 * **주요 기능:**
 * - 반투명 배경 오버레이 (검은색 50% 투명도)
 * - 백드롭 블러 효과 적용
 * - 오버레이 클릭 시 Dialog 닫기 (백드롭 클릭)
 * - 전체 화면을 덮는 fixed 스타일
 * - Context API 기반 상태 관리
 *
 * @example
 * ```tsx
 * // DialogPortal 내부에서 자동으로 렌더링됩니다
 * <DialogPortal>
 *   <DialogOverlay>
 *   <div className="dialog-content">
 *       ...
 *     </div>
 *   </DialogOverlay>
 * </DialogPortal>
 * ```
 *
 * @returns {JSX.Element} 오버레이 div 요소
 */
export function DialogOverlay({ children }: { children: ReactNode }) {
  const { close, loading, variant } = useDialogContext();

  /**
   * 오버레이 클릭 핸들러 (백드롭 클릭)
   * 사용자가 Dialog 외부 영역을 클릭했을 때 Dialog를 닫습니다.
   * 로딩 중일 때나 cancel variant일 때는 백드롭 클릭으로 닫기를 차단합니다.
   */
  const handleOverlayClick = () => {
    // 로딩 중이거나 cancel variant일 때는 백드롭 클릭으로 닫기 차단
    if (loading || variant === 'cancel') {
      return;
    }
    close();
  };

  /**
   * 키보드 이벤트 핸들러
   * 접근성을 위해 Escape 키로 Dialog 닫기 기능 제공
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      // 로딩 중이거나 cancel variant일 때는 Escape 키로 닫기 차단
      if (loading || variant === 'cancel') {
        return;
      }
      close();
    }
  };

  /**
   * variant별 스타일 설정
   * - complete: backdrop 없이 black/50만 적용
   * - cancel, review: backdrop blur 효과 적용
   */
  const overlayStyles = cn(
    'fixed inset-0 z-40 flex items-center justify-center bg-black/50',
    variant === 'complete' || variant === 'review'
      ? '' // backdrop 없음
      : 'backdrop-blur-md', // backdrop blur 효과
  );

  return (
    <div
      className={overlayStyles}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex={0}
      aria-label='Dialog 닫기'
    >
      {children}
    </div>
  );
}
