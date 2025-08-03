'use client';

import Image from 'next/image';

import Button from '@/shared/components/Button';

/**
 * @property {'signin' | 'signup'} pageType - 현재 페이지의 종류를 나타냅니다.
 * 'signin'은 로그인 페이지를, 'signup'은 회원가입 페이지를 의미합니다.
 */
interface OAuthProps {
  pageType: 'signin' | 'signup';
}

/**
 * @component OAuth
 * @description
 * 카카오 소셜 로그인을 시작하는 버튼 컴포넌트입니다.
 * `pageType`에 따라 로그인 또는 회원가입 흐름에 맞는 redirect URI를 사용하여 카카오 인가 코드 요청을 시작합니다.
 *
 * - `NEXT_PUBLIC_KAKAO_SIGNIN_REDIRECT_URI`는 로그인 전용 redirect URI입니다.
 * - `NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI`는 회원가입 전용 redirect URI입니다.
 *
 * 카카오는 인가 코드를 한 번만 사용할 수 있기 때문에,
 * 로그인과 회원가입 요청을 명확히 분리하여 각각 새로운 인가 코드를 받아야 합니다.
 * 따라서 인증 URL 생성 시 `pageType`에 따라 서로 다른 redirect URI를 사용합니다.
 *
 * @param {object} props - 컴포넌트의 props입니다.
 * @param {'signin' | 'signup'} props.pageType - 현재 페이지의 유형 (로그인 또는 회원가입)
 *
 * @example
 * <OAuth pageType="signin" />
 * <OAuth pageType="signup" />
 *
 * @function handleKakaoAuth
 * 카카오 인증 페이지로 이동하는 함수입니다.
 * 환경 변수에서 각 redirect URI를 가져와 `window.location.href`로 리디렉션합니다.
 */
export default function OAuth({ pageType }: OAuthProps) {
  const handleKakaoAuth = () => {
    const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const KAKAO_SIGNIN_REDIRECT_URI =
      process.env.NEXT_PUBLIC_KAKAO_SIGNIN_REDIRECT_URI;
    const KAKAO_SIGNUP_REDIRECT_URI =
      process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI;

    if (
      !KAKAO_CLIENT_ID ||
      !KAKAO_SIGNIN_REDIRECT_URI ||
      !KAKAO_SIGNUP_REDIRECT_URI
    ) {
      console.error('카카오 OAuth 환경 변수가 설정되지 않았습니다.');
      return;
    }

    const redirectUri =
      pageType === 'signin'
        ? KAKAO_SIGNIN_REDIRECT_URI
        : KAKAO_SIGNUP_REDIRECT_URI;

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${redirectUri}`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <Button
      variant='primary'
      size='small'
      className='bg-kakao hover:bg-kakao/80 w-full py-17.5'
      onClick={handleKakaoAuth}
    >
      <div className='relative flex w-full items-center justify-center gap-0.5'>
        <Image
          src='/icons/kakao-btn-sm.svg'
          alt='Kakao Icon'
          width={24}
          height={24}
        />
        <span className='text-gray-700'>Kakao로 시작하기</span>
      </div>
    </Button>
  );
}
