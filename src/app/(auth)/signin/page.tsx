import Link from 'next/link';
import { Suspense } from 'react';

import UrlMessageToast from '@/app/_components/UrlMessageToast';
import OAuth from '@/domain/Auth/components/OAuth';
import SignInForm from '@/domain/Auth/components/SignInForm';
import LogoSymbol from '@/shared/assets/logos/LogoSymbol';
import LogoTextOneLine from '@/shared/assets/logos/LogoTextOneline';
import { ROUTES } from '@/shared/constants/routes';

/**
 * @component SignInPage
 * @description
 * 로그인 페이지의 전체 레이아웃을 담당하는 서버 컴포넌트입니다.
 * 실제 상호작용 로직은 각각의 클라이언트 컴포넌트(<SignInForm />, <OAuth />)에 위임하여 초기 로딩 성능을 최적화합니다.
 * `useSearchParams`와 같은 클라이언트 훅을 사용하는 <SignInForm /> 컴포넌트가 서버에서 프리렌더링될 때 발생하는 오류를 방지하기 위해
 * <Suspense> 바운더리로 래핑합니다.
 */
export default function SignInPage() {
  return (
    <div className='font-size-16 flex w-full max-w-640 flex-col items-center justify-center gap-30'>
      <Suspense fallback={null}>
        <UrlMessageToast />
      </Suspense>

      <div className='flex flex-col items-center gap-23'>
        <LogoSymbol className='text-brand-2 size-144' />
        <LogoTextOneLine className='text-brand-2 aspect-[255/31] w-255' />
      </div>

      <Suspense fallback={<div>스켈레톤UI넣을예정...</div>}>
        <SignInForm />
      </Suspense>

      <div className='relative flex w-full items-center'>
        <div className='w-full border-t border-gray-100' />
        <span className='text-gray-550 absolute left-1/2 -translate-x-1/2 bg-white px-7.5'>
          or
        </span>
      </div>

      <OAuth pageType='signin' />

      <div className='flex justify-center gap-4'>
        <span className='text-gray-400'>아직 계정이 없으신가요?</span>
        <Link href={ROUTES.SIGNUP} className='text-brand-2 hover:underline'>
          회원가입
        </Link>
      </div>
    </div>
  );
}
