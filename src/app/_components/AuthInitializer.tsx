'use client';

import { useEffect } from 'react';

import { useUser } from '@/domain/Auth/hooks/useUser';
import { useRoamReadyStore } from '@/shared/store';

/**
 * @component AuthInitializer
 * @description
 * 앱이 처음 로드될 때 `useUser` 훅을 호출하여
 * 서버의 실제 인증 상태와 클라이언트의 UI 상태를 동기화하는 역할을 합니다.
 * 이 컴포넌트는 UI를 렌더링하지 않습니다.
 */
export default function AuthInitializer() {
  const { refetch } = useUser(); // 쿼리 객체를 받아서
  const user = useRoamReadyStore((state) => state.user);

  useEffect(() => {
    // 스토어에 사용자 정보가 있을 경우 (즉, 이전에 로그인했을 경우)에만
    // 세션 유효성 검사를 위해 refetch를 실행합니다.
    if (user) {
      refetch();
    }
  }, [refetch, user]);

  return null;
}
