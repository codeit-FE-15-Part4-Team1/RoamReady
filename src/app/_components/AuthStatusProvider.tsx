'use client';

import { ReactNode, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useUser } from '@/domain/Auth/hooks/useUser';
import { BoundState, useRoamReadyStore } from '@/shared/store';

/**
 * @component AuthStatusProvider
 * @description
 * `AuthStatusProvider`는 사용자 인증 상태를 관리하고, Tanstack Query를 사용하여 백엔드로부터 사용자 프로필을 가져오는 클라이언트 컴포넌트입니다.
 * 이 컴포넌트는 전역 상태(Zustand)에 사용자 정보를 동기화하며, 레이아웃 내에서 클라이언트 측 인증 로직을 분리하여 자식 컴포넌트들이 서버 컴포넌트로 유지될 수 있도록 돕습니다.
 *
 * @param {object} props - 컴포넌트의 props입니다.
 * @param {ReactNode} props.children - 이 컴포넌트가 렌더링할 자식 요소입니다.
 *
 * @details
 * - **사용자 프로필 데이터 가져오기**: `useUser` 훅을 호출하여 현재 로그인된 사용자 정보를 Tanstack Query를 통해 비동기적으로 가져옵니다. 이 훅은 데이터(`user`), 로딩 상태(`isLoading`), 에러 상태(`isError`)를 반환합니다.
 *
 * - **Zustand 스토어 연동**: `useRoamReadyStore` 훅과 `useShallow` 셀렉터를 사용하여 `setUser` 및 `clearUser` 액션을 가져와 불필요한 재렌더링을 최적화합니다.
 *
 * - **인증 상태 동기화 (`useEffect`)**:
 * - `useUser` 훅의 로딩이 완료되면(`!isLoading`), 그 결과에 따라 Zustand 스토어의 사용자 상태를 동기화합니다.
 * - `isError`가 `true`인 경우 (예: 토큰 만료로 `getMe` API 호출 실패), 전역 상태에서 사용자 정보를 `clearUser`를 통해 제거합니다.
 * - `user` 데이터가 존재하고 `isError`가 `false`인 경우, `setUser`를 통해 전역 상태에 사용자 정보를 저장합니다.
 *
 * - **초기 로딩 처리**:
 * - `useUser` 훅의 `isLoading` 상태가 `true`인 동안에는 자식 컴포넌트를 렌더링하지 않고 `null`을 반환합니다.
 * 이는 인증 상태를 확인하는 동안 UI가 깜빡이는 현상(Flickering)을 방지하며, 필요에 따라 로딩 스피너나 스켈레톤 UI로 대체될 수 있습니다.
 * 현재는 로딩스피너 대신 null을 반환하게 구현(인증 상태 확인 과정이 매우 빠르게 완료될 경우 로딩 스피너로 인한 사용자 경험을 저해하지 않기 위함)
 *
 * @returns {JSX.Element} 인증 상태 확인이 끝나면 자식 요소를 렌더링하는 React Fragment 입니다.
 */
export default function AuthStatusProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: user, isError, isLoading } = useUser();

  const { setUser, clearUser } = useRoamReadyStore(
    useShallow((state: BoundState) => ({
      setUser: state.setUser,
      clearUser: state.clearUser,
    })),
  );

  useEffect(() => {
    if (!isLoading) {
      if (isError) {
        clearUser();
      } else if (user) {
        setUser(user);
      }
    }
  }, [user, isError, isLoading, setUser, clearUser]);

  // 로딩 중에도 children을 렌더링하여 서버 스트리밍을 차단하지 않습니다.
  // 인증 상태 확인은 클라이언트에서 비동기적으로 처리되며,
  // 그 결과는 useEffect를 통해 Zustand 스토어에 반영됩니다.
  // UI(예: 헤더)는 Zustand 스토어를 구독하여 자동으로 업데이트됩니다.
  return <>{children}</>;
}
