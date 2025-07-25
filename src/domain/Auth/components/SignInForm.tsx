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

/**
 * @component SignInForm
 * @description
 * 이메일/비밀번호를 이용한 로그인 폼의 UI와 상태 관리, 제출 로직을 담당하는 클라이언트 컴포넌트입니다.
 * `react-hook-form`과 `zod`를 사용하여 유효성 검사를 수행합니다.
 *
 * ### 주요 기능:
 * - `useForm`을 통한 폼 상태 관리
 * - `zodResolver`를 이용한 실시간 유효성 검사
 * - `handleSubmit`을 통해 폼 데이터를 `signin` 서비스로 전달하여 API 요청
 * - 제출 중 로딩 상태 관리
 * - 성공 시 메인 페이지 이동
 * - 사용자에게 에러 메시지 표시
 */
export default function SignInForm() {
  const router = useRouter();

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
      router.push(ROUTES.MAIN);
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
