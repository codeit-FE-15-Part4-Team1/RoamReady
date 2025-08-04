'use client';

import { ReactNode, useEffect, useState } from 'react'; // useState 추가

import type { User } from '@/domain/Auth/schemas/response';
import { useRoamReadyStore } from '@/shared/store';

/**
 * @interface Props
 * @description ClientSessionProvider 컴포넌트의 props 타입을 정의합니다.
 * @property {User | null} initialUser - 서버에서 전달받은 초기 사용자 정보입니다. 로그인하지 않은 경우 null입니다.
 * @property {ReactNode} children - Provider 내부에 렌더링될 자식 요소입니다.
 */
interface Props {
  initialUser: User | null;
  children: ReactNode;
}

/**
 * @component ClientSessionProvider
 * @description
 * 클라이언트에서 Zustand 스토어와 서버로부터 받은 초기 사용자 정보를 동기화하는 Provider 컴포넌트입니다.
 *
 * - **역할**: SSR 시점에 받은 `initialUser`를 클라이언트 Zustand 상태에 반영합니다.
 * - **Hydration 안전성 확보**: 클라이언트 상태 초기화 전까지는 자식 컴포넌트를 렌더링하지 않아 클라이언트와 서버 간 hydration mismatch 문제를 예방합니다.
 * - **조건부 초기화**: `initialUser`가 존재하는 경우에만 상태를 설정합니다.
 *
 * @param {User | null} initialUser - 서버 측에서 받아온 사용자 정보
 * @param {ReactNode} children - Provider 내부에 렌더링될 React 자식 요소
 *
 * @returns 자식 컴포넌트를 감싸는 Provider 요소 (스토어 초기화 전까지는 렌더링되지 않음)
 */
export default function ClientSessionProvider({
  initialUser,
  children,
}: Props) {
  const setUser = useRoamReadyStore((state) => state.setUser);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
    setIsHydrated(true);
  }, [initialUser, setUser]);

  if (!isHydrated) {
    return null;
  }

  return <>{children}</>;
}
