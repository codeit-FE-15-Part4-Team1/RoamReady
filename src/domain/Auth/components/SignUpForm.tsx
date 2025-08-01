'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useSignupMutation } from '@/domain/Auth/hooks/useSignupMutation';
import type {
  SignupFormValues,
  SignupRequest,
} from '@/domain/Auth/schemas/request';
import { signupRequestSchema } from '@/domain/Auth/schemas/request';
import Button from '@/shared/components/Button';
import Input from '@/shared/components/ui/input';
import { OAUTH_ERROR_MESSAGES } from '@/shared/constants/routes';
import { useToast } from '@/shared/hooks/useToast';

/**
 * @component SignUpForm
 * @description
 * 이메일/닉네임/비밀번호를 이용한 회원가입 폼의 UI와 상태 관리, 제출 로직을 담당하는 클라이언트 컴포넌트입니다.
 * 회원가입 성공 시, 자동으로 로그인 상태를 만들고 메인 페이지로 이동시킵니다.
 *
 * @see /src/app/api/auth/signup/route.ts - 자동 로그인을 처리하는 API 라우트
 *
 * @feature
 * - **폼 관리**: `react-hook-form`의 `useForm`을 사용하여 폼의 상태를 관리합니다.
 * - **유효성 검사**: `zodResolver`를 이용해 클라이언트 측 유효성 검사를 실시간으로 수행하며, 서버 응답 에러(예: 이메일 중복)를 `react-hook-form`의 `setError`를 통해 특정 필드에 직접 표시합니다.
 * - **제출 중 로딩 상태 관리**: `isSubmitting` 및 `isPending` 상태를 활용하여 API 요청 중에는 버튼을 비활성화하고 로딩 상태를 표시합니다.
 * - **자동 로그인**: 회원가입 성공 시, 즉시 로그인 상태로 전환하며 전역 Zustand 스토어에 사용자 정보를 저장하고 관련 캐시를 무효화합니다.
 * - **사용자 피드백**: `useToast` 훅을 통해 회원가입 성공 또는 실패에 대한 명확한 피드백(토스트 메시지)을 제공합니다. OAuth 관련 에러는 URL 쿼리 파라미터를 통해 받아 처리합니다.
 * - **에러 핸들링**: `useSignupMutation` 훅 내부에서 `ky`의 `HTTPError`를 감지하여 네트워크 에러 메시지 및 서버 응답 에러를 사용자에게 보여줍니다.
 */
export default function SignUpForm() {
  const router = useRouter();
  const { showError } = useToast();
  const searchParams = useSearchParams();
  const isUrlErrorHandled = useRef(false);

  const signupDefaultValues: SignupFormValues = {
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  };

  useEffect(() => {
    if (isUrlErrorHandled.current) return;

    const errorCode = searchParams.get('error');
    if (!errorCode) return;

    const message = OAUTH_ERROR_MESSAGES[errorCode];
    showError(message);
    isUrlErrorHandled.current = true;

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('error');
    router.replace(`?${newSearchParams.toString()}`);
  }, [searchParams, showError, router]);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupRequestSchema),
    defaultValues: signupDefaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const { mutate, isPending } = useSignupMutation(form);

  const onSubmit = (data: SignupRequest) => {
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

        <Input.Root id='nickname' name='nickname' type='text'>
          <Input.Label>닉네임</Input.Label>
          <Input.Field placeholder='닉네임을 작성해주세요' />
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

        <Input.Root
          id='password-confirm'
          name='passwordConfirm'
          type='password'
        >
          <Input.Label>비밀번호 확인</Input.Label>
          <Input.Field
            placeholder='비밀번호를 다시 입력해주세요'
            rightIcon={<Input.Trigger triggerType='password-toggle' />}
          />
          <Input.Helper />
        </Input.Root>

        <Button
          type='submit'
          variant='primary'
          size='large'
          className='mt-10 w-full py-17.5'
          loading={isSubmitting || isPending}
          disabled={!isValid}
        >
          회원가입
        </Button>
      </form>
    </FormProvider>
  );
}
