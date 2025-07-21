'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface BottomSheetPortalProps {
  /** document.body에 포털로 렌더링할 컴포넌트들 */
  children: ReactNode;
}

/**
 * **`BottomSheet`를 `document.body`에 `Portal`로 렌더링하는 래퍼**
 *
 * **SSR 대응을 다음과 같이 처리합니다:**
 * - 서버 렌더링 시 document 객체 부재로 인한 에러 방지
 * - 클라이언트에서 마운트 완료 후에만 포털 생성
 * - mounted 상태로 hydration mismatch 방지
 */
export function BottomSheetPortal({ children }: BottomSheetPortalProps) {
  const [mounted, setMounted] = useState(false);

  // 컴포넌트 마운트 후 포털 활성화
  useEffect(() => {
    setMounted(true);
  }, []);

  // 서버 렌더링 중이거나 아직 마운트되지 않은 경우 null 반환
  if (!mounted) return null;

  // 클라이언트에서 document.body에 포털로 렌더링
  return createPortal(children, document.body);
}
