'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

import ToastContainer from '@/shared/components/ui/toast/ToastContainer';
import { queryClient } from '@/shared/libs/queryClient';

/**
 * @component ClientProviders
 * @description
 * 클라이언트 측에서 필요한 전역 프로바이더들을 통합하여 제공하는 컴포넌트입니다.
 * 이 컴포넌트는 Tanstack Query의 `QueryClientProvider`를 설정하여 애플리케이션 전반에서 데이터 페칭 및 캐싱을 관리하고,
 * 전역 토스트 알림을 위한 `ToastContainer`를 렌더링합니다.
 *
 * 이 컴포넌트는 Next.js의 'use client' 지시어가 적용되어 클라이언트 사이드에서만 동작하며,
 * 애플리케이션의 루트 레이아웃에서 사용되어야 합니다.
 *
 * @param {ClientProvidersProps} props - 컴포넌트의 props입니다.
 * @param {ReactNode} props.children - 이 프로바이더 내부에 렌더링될 자식 요소입니다.
 *
 * @returns {JSX.Element} QueryClientProvider와 ToastContainer로 래핑된 자식 요소 React 요소입니다.
 */
export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer />
    </QueryClientProvider>
  );
}
