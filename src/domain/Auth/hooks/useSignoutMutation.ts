import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { signout } from '@/domain/Auth/services';
import { ROUTES } from '@/shared/constants/routes';
import { useToast } from '@/shared/hooks/useToast';
import { useRoamReadyStore } from '@/shared/store';

/**
 * @function useSignoutMutation
 * @description 로그아웃 로직을 처리하고 상태(로딩, 성공, 실패)를 관리하는 Tanstack Query의 `useMutation` 커스텀 훅입니다.
 * 이 훅은 기존 `useSignout` 훅을 대체하며, 로그아웃 성공 또는 실패 시의 사이드 이펙트(전역 상태 초기화, 캐시 제거, 페이지 이동, 토스트 메시지 표시 등)를 처리합니다.
 *
 * @property {Function} mutationFn - 실제 로그아웃 API 호출을 수행하는 비동기 함수 (`signout`). 이 함수가 성공(resolve)하면 `onSuccess` 콜백이, 실패(reject)하면 `onError` 콜백이 실행됩니다.
 *
 * @property {Function} onSuccess - `mutationFn`이 성공적으로 완료되었을 때 실행되는 콜백 함수입니다.
 * - 전역 Zustand 스토어의 `clearUser` 함수를 호출하여 사용자 정보를 제거하고 로그인 상태를 초기화합니다.
 * - `queryClient.removeQueries({ queryKey: ['user', 'me'] })`를 호출하여 'user', 'me' 쿼리 키에 해당하는 캐시 데이터를 완전히 제거합니다. 이는 로그아웃 후 이전 사용자 정보가 캐시에 남아있지 않도록 하여 데이터 일관성을 보장합니다.
 * - `showSuccess` 토스트 메시지('로그아웃되었습니다. 안녕히 가세요!')를 표시하여 사용자에게 로그아웃 성공을 알립니다.
 * - 메인 페이지(`ROUTES.MAIN`)로 리다이렉트하여 로그인되지 않은 상태의 초기 화면으로 이동시킵니다.
 *
 * @property {Function} onError - `mutationFn`이 실패했을 때 실행되는 콜백 함수입니다.
 * - `error` (Error): 발생한 에러 객체입니다. 이 `error.message`는 `formatErrorResponseHooks`에 의해 이미 사용자 친화적인 메시지로 가공되어 있습니다.
 * - 개발자 콘솔에 '로그아웃 실패' 메시지와 함께 상세 에러를 로그로 남깁니다.
 * - `showError` 토스트 메시지를 통해 사용자에게 에러 메시지를 표시하여 로그아웃 실패를 알립니다.
 *
 * @returns {object} Tanstack Query의 `UseMutationResult` 객체.
 *
 */
export const useSignoutMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearUser = useRoamReadyStore((state) => state.clearUser);
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: signout,
    onSuccess: () => {
      clearUser();
      queryClient.removeQueries({ queryKey: ['user', 'me'] });
      showSuccess('로그아웃되었습니다. 안녕히 가세요!');
      router.push(ROUTES.MAIN);
    },
    onError: (error: Error) => {
      console.error('로그아웃 실패:', error);
      showError(error.message);
    },
  });
};
