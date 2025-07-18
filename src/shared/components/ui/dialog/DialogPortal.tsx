'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface DialogPortalProps {
  /** Portal을 통해 document.body에 렌더링될 자식 요소들 */
  children: ReactNode;
  isOpen: boolean;
}

/**
 * Dialog Portal 컴포넌트 (BottomSheetPortal과 동일한 구조)
 *
 * - SSR 환경에서 document 객체 부재로 인한 에러 방지
 * - 클라이언트에서 마운트 완료 후에만 포털 생성
 * - mounted 상태로 hydration mismatch 방지
 */
export function DialogPortal({ children, isOpen }: DialogPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(children, document.body);
}
