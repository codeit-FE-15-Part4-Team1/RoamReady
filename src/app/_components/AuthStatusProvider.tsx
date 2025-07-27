'use client';

import { useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { getMe } from '@/domain/Auth/services';
import { useToast } from '@/shared/hooks/useToast';
import type { User } from '@/shared/slices/userSlice';
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
 * - **Zustand 스토어 연동**: `useRoamReadyStore` 훅과 `useShallow` 셀렉터를 사용하여 `setUser` 및 `clearUser` 액션을 가져와 불필요한 재렌더링을 최적화합니다.
 * - **사용자 프로필 데이터 가져오기 (Tanstack Query)**:
 * - `queryKey`: 사용자 프로필 데이터를 식별하는 고유 키 `['userProfile']`를 사용합니다.
 * - `queryFn`: `getMe` 서비스를 호출하여 현재 로그인된 사용자 정보를 비동기적으로 가져옵니다.
 * - `staleTime`: 가져온 데이터가 5분(300,000ms) 동안 '신선한(stale)' 상태로 간주되어 캐시 재검증이 발생하지 않도록 설정합니다.
 * - `refetchOnWindowFocus`: 윈도우 포커스 시 자동으로 데이터를 다시 가져오지 않도록 `false`로 설정합니다.
 * - `retry`: 쿼리 요청 실패 시 최대 1회 재시도를 수행합니다.
 * - **인증 상태 동기화 (`useEffect`)**:
 * - `userProfile` 데이터 또는 쿼리 `status`(`'success'`, `'error'`)의 변경에 반응하여 사용자 전역 상태를 업데이트합니다.
 * - `status`가 `'success'`일 때 `userProfile` 데이터가 존재하면 `setUser`를 통해 사용자 정보를 설정하고, 데이터가 없으면 `clearUser`를 호출하여 사용자 정보를 지웁니다.
 * - `status`가 `'error'`일 경우, 인증에 실패했음을 나타내므로 즉시 `clearUser`를 호출하여 사용자 정보를 지웁니다.
 *
 * @returns {JSX.Element} 자식 요소를 렌더링하는 React Fragment 입니다.
 */
export default function AuthStatusProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { setUser, clearUser } = useRoamReadyStore(
    useShallow((state: BoundState) => ({
      setUser: state.setUser,
      clearUser: state.clearUser,
    })),
  );

  const { showError } = useToast();

  const {
    data: userProfile,
    isError,
    error,
    status,
  } = useQuery<User, Error>({
    queryKey: ['userProfile'],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      console.error('사용자 프로필을 가져오는 중 에러 발생:', error);
      showError(
        error?.message || '사용자 정보를 불러오는 중 오류가 발생했습니다.',
      );
    }

    if (status === 'success') {
      if (userProfile) {
        setUser(userProfile);
      } else {
        clearUser();
      }
    } else if (status === 'error') {
      clearUser();
    }
  }, [userProfile, status, isError, error, setUser, clearUser, showError]);

  return <>{children}</>;
}
