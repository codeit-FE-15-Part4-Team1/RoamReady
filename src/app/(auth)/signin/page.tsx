'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { FormProvider,useForm } from 'react-hook-form';

import type { SigninRequest } from '@/domain/Auth/schemas/request';
import { signinRequestSchema } from '@/domain/Auth/schemas/request';
import { signin } from '@/domain/Auth/services';
import Kakao from '@/shared/assets/images/kakao-btn-sm.svg';
import Logo from '@/shared/assets/logos/logo-symbol.svg';
import LogoText from '@/shared/assets/logos/logo-text-oneline.svg';
import Button from '@/shared/components/Button';
import Input from '@/shared/components/ui/input';
import { AUTH_ROUTES } from '@/shared/constants/routes';

export default function SignInPage() {
  // useForm 인스턴스를 form 변수에 저장하여 FormProvider에 전달합니다.
  const form = useForm<SigninRequest>({
    resolver: zodResolver(signinRequestSchema),
    // defaultValues를 추가하여 폼 필드의 초기 상태를 정의하는 것이 좋습니다.
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // form 객체에서 필요한 속성들을 분해할당합니다.
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    // register는 Input.Root 내부에서 useFormContext를 통해 사용되므로 여기에 필요 없습니다.
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
    // FormProvider로 전체 폼을 감싸서 useFormContext를 사용할 수 있게 합니다.
    <FormProvider {...form}>
      <div className='font-size-16 flex w-full max-w-640 flex-col items-center justify-center gap-30'>
        <div className='flex flex-col items-center gap-23'>
          <Logo className='text-brand-2 h-144 w-144' />
          <LogoText className='text-brand-2 h-31 w-255' />
          {/* 
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
        */}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex w-full flex-col gap-20'
        >
          <Input.Root id='email' name='email' type='email'>
            <Input.Label>이메일</Input.Label>
            <Input.Field placeholder='이메일 주소를 작성해주세요' />
            {/* Input.Helper는 이제 Context에서 errors 객체를 받아 자동으로 메시지를 표시합니다. */}
            <Input.Helper />
          </Input.Root>

          {/* Input.Root에 name 속성 추가 및 isError prop 제거 */}
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
            <Kakao className='h-24 w-24' />
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
