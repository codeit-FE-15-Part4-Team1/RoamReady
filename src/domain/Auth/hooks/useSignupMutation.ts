import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';

import type { SignupFormValues } from '@/domain/Auth/schemas/request';
import type { SignupResponse } from '@/domain/Auth/schemas/response';
import { signup } from '@/domain/Auth/services';
import { ROUTES } from '@/shared/constants/routes';
import { useToast } from '@/shared/hooks/useToast';
import { useRoamReadyStore } from '@/shared/store';

/**
 * @function useSignupMutation
 * @description 회원가입 로직을 처리하고 상태(로딩, 성공, 실패)를 관리하는 Tanstack Query의 `useMutation` 커스텀 훅입니다.
 * 이 훅은 회원가입 성공 또는 실패 시의 사이드 이펙트(페이지 이동, 전역 상태 업데이트, 토스트 메시지 표시 등)를 처리합니다.
 *
 * @param {UseFormReturn<SignupFormValues, any, SignupFormValues>} form - `react-hook-form`의 `useForm`에서 반환된 폼 인스턴스입니다. 특히 `409 Conflict` (이메일 중복) 에러 발생 시 특정 필드에 에러 메시지를 설정하는 데 사용됩니다. `SignupFormValues` 타입은 `passwordConfirm` 필드를 포함하여 폼의 전체 상태를 나타냅니다.
 *
 * @property {Function} mutationFn - 실제 회원가입 API 호출을 수행하는 비동기 함수 (`signup`). 이 함수가 성공(resolve)하면 `onSuccess` 콜백이, 실패(reject)하면 `onError` 콜백이 실행됩니다.
 *
 * @property {Function} onSuccess - `mutationFn`이 성공적으로 완료되었을 때 실행되는 콜백 함수입니다.
 * - `data` (SignupResponse): 회원가입 API 호출의 결과 데이터입니다.
 * - `data`에 `message` 속성이 존재할 경우 (예: "회원가입 성공! 로그인 페이지로 이동합니다."), 이는 자동 로그인 실패와 같은 '부분 성공' 케이스로 간주하여 해당 메시지를 표시하고 로그인 페이지(`ROUTES.SIGNIN`)로 이동합니다.
 * - 전역 Zustand 스토어의 `setUser` 함수를 통해 로그인된 사용자 정보(`data`)를 업데이트합니다.
 * - `queryClient.invalidateQueries({ queryKey: ['user', 'me'] })`를 호출하여 'user', 'me' 쿼리 키에 해당하는 캐시를 무효화합니다. 이는 회원가입 후 사용자 정보가 변경되었을 수 있으므로 최신 정보를 다시 가져오도록 합니다.
 * - `showSuccess` 토스트 메시지('회원가입이 완료되었습니다! 환영합니다.')를 표시하고 메인 페이지(`ROUTES.MAIN`)로 리다이렉트합니다.
 *
 * @property {Function} onError - `mutationFn`이 실패했을 때 실행되는 콜백 함수입니다.
 * - `error` (Error): 발생한 에러 객체입니다. 이 `error.message`는 `formatErrorResponseHooks`에 의해 이미 사용자 친화적인 메시지로 가공되어 있습니다.
 * - 에러가 `HTTPError` 인스턴스인 경우, HTTP 상태 코드를 확인하여 특정 에러를 처리합니다.
 * - 특히 `409 Conflict` (예: 이메일 중복) 에러일 경우,  `form.setError('email', { message: error.message });`를 사용하여 이메일 입력 필드에 직접 에러 메시지를 표시합니다.
 * - 전역적으로 `handleErrorByStatus`에서 이미 처리된 401, 5xx 에러를 제외한 나머지 에러는 `error.message`를 사용하여 일반적인 에러 토스트 메시지를 표시합니다.
 *
 * @returns {object} Tanstack Query의 `UseMutationResult` 객체.
 */
export const useSignupMutation = (
  form: UseFormReturn<SignupFormValues, undefined, SignupFormValues>,
) => {
  const router = useRouter();
  const setUser = useRoamReadyStore((state) => state.setUser);
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data: SignupResponse) => {
      const hasAutoLoginFailed = 'message' in data;

      if (hasAutoLoginFailed) {
        const toastMessage =
          '회원가입이 완료되었습니다. 서비스를 이용하려면 로그인해주세요.';
        showSuccess(toastMessage);
        console.error(
          '자동 로그인 실패: 회원가입은 성공했지만, 추가 로그인이 필요합니다.',
          data,
        );
        router.push(ROUTES.SIGNIN);
        return;
      }

      setUser(data);
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
      showSuccess('회원가입이 완료되었습니다! 환영합니다.');
      router.push(ROUTES.MAIN);
    },

    onError: (error: Error) => {
      if (error instanceof HTTPError) {
        if (error.response.status === 409) {
          console.log('이미 가입된 이메일입니다.');
          form.setError('email', { message: error.message });
        } else {
          showError(error.message);
        }
        return;
      }

      console.error('회원가입 실패:', error);
      showError(error.message);
    },
  });
};
