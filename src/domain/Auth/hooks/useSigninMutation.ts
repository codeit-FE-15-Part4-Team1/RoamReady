import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';

import type { SigninResponse } from '@/domain/Auth/schemas/response';
import { signin } from '@/domain/Auth/services';
import { ROUTES } from '@/shared/constants/routes';
import { useToast } from '@/shared/hooks/useToast';
import { useRoamReadyStore } from '@/shared/store';

/**
 * @function useSigninMutation
 * @description 로그인 로직을 처리하고 상태(로딩, 성공, 실패)를 관리하는 Tanstack Query의 `useMutation` 커스텀 훅입니다.
 * 이 훅은 로그인 성공 또는 실패 시의 사이드 이펙트(페이지 이동, 전역 상태 업데이트, 토스트 메시지 표시 등)를 처리합니다.
 *
 * @property {Function} mutationFn - 실제 로그인 API 호출을 수행하는 비동기 함수 (`signin`). 이 함수가 성공(resolve)하면 `onSuccess` 콜백이, 실패(reject)하면 `onError` 콜백이 실행됩니다.
 *
 * @property {Function} onSuccess - `mutationFn`이 성공적으로 완료되었을 때 실행되는 콜백 함수입니다.
 * - `data` (SigninResponse): 로그인 API 호출의 결과 데이터입니다.
 * - 전역 Zustand 스토어의 `setUser` 함수를 통해 로그인된 사용자 정보(`data.user`)를 업데이트합니다.
 * - `queryClient.invalidateQueries({ queryKey: ['user', 'me'] })`를 호출하여 'user', 'me' 쿼리 키에 해당하는 캐시를 무효화합니다. `queryClient`는 Tanstack Query의 중앙 캐시 관리자이며, `invalidateQueries`는 특정 쿼리 키에 해당하는 캐시 데이터를 '오래된' 상태로 표시하여 다음 번에 해당 데이터를 사용할 때 서버에서 최신 정보를 다시 가져오도록 강제합니다. 이는 로그인 후 사용자 정보가 변경되었을 수 있으므로 최신 정보를 다시 가져오도록 합니다.
 * - `showSuccess` 토스트 메시지('로그인 되었습니다. 환영합니다!')를 표시하고 메인 페이지(`ROUTES.ACTIVITIES.ROOT`)로 리다이렉트합니다.
 *
 * @property {Function} onError - `mutationFn`이 실패했을 때 실행되는 콜백 함수입니다.
 * - `error` (Error): 발생한 에러 객체입니다. 이 `error.message`는 `formatErrorResponseHooks`에 의해 이미 사용자 친화적인 메시지로 가공되어 있습니다.
 * - 에러가 `HTTPError` 인스턴스인 경우, HTTP 상태 코드를 확인하여 특정 에러를 처리합니다.
 * - 특히 400 (Bad Request) 또는 401 (Unauthorized)과 같은 로그인 실패 관련 에러는 전역 `handleErrorByStatus`에서 처리되지 않으므로, 여기서 `showError` 토스트 메시지(`로그인 실패: ${error.message}`)를 표시하여 사용자에게 피드백을 제공합니다.
 * - 그 외의 모든 에러는 개발자 콘솔에 로그를 남기고 `error.message`를 사용하여 일반적인 에러 토스트 메시지를 표시합니다.
 *
 * @returns {object} Tanstack Query의 `UseMutationResult` 객체.
 *
 */
export const useSigninMutation = () => {
  const router = useRouter();
  const setUser = useRoamReadyStore((state) => state.setUser);
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: signin,
    onSuccess: (data: SigninResponse) => {
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
      showSuccess('로그인 되었습니다. 환영합니다!');
      router.push(ROUTES.ACTIVITIES.ROOT);
    },

    onError: (error: Error) => {
      if (
        error instanceof HTTPError &&
        (error.response.status === 400 || error.response.status === 401)
      ) {
        showError(`로그인 실패: ${error.message}`);
      } else {
        console.error('로그인 실패:', error);
        showError(error.message);
      }
    },
  });
};
