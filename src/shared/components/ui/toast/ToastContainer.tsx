'use client';

import { createPortal } from 'react-dom';

import { useRoamReadyStore } from '@/shared/store';

import Toast from './Toast';

/**
 * @description
 * 전역 상태(Zustand)의 모든 토스트를 화면에 렌더링하는 컨테이너 컴포넌트입니다.
 *
 * @feature
 * - React Portal (`createPortal`)을 사용하여 토스트를 DOM 트리의 최상단 (`#portal-root`)에 렌더링합니다.
 * 이를 통해 다른 컴포넌트의 `z-index`나 `overflow` 스타일에 영향을 받지 않고 항상 화면 위에 표시될 수 있습니다.
 * - `useEffect`와 `mounted` 상태를 사용하여 클라이언트 사이드에서만 `document` 객체에 접근하도록 처리합니다.
 * 이는 Next.js의 서버 사이드 렌더링(SSR) 환경에서 발생할 수 있는 'document is not defined' 오류를 방지합니다.
 */
export default function ToastContainer() {
  const toasts = useRoamReadyStore((state) => state.toasts);

  const portalRoot =
    typeof document !== 'undefined'
      ? document.getElementById('portal-root')
      : null;

  if (!portalRoot || !toasts.length) {
    return null;
  }

  return createPortal(
    <div className='fixed top-110 right-10 z-[1000] flex flex-col items-end gap-3'>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>,
    portalRoot,
  );
}
