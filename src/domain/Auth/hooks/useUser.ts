import { useQuery } from '@tanstack/react-query';

import { getMe } from '@/domain/Auth/services';

/**
 * @function useUser
 * @description 현재 로그인된 사용자 정보를 가져오는 Tanstack Query 커스텀 훅입니다.
 * 이 훅은 Tanstack Query의 `useQuery`를 사용하여 `getMe` 서비스 함수를 호출하고,
 * 서버 상태(데이터, 로딩 상태, 에러 상태)를 자동으로 관리합니다.
 *
 * @returns {object} Tanstack Query의 `useQueryResult` 객체. 포함하는 주요 속성은 다음과 같습니다:
 * - `data`: 성공 시 가져온 사용자 정보 (`User` 타입).
 * - `isLoading`: 데이터 로딩 중인지 여부를 나타내는 boolean 값.
 * - `isError`: 데이터 로딩 중 에러가 발생했는지 여부를 나타내는 boolean 값.
 * - `error`: 발생한 에러 객체.
 *
 * @property {Array<string>} queryKey - Tanstack Query가 이 데이터를 식별하고 캐싱하는 고유한 키 (`['user', 'me']`).
 * @property {Function} queryFn - 실제 데이터를 가져오는 비동기 함수 (`getMe`).
 * @property {number} staleTime - 캐시된 데이터가 '신선한' 상태로 간주되는 시간 (5분, `1000 * 60 * 5`ms). 이 시간 동안은 캐시된 데이터를 즉시 사용합니다.
 * @property {number} retry - 쿼리 실패 시 재시도 횟수 (1회).
 *
 * @example
 * ```typescript
 * import { useUser } from '@/domain/Auth/hooks/useUser';
 *
 * function UserProfile() {
 * const { data: user, isLoading, isError, error } = useUser();
 *
 * if (isLoading) {
 * return <span>로딩 중...</span>;
 * }
 *
 * if (isError) {
 * return <span>에러: {error.message}</span>;
 * }
 *
 * return <h1>안녕하세요, {user.nickname}님!</h1>;
 * }
 * ```
 */
export const useUser = () => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
