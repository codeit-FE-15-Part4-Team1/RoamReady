'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import type {
  SignupFormValues,
  SignupRequest,
} from '@/domain/Auth/schemas/request';
import { signupRequestSchema } from '@/domain/Auth/schemas/request';
import { signup } from '@/domain/Auth/services';
import Button from '@/shared/components/Button';
import Input from '@/shared/components/ui/input';
import { ROUTES } from '@/shared/constants/routes';
import { useRoamReadyStore } from '@/shared/store';

/**
 * @component SignUpForm
 * @description
 * 이메일/닉네임/비밀번호를 이용한 회원가입 폼의 UI와 상태 관리, 제출 로직을 담당하는 클라이언트 컴포넌트입니다.
 * 회원가입 성공 시, 자동으로 로그인 상태를 만들고 메인 페이지로 이동시킵니다.
 *
 * @see /src/app/api/auth/signup/route.ts - 자동 로그인을 처리하는 API 라우트
 *
 * @feature
 * - **폼 관리**: `react-hook-form(useForm)`으로 폼의 상태를 관리합니다.
 * - **유효성 검사**: `zodResolver`를 이용해 실시간으로 유효성을 검사합니다.
 * - **제출 중 로딩 상태 관리**: API 요청 중에는 버튼을 비활성화하고 로딩 상태를 표시합니다.
 * - **자동 로그인**: 회원가입 성공 시, 즉시 로그인 상태로 전환하며 Zustand 스토어에 사용자 정보를 저장(`setUser`)합니다.
 * - **사용자 피드백**: `toast` 메시지를 통해 회원가입 성공 또는 실패에 대한 명확한 피드백을 제공합니다.
 * - **에러 핸들링**: `ky`의 `HTTPError`를 감지하여 네트워크 에러 메시지를 사용자에게 보여줍니다.
 *
 */
export default function SignUpForm() {
  const router = useRouter();
  const setUser = useRoamReadyStore((state) => state.setUser);

  const signupDefaultValues: SignupFormValues = {
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  };

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupRequestSchema),
    defaultValues: signupDefaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: SignupRequest) => {
    try {
      const user = await signup(data);

      if (user && user.id) {
        setUser(user);
        router.push(ROUTES.MAIN);
      } else {
        //! 에러 처리 - 백엔드가 토큰을 주지 않은 경우 (이론상 발생 가능)

        router.push(ROUTES.SIGNIN);
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      if (error instanceof HTTPError) {
        const errorResponse = await error.response.json();
        alert(errorResponse.message || '회원가입 중 오류가 발생했습니다.');
      } else {
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
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          회원가입
        </Button>
      </form>
    </FormProvider>
  );
}
