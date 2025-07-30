import { QueryClient } from '@tanstack/react-query';

/**
 * @file queryClient.ts - Tanstack Query의 전역 QueryClient 인스턴스
 *
 * @description
 * 애플리케이션 전반에서 사용할 Tanstack Query의 `QueryClient` 인스턴스를 생성하고 내보냅니다.
 * 이 인스턴스는 React Query의 모든 캐싱, 데이터 패칭, 데이터 무효화 및 동기화 로직을 관리하는 중앙 허브 역할을 합니다.
 *
 * `QueryClient`는 일반적으로 애플리케이션의 루트 컴포넌트(`QueryClientProvider`)에 제공되어
 * 하위의 모든 `useQuery`, `useMutation` 등의 훅이 동일한 캐시를 공유하고 상호작용할 수 있도록 합니다.
 *
 */
export const queryClient = new QueryClient();
