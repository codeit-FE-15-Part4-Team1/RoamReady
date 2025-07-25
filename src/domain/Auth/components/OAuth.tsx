'use client';

import Image from 'next/image';

import Button from '@/shared/components/Button';

interface OAuthProps {
  pageType: 'signin' | 'signup';
}

/**
 * @component OAuth
 * @description
 * 소셜 로그인(OAuth) 버튼 UI와 관련 로직을 담당하는 재사용 가능한 클라이언트 컴포넌트입니다.
 * `pageType` prop에 따라 '로그인' 또는 '회원가입'으로 텍스트가 변경됩니다.
 *
 * @param {OAuthProps} props - 컴포넌트 props
 * @param {'signin' | 'signup'} props.pageType - 현재 페이지의 종류
 */
export default function OAuth({ pageType }: OAuthProps) {
  const buttonText =
    pageType === 'signin' ? '카카오 로그인' : '카카오 회원가입';

  const handleKakaoAuth = () => {
    // 1. .env 파일에 저장된 환경 변수를 가져옵니다.
    const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    // 2. 카카오 인가 코드를 요청할 URL을 만듭니다.
    //    이 URL은 로그인, 회원가입 모두 동일합니다.

    // ✨ 여기! state 파라미터에 pageType ('signin' 또는 'signup')을 추가합니다.
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&state=${pageType}`;

    // 3. 사용자를 카카오 인증 페이지로 이동시킵니다.
    window.location.href = kakaoAuthUrl;
    // TODO: pageType에 따라 다른 카카오 인증 URL로 리디렉션하는 로직 구현
    // const KAKAO_AUTH_URL = pageType === 'signin' ? '...' : '...';
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
        <span className='text-gray-700'>{buttonText}</span>
      </div>
    </Button>
  );
}
