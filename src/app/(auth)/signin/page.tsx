'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';

import type { SigninRequest } from '@/domain/Auth/schemas/request';
import { signinRequestSchema } from '@/domain/Auth/schemas/request';
import { signin } from '@/domain/Auth/services';
import Button from '@/shared/components/Button';
import Input from '@/shared/components/ui/input';
import { AUTH_ROUTES } from '@/shared/constants/routes';

/**
 * @component SignInPage
 * @description
 * 이메일과 비밀번호를 이용한 사용자 로그인 페이지입니다.
 * `react-hook-form`과 `zod`를 통합하여 폼의 상태 관리 및 클라이언트 측 유효성 검사를 처리합니다.
 *
 * 이 컴포넌트는 다음과 같은 주요 기능을 수행합니다:
 *
 * 1.  **`useForm` 초기화**:
 * `useForm<SigninRequest>` 훅을 호출하여 로그인 폼의 모든 상태와 메서드를 생성합니다.
 * `resolver`로 `zodResolver(signinRequestSchema)`를 설정하여 `zod` 스키마를 기반으로 자동 유효성 검사를 수행합니다.
 * `defaultValues`로 `signinDefaultValues`를 설정하여 폼 필드의 초기값을 제공합니다.
 * `form` 변수에는 `react-hook-form`이 제공하는 `handleSubmit`, `formState`, `register` 등 모든 폼 관리 속성 및 메서드가 담겨 있습니다.
 *
 * 2.  **폼 속성 분해 할당**:
 * `form` 객체에서 `handleSubmit`과 `formState: { isSubmitting }`을 분해 할당하여 직접 사용합니다.
 * - `handleSubmit`: 폼 제출 시 유효성 검사를 트리거하고, 유효성 검사 통과 시 `onSubmit` 콜백을 실행하는 핵심 함수입니다.
 * - `isSubmitting`: 폼이 현재 제출(비동기 작업) 중인지를 나타내는 불리언 상태로, 제출 버튼의 활성화/비활성화 및 로딩 UI 표시에 사용됩니다.
 * `errors`는 `Input.Helper`가 `useFormContext`를 통해 자동으로 접근하므로 여기서는 분해 할당할 필요가 없습니다.
 * `register` 또한 `Input.Root` 내부에서 `useFormContext`를 통해 미리 바인딩된 형태로 사용되므로 여기에 직접 필요하지 않습니다.
 *
 * 3.  **`onSubmit` 폼 제출 핸들러**:
 * `handleSubmit`에 의해 호출되는 비동기 함수로, 폼의 유효한 `data`를 인수로 받습니다.
 * - `signin(data)` 서비스를 호출하여 실제 로그인 API 통신을 수행합니다.
 * - 로그인 성공 시 콘솔에 성공 메시지를 로깅하고, 추후 리다이렉션 등의 성공 처리 로직을 구현합니다.
 * - 로그인 실패 시 에러를 콘솔에 로깅하고, 사용자에게 토스트 메시지를 표시하는 등의 오류 처리 로직을 구현합니다.
 *
 * 4.  **`FormProvider`를 통한 컨텍스트 제공**:
 * 렌더링되는 모든 폼 요소는 `<FormProvider {...form}>`으로 감싸져 있습니다. 이는 `useForm`이 반환하는 모든 폼 관련 메서드와 상태를 React Context를 통해 하위 컴포넌트(예: `Input.Root`, `Input.Helper`, `Input.Field`)에 제공하여, 이들 컴포넌트가 `useFormContext` 훅을 통해 폼 상태에 쉽게 접근하고 상호작용할 수 있도록 합니다.
 *
 * 5.  **폼 UI 구성**:
 * - `Input.Root` 컴포넌트를 사용하여 이메일과 비밀번호 입력 필드를 구성합니다. 각 `Input.Root`는 `id`, `name`, `type` 속성을 가집니다.
 * - `Input.Label`, `Input.Field`, `Input.Helper` 컴포넌트들이 `Input.Root`의 자식으로 배치되어 입력 필드의 레이블, 실제 입력 필드, 그리고 유효성 검사 오류 메시지 등을 표시합니다. `Input.Helper`는 `FormProvider`로부터 `errors` 객체를 받아 자동으로 오류 메시지를 표시합니다.
 * - `비밀번호` 필드에는 `Input.Trigger`를 사용하여 비밀번호 가시성 토글 기능을 제공합니다.
 * - `로그인` 버튼은 `isSubmitting` 상태에 따라 텍스트가 '로그인 중...'으로 변경되고 비활성화됩니다.
 * - 카카오 로그인 버튼과 "아직 계정이 없으신가요?" 텍스트 및 회원가입(`AUTH_ROUTES.SIGNUP`) 링크를 포함합니다. 카카오 로그인 버튼은 일반적으로 즉시 외부 인증 페이지로 리디렉션되므로 별도의 로딩 상태를 표시하지 않습니다.
 */
export default function SignInPage() {
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
      //TODO 성공 처리 (리다이렉트)
    } catch (error) {
      console.error('로그인 실패:', error);
      //TODO 오류 처리 (사용자에게 토스트 메시지 표시)
    }
  };

  return (
    <FormProvider {...form}>
      <div className='font-size-16 flex w-full max-w-640 flex-col items-center justify-center gap-30'>
        <div className='flex flex-col items-center gap-23'>
          {/* w + aspect ratio  */}
          <Image
            src='/logos/logo-symbol-blue.svg'
            alt='RoamReady Logo'
            width={144}
            height={144}
          />

          <Image
            src='/logos/logo-1-blue.svg'
            alt='RoamReady Logo Text'
            width={255}
            height={31}
          />
        </div>

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

        <div className='relative flex w-full items-center'>
          <div className='w-full border-t border-gray-100' />
          <span className='text-gray-550 absolute left-1/2 -translate-x-1/2 bg-white px-7.5'>
            or
          </span>
        </div>

        <Button
          variant='primary'
          size='large'
          className='bg-kakao hover:bg-kakao/80 w-full py-17.5'
        >
          <div className='relative flex w-full items-center justify-center gap-0.5'>
            {/* <Kakao className='size-24' /> */}
            <Image
              src='/images/kakao-btn-sm.svg'
              alt='Kakao'
              width={24}
              height={24}
            />
            <span className='text-gray-700'>카카오 로그인</span>
          </div>
        </Button>

        <div className='flex justify-center gap-4'>
          <span className='text-gray-400'>아직 계정이 없으신가요?</span>
          <Link
            href={AUTH_ROUTES.SIGNUP}
            className='text-brand-2 hover:underline'
          >
            회원가입
          </Link>
        </div>
      </div>
    </FormProvider>
  );
}
