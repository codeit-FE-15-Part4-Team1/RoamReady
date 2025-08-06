'use client';

import Image from 'next/image';

import Button from '@/shared/components/Button';

/**
 * @component OAuth
 * @description
 * 카카오 소셜 로그인을 시작하는 버튼 컴포넌트입니다.
 *
 * 이 컴포넌트는 클릭 시 로그인 전용 redirect URI로 이동하여 카카오 인가 코드를 요청합니다.
 * 이후 백엔드는 해당 인가 코드를 사용해 로그인 시도를 하며,
 * 회원가입이 필요할 경우 자동으로 `/kakao/transition` 페이지로 리디렉션합니다.
 *
 * ⚠️ 인가 코드는 한 번만 사용할 수 있으므로,
 * 로그인 실패 후 회원가입 시도는 반드시 새로운 인가 코드를 통해 이루어집니다.
 *
 * @remarks
 * 환경 변수:
 * - `NEXT_PUBLIC_KAKAO_REST_API_KEY`: 카카오 REST API 키
 * - `NEXT_PUBLIC_KAKAO_SIGNIN_REDIRECT_URI`: 로그인 전용 redirect URI
 *
 *
 * @function handleKakaoAuth
 * 클릭 시 카카오 인증 페이지로 이동합니다.
 * 인증 완료 후 로그인용 redirect URI로 돌아옵니다.
 */
export default function OAuth() {
  const handleKakaoAuth = () => {
    const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const KAKAO_SIGNIN_REDIRECT_URI =
      process.env.NEXT_PUBLIC_KAKAO_SIGNIN_REDIRECT_URI;
    // const KAKAO_SIGNUP_REDIRECT_URI =
    //   process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI;

    if (
      !KAKAO_CLIENT_ID ||
      !KAKAO_SIGNIN_REDIRECT_URI
      // || !KAKAO_SIGNUP_REDIRECT_URI
    ) {
      console.error('카카오 OAuth 환경 변수가 설정되지 않았습니다.');
      return;
    }

    const redirectUri = KAKAO_SIGNIN_REDIRECT_URI;

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
