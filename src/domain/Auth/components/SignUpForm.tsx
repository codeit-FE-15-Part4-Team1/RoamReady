'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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

/**
 * @component SignUpForm
 * @description
 * 이메일/닉네임/비밀번호를 이용한 회원가입 폼의 UI와 상태 관리, 제출 로직을 담당하는 클라이언트 컴포넌트입니다.
 * `react-hook-form`과 `zod`를 사용하여 유효성 검사를 수행합니다.
 *
 * ### 주요 기능:
 * - `useForm`을 통한 폼 상태 관리
 * - `zodResolver`를 이용한 실시간 유효성 검사
 * - `handleSubmit`을 통해 폼 데이터를 `signup` 서비스로 전달하여 API 요청
 * - 제출 중 로딩 상태 관리
 * - 성공 시 메인 페이지 이동
 * - 사용자에게 에러 메시지 표시
 */
export default function SignUpForm() {
  const router = useRouter();

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
      const response = await signup(data);
      console.log('회원가입 성공:', response);
      router.push(ROUTES.MAIN);
    } catch (error) {
      console.error('회원가입 실패:', error);
      // TODO: 오류 처리 (사용자에게 토스트 메시지 표시 등)
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

        <Input.Root id='passwordConfirm' name='passwordConfirm' type='password'>
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
