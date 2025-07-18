'use client';
import Image from 'next/image';
import Link from 'next/link';

// import Kakao from '@/shared/assets/images/kakao-btn-sm.svg';
// import LogoText from '@/shared/assets/logos/logo-text-oneline.svg';
// import Kakao from '/images/kakao-btn-sm.svg';
import Button from '@/shared/components/Button';
import Input from '@/shared/components/ui/input';

export default function SignInPage() {
  return (
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

      <form className='flex w-full flex-col gap-20'>
        <Input.Root id='email' type='email'>
          <Input.Label>이메일</Input.Label>
          <Input.Field placeholder='이메일 주소를 작성해주세요' />
        </Input.Root>

        <Input.Root id='password' type='password'>
          <Input.Label>비밀번호</Input.Label>
          <Input.Field
            placeholder='비밀번호를 입력해주세요'
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
          <span>로그인</span>
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
        {/* //! 경로 상수화 */}
        <Link href='/signup' className='text-brand-2 hover:underline'>
          회원가입
        </Link>
      </div>
    </div>
  );
}
