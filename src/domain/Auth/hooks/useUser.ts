import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getMe } from '@/domain/Auth/services';
import { useRoamReadyStore } from '@/shared/store';

/**
 * @function useUser
 * @description
 * 현재 로그인된 사용자의 정보를 가져와 클라이언트의 전역 상태(Zustand)와 동기화하는 커스텀 훅입니다.
 *
 * 이 훅은 Tanstack Query의 `useQuery`를 사용하여 `getMe` 서비스 함수를 호출하고,
 * `useEffect`를 통해 쿼리의 결과(성공 또는 실패)에 따라 전역 상태를 업데이트합니다.
 *
 * - **조회 성공 시 (`isSuccess`)**: `setUser` 액션을 호출하여 전역 스토어에 최신 사용자 정보를 저장합니다.
 * - **조회 실패 시 (`isError`)**: `clearUser` 액션을 호출하여 전역 스토어와 localStorage의 사용자 정보를 제거합니다.
 *
 * 이 방식은 앱이 시작될 때(`AuthInitializer` 내부에서 호출) 실제 서버의 인증 상태와 UI 상태의 불일치를 방지하는 핵심적인 역할을 수행합니다.
 *
 * @returns {object} Tanstack Query의 `useQueryResult` 객체. 포함하는 주요 속성은 다음과 같습니다:
 * - `data`: 성공 시 가져온 사용자 정보 (`User` 타입).
 * - `isLoading`: 데이터 로딩 중인지 여부를 나타내는 boolean 값.
 * - `isError`: 데이터 로딩 중 에러가 발생했는지 여부를 나타내는 boolean 값.
 * - `error`: 발생한 에러 객체.
 *
 * @property {Array<string>} queryKey - Tanstack Query가 이 데이터를 식별하고 캐싱하는 고유한 키 (`['user', 'me']`).
 * @property {Function} queryFn - 실제 데이터를 가져오는 비동기 함수 (`getMe`).
 * @property {number} retry - 쿼리 실패 시 재시도 횟수 (1회).
 * @property {number} staleTime - 데이터를 'fresh' 상태로 유지하는 시간 (5분).
 *
 * @example
 * ```typescript
 * import { useUser } from '@/domain/Auth/hooks/useUser';
 *
 * function UserProfile() {
 * const { data: user, isLoading, isError } = useUser();
 *
 * if (isLoading) {
 * return <span>로딩 중...</span>;
 * }
 *
 * if (isError) {
 * 이 컴포넌트가 렌더링될 시점에는 AuthInitializer가 이미
 * 로그아웃 처리를 완료했으므로, 보통 이 분기는 보이지 않습니다.
 * return <span>로그인이 필요합니다.</span>;
 * }
 *
 * return <h1>안녕하세요, {user.nickname}님!</h1>;
 * }
 * ```
 */
export const useUser = () => {
  const setUser = useRoamReadyStore((state) => state.setUser);
  const clearUser = useRoamReadyStore((state) => state.clearUser);

  const queryResult = useQuery({
    queryKey: ['user', 'me'],
    queryFn: getMe,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  // 2. useEffect를 사용하여 쿼리 결과에 따른 부가 작업을 처리합니다.
  useEffect(() => {
    // isSuccess가 true가 되면 (데이터 로딩 성공 시)
    if (queryResult.isSuccess) {
      setUser(queryResult.data);
    }
  }, [queryResult.isSuccess, queryResult.data, setUser]);

  useEffect(() => {
    // isError가 true가 되면 (데이터 로딩 실패 시)
    if (queryResult.isError) {
      clearUser();
    }
  }, [queryResult.isError, clearUser]);

  // 3. useQuery의 결과를 그대로 반환합니다.
  return queryResult;
};
