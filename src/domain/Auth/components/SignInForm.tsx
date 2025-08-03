'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useSigninMutation } from '@/domain/Auth/hooks/useSigninMutation';
import type { SigninRequest } from '@/domain/Auth/schemas/request';
import { signinRequestSchema } from '@/domain/Auth/schemas/request';
import Button from '@/shared/components/Button';
import Input from '@/shared/components/ui/input';
import { useRoamReadyStore } from '@/shared/store';

/**
 * @component SignInForm
 * @description
 * 이메일/비밀번호를 이용한 로그인 폼의 UI와 상태 관리, 제출 로직을 담당하는 클라이언트 컴포넌트입니다.
 * 로그인 성공 시, 전역 상태를 업데이트하고 메인 페이지로 이동합니다.
 *
 * @feature
 * - **폼 관리**: `react-hook-form`의 `useForm`을 사용하여 폼의 상태를 관리합니다.
 * - **유효성 검사**: `zodResolver`를 이용해 클라이언트 측 유효성 검사를 실시간으로 수행합니다.
 * - **제출 중 로딩 상태 관리**: `isSubmitting` 및 `isPending` 상태를 활용하여 API 요청 중에는 버튼을 비활성화하고 로딩 상태를 표시합니다.
 * - **전역 상태 업데이트**: 로그인 성공 시, 전역 Zustand 스토어에 사용자 정보를 저장하고 관련 캐시를 무효화합니다.
 * - **에러 핸들링**: `useSigninMutation` 훅 내부에서 `ky`의 `HTTPError`를 감지하여 네트워크 에러 메시지 및 서버 응답 에러를 사용자에게 보여줍니다.
 * - **최근 로그인 이메일 자동 입력**: Zustand 스토어의 사용자 정보에서 이메일을 가져와 기본값으로 자동 입력 (로그아웃 후에도 유지됨)
 *
 * @see /src/app/api/auth/signin/route.ts - 로그인을 처리하는 API 라우트
 */
export default function SignInForm() {
  const { mutate, isPending } = useSigninMutation();
  const user = useRoamReadyStore((state) => state.user);

  const signinDefaultValues: SigninRequest = {
    email: '',
    password: '',
  };

  const form = useForm<SigninRequest>({
    resolver: zodResolver(signinRequestSchema),
    defaultValues: signinDefaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    setValue,
  } = form;

  useEffect(() => {
    if (user?.email) {
      setValue('email', user.email);
    }
  }, [user?.email, setValue]);

  const onSubmit = (data: SigninRequest) => {
    mutate(data);
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
          loading={isSubmitting || isPending}
          disabled={!isValid}
        >
          로그인
        </Button>
      </form>
    </FormProvider>
  );
}
