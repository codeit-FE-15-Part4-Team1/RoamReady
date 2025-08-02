'use client';

import { ReactNode, useEffect, useRef } from 'react';

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
 * 서버에서 전달받은 초기 사용자 정보를 클라이언트 Zustand 스토어에 동기화하는 역할을 하는 컴포넌트입니다.
 * 이 동기화는 컴포넌트가 처음 마운트될 때 단 한 번만 실행되며, 클라이언트 상태와 서버 상태의 일관성을 유지합니다.
 * `initialUser`가 존재할 경우에만 스토어의 `user` 상태를 업데이트합니다.
 *
 * @param {Props} props - 컴포넌트의 props.
 * @returns {JSX.Element} 자식 요소를 렌더링하는 React 요소.
 */
export default function ClientSessionProvider({
  initialUser,
  children,
}: Props) {
  const setUser = useRoamReadyStore((state) => state.setUser);
  const didInitialize = useRef(false);

  useEffect(() => {
    if (!didInitialize.current) {
      if (initialUser) {
        setUser(initialUser);
      }
      didInitialize.current = true;
    }
  }, [initialUser, setUser]);

  return <>{children}</>;
}
