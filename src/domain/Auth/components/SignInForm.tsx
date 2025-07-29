'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import type { SigninRequest } from '@/domain/Auth/schemas/request';
import { signinRequestSchema } from '@/domain/Auth/schemas/request';
import { signin } from '@/domain/Auth/services';
import Button from '@/shared/components/Button';
import Input from '@/shared/components/ui/input';
import { ROUTES } from '@/shared/constants/routes';
import { useRoamReadyStore } from '@/shared/store';

/**
 * @component SignInForm
 * @description
 * 이메일/비밀번호를 이용한 로그인 폼의 UI와 상태 관리, 제출 로직을 담당하는 클라이언트 컴포넌트입니다.
 * 로그인 성공 시, 전역 상태를 업데이트하고 메인 페이지로 이동합니다.
 *
 * @see /src/app/api/auth/signin/route.ts - 로그인을 처리하는 API 라우트
 *
 * @feature
 * - **폼 관리**: `react-hook-form(useForm)`으로 폼의 상태를 관리합니다.
 * - **유효성 검사**: `zodResolver`를 이용해 실시간으로 유효성을 검사합니다.
 * - **제출 중 로딩 상태 관리**: API 요청 중에는 버튼을 비활성화하고 로딩 상태를 표시합니다.
 * - **전역 상태 업데이트**: 로그인 성공 시, Zustand 스토어에 사용자 정보를 저장(`setUser`)합니다.
 * - **사용자 피드백**: `toast` 메시지를 통해 로그인 성공 또는 실패에 대한 명확한 피드백을 제공합니다.
 * - **에러 핸들링**: `ky`의 `HTTPError`를 감지하여 네트워크 에러 메시지를 사용자에게 보여줍니다.
 *
 */
export default function SignInForm() {
  const router = useRouter();
  const setUser = useRoamReadyStore((state) => state.setUser);

  const signinDefaultValues: SigninRequest = {
    email: '',
    password: '',
  };

  const form = useForm<SigninRequest>({
    resolver: zodResolver(signinRequestSchema),
    defaultValues: signinDefaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: SigninRequest) => {
    try {
      const response = await signin(data);
      console.log('로그인 성공:', response);
      setUser(response.user);
      router.push(ROUTES.ACTIVITIES.ROOT);
    } catch (error) {
      console.error('로그인 실패:', error);
      if (error instanceof HTTPError) {
        const errorResponse = await error.response.json();
        // TODO: 사용자 친화적인 토스트 메시지로 교체.
        alert(errorResponse.message || '로그인 중 오류가 발생했습니다.');
      } else {
        alert('예기치 못한 오류가 발생했습니다.');
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-20'
      >
        <Input.Root id='email' name='email' type='email'>
          <Input.Label>이메일</Input.Label>
          <Input.Field placeholder='이메일 주소를 작성해주세요' />
          <Input.Helper />
        </Input.Root>

        <Input.Root id='password' name='password' type='password'>
          <Input.Label>비밀번호</Input.Label>
          <Input.Field
            placeholder='비밀번호를 입력해주세요'
            rightIcon={<Input.Trigger triggerType='password-toggle' />}
          />
          <Input.Helper />
        </Input.Root>

        <Button
          type='submit'
          variant='primary'
          size='small'
          className='mt-10 w-full py-17.5'
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          <span>{isSubmitting ? '로그인 중...' : '로그인'}</span>
        </Button>
      </form>
    </FormProvider>
  );
}
