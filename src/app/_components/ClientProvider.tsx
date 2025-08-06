'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import AuthInitializer from '@/app/_components/AuthInitializer';
import ToastContainer from '@/shared/components/ui/toast/ToastContainer';
import { ERROR_CODES } from '@/shared/constants/routes';
import { queryClient } from '@/shared/libs/queryClient';
import { useRoamReadyStore } from '@/shared/store';

/**
 * @component ClientProvider
 * @description
 * 클라이언트 측에서 필요한 전역 프로바이더들을 통합하여 제공하는 핵심 컴포넌트입니다.
 * 이 컴포넌트는 다음의 세 가지 주요 역할을 수행합니다:
 *
 * 1. **인증 상태 초기화**: 앱이 시작될 때 `<AuthInitializer />`를 통해 실제 서버의 인증 상태와 클라이언트 UI 상태를 동기화하여, "UI는 로그인 상태인데 실제로는 토큰이 만료된" 상태 불일치 문제를 해결합니다.
 * 2. **서버 상태 관리**: Tanstack Query의 `QueryClientProvider`를 설정하여 애플리케이션 전반에서 데이터 페칭 및 캐싱을 관리합니다.
 * 3. **세션 만료 시 클라이언트 상태 초기화**
 *    - URL에 `?error=SESSION_EXPIRED` 쿼리 파라미터가 존재하면, 클라이언트 전역 상태(`Zustand`)에서 사용자 정보를 초기화합니다.
 *    - 이는 미들웨어 또는 API 응답에서 세션 만료로 리디렉션된 경우를 처리하기 위한 UX 방어로직입니다.
 * 4. **전역 알림**: 전역 토스트 알림을 위한 `<ToastContainer />`를 렌더링합니다.
 *
 * 이 컴포넌트는 Next.js의 'use client' 지시어가 적용되어 클라이언트 사이드에서만 동작하며, 애플리케이션의 루트 레이아웃에서 사용되어야 합니다.
 *
 * @param {object} props - 컴포넌트의 props입니다.
 * @param {ReactNode} props.children - 프로바이더 내부에 렌더링될 자식 요소입니다.
 * @returns {JSX.Element} 각종 프로바이더로 래핑된 자식 요소입니다.
 */
export default function ClientProvider({ children }: { children: ReactNode }) {
  const clearUser = useRoamReadyStore((state) => state.clearUser);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get('error') === ERROR_CODES.SESSION_EXPIRED) {
      clearUser();
    }
  }, [searchParams, clearUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer />
      {children}
      <ToastContainer />
    </QueryClientProvider>
  );
}
