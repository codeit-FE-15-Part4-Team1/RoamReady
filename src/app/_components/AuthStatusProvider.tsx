'use client';

import { useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { getMe } from '@/domain/Auth/services';
import type { User } from '@/shared/slices/userSlice';
import { BoundState, useRoamReadyStore } from '@/shared/store';
import type { KyHTTPError } from '@/shared/utils/errors/kyHttpErrorGuards';
import { isKyHTTPError } from '@/shared/utils/errors/kyHttpErrorGuards';
import getCookieValue from '@/shared/utils/getCookieValue';

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
 *
 * - **액세스 토큰(accessToken) 상태 관리**:
 * - `useState` 훅을 사용하여 `accessToken`의 상태를 관리합니다. 초기값은 `undefined`로 설정하여 서버 사이드 렌더링(SSR) 시 `getCookieValue` 함수가 `document.cookie`에 접근하지 않도록 합니다.
 * - `useEffect` 훅은 컴포넌트가 클라이언트에서 마운트된 후에만 실행되도록 설정(`[]` 빈 의존성 배열)하여, `getCookieValue`를 통해 `accessToken` 쿠키 값을 안전하게 읽어옵니다.
 *
 *  - **사용자 프로필 데이터 가져오기 (Tanstack Query)**:
 * - `queryKey`: 사용자 프로필 데이터를 식별하는 고유 키 `['userProfile']`.
 * - `queryFn`: `getMe` 서비스를 호출하여 현재 로그인된 사용자 정보를 비동기적으로 가져옵니다.
 * - `enabled`: `accessToken` 상태의 존재 여부에 따라 쿼리 실행을 조건부로 제어합니다. `accessToken`이 `undefined`가 아닌 값(`getCookieValue`로 쿠키를 읽은 후)이면서 실제 토큰 값이 존재할 때만 쿼리가 실행됩니다. 이는 로그인하지 않은 사용자의 불필요한 API 호출(`401 Unauthorized` 포함)을 방지합니다.
 * - `staleTime`: 가져온 데이터가 5분(300,000ms) 동안 '신선한(stale)' 상태로 간주되어 캐시 재검증이 발생하지 않도록 설정합니다.
 * - `refetchOnWindowFocus`: 윈도우 포커스 시 자동으로 데이터를 다시 가져오지 않도록 설정.
 * - `retry`: 쿼리 요청 실패 시 최대 1회 재시도를 수행합니다.
 *
 * - **인증 상태 동기화 (`useEffect`)**:
 * - `userProfile` 데이터, 쿼리 `status`(`'success'`, `'error'`), `isError`, `error`, `accessToken` 등의 변화에 반응하여 사용자 전역 상태를 업데이트합니다.
 * - `status`가 `'success'`일 때 `userProfile` 데이터가 존재하면 `setUser`를 통해 사용자 정보를 설정하고, 데이터가 없으면 `clearUser`를 호출하여 사용자 정보를 지웁니다.
 * - `status`가 `'error'`일 경우, 인증에 실패했음을 나타내므로 즉시 `clearUser`를 호출하여 사용자 정보를 지웁니다.
 * - `isError` 상태일 때, Ky HTTP 에러 여부(`isKyHTTPError`) 및 상태 코드(`error.response.status`)를 확인하여 `401 Unauthorized` 에러는 `console.log`로, 그 외의 예상치 못한 에러는 `console.error`로 로깅하여 개발자 콘솔의 가독성을 높였습니다.
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

  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    setAccessToken(getCookieValue('accessToken'));
  }, []);

  const {
    data: userProfile,
    isError,
    error,
    status,
  } = useQuery<User, KyHTTPError>({
    queryKey: ['userProfile'],
    queryFn: getMe,
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      if (isKyHTTPError(error)) {
        const isUnauthorized = error.response.status === 401;

        if (isUnauthorized) {
          console.log(
            '사용자 정보 요청 실패: 로그인되지 않았거나 인증 세션이 만료됨 (401 Unauthorized)',
          );
        } else {
          console.error(
            '사용자 정보를 가져오는 중 예상치 못한 HTTP 에러 발생:',
            error.response.status,
            error,
          );
        }
      } else {
        console.error(
          '사용자 정보를 가져오는 중 알 수 없는 유형의 에러 발생:',
          error,
        );
      }
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
  }, [userProfile, status, isError, error, setUser, clearUser]);

  return <>{children}</>;
}
