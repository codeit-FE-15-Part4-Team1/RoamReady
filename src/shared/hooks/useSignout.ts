'use client';

import { useRouter } from 'next/navigation';

import { authApiClient } from '@/domain/Auth/libs/authApiClient';
import { ROUTES } from '@/shared/constants/routes';

import { BRIDGE_API } from '../constants/bridgeEndpoints';

/**
 * @description
 * 사용자의 로그아웃 처리를 위한 커스텀 훅입니다.
 * 이 훅은 로그아웃 요청을 서버에 보내고, 성공 시 로그인 페이지로 리디렉션하는 함수를 반환합니다.
 *
 * ### 주요 기능
 * - **서버에 로그아웃 요청**: `authApiClient`를 사용해 `/api/auth/signout` 엔드포인트로 POST 요청을 보냅니다. 이 요청을 받은 서버는 HttpOnly 쿠키(`accessToken`, `refreshToken`)를 삭제합니다.
 * - **클라이언트 리디렉션**: 로그아웃 요청이 성공하면, Next.js의 `useRouter`를 사용해 사용자를 로그인 페이지(`ROUTES.SIGNIN`)로 이동시킵니다.
 * - **에러 처리**: 요청 과정에서 에러가 발생하면 콘솔에 에러 메시지를 출력합니다.
 *
 * @returns {() => Promise<void>} 로그아웃을 실행하는 비동기 함수. 이 함수를 UI 이벤트 핸들러 등에 연결하여 사용합니다.
 *
 * @example
 * ```jsx
 * 로그아웃 버튼 컴포넌트에서의 사용 예시
 * import useSignout from '@/shared/hooks/useSignout';
 *
 * function LogoutButton() {
 * const handleSignout = useSignout();
 *
 * return <button onClick={handleSignout}>로그아웃</button>;
 * }
 * ```
 * @see /src/app/api/auth/signout/route.ts - 실제 쿠키를 삭제하는 서버 API 라우트
 * @see /src/domain/Auth/libs/authApiClient.ts - API 요청에 사용되는 클라이언트
 */
const useSignout = () => {
  const router = useRouter();

  return async () => {
    try {
      await authApiClient.post(BRIDGE_API.AUTH.SIGNOUT);
      router.push(ROUTES.SIGNIN);
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };
};

export default useSignout;
