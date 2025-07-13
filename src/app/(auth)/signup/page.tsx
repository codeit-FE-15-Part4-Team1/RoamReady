'use client';
import Link from 'next/link';

import Kakao from '@/shared/assets/images/kakao-btn-sm.svg';
import Logo from '@/shared/assets/logos/logo-symbol.svg';
import LogoText from '@/shared/assets/logos/logo-text-oneline.svg';
import Button from '@/shared/components/Button';
import Input from '@/shared/components/ui/input';

export default function SignUpPage() {
  return (
    <div className='font-size-16 flex w-full max-w-640 flex-col items-center justify-center gap-30'>
      <div className='flex flex-col items-center gap-23'>
        <Logo className='text-brand-2 h-144 w-144' />
        <LogoText className='text-brand-2 h-31 w-255' />
      </div>

      <form className='flex w-full flex-col gap-20'>
        <Input.Root id='email' type='email'>
          <Input.Label>이메일</Input.Label>
          <Input.Field placeholder='이메일 주소를 작성해주세요' />
        </Input.Root>

        <Input.Root id='username' type='text'>
          <Input.Label>닉네임</Input.Label>
          <Input.Field placeholder='닉네임을 작성해주세요' />
        </Input.Root>

        <Input.Root id='password' type='password'>
          <Input.Label>비밀번호</Input.Label>
          <Input.Field
            placeholder='비밀번호를 입력해주세요'
            rightIcon={<Input.Trigger triggerType='password-toggle' />}
          />
        </Input.Root>

        <Input.Root id='password-confirm' type='password'>
          <Input.Label>비밀번호 확인</Input.Label>
          <Input.Field
            placeholder='비밀번호를 다시 입력해주세요'
            rightIcon={<Input.Trigger triggerType='password-toggle' />}
          />
        </Input.Root>

        <Button
          type='submit'
          variant='primary'
          size='small'
          className='mt-10 w-full py-17.5'
          // loading={isSubmitting}
        >
          회원가입
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
        size='small'
        className='bg-kakao hover:bg-kakao/80 w-full py-17.5'
      >
        <div className='relative flex w-full items-center justify-center gap-0.5'>
          <Kakao className='h-24 w-24' />
          <span className='text-gray-700'>카카오 회원가입</span>
        </div>
      </Button>

      <div className='flex justify-center gap-4'>
        <span className='text-gray-400'>이미 회원이신가요?</span>
        {/* //! 경로 상수화 */}
        <Link href='/signin' className='text-brand-2 hover:underline'>
          로그인
        </Link>
      </div>
    </div>
  );
}
