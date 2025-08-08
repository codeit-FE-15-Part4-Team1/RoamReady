'use client';

import { useEffect } from 'react';

import { useUser } from '@/domain/Auth/hooks/useUser';

/**
 * @component AuthInitializer
 * @description
 * 앱이 처음 로드될 때 `useUser` 훅을 호출하여
 * 서버의 실제 인증 상태와 클라이언트의 UI 상태를 동기화하는 역할을 합니다.
 * 이 컴포넌트는 UI를 렌더링하지 않습니다.
 */
export default function AuthInitializer() {
  const { refetch } = useUser(); // 쿼리 객체를 받아서

  useEffect(() => {
    // 앱 로드시 강제로 한번 요청 실행
    refetch();
  }, [refetch]);

  return null;
}
