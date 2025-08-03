'use client';

import Image from 'next/image';

import Button from '@/shared/components/Button';

/**
 * @property {'signin' | 'signup'} pageType - 현재 페이지의 종류를 나타냅니다.
 * 'signin'은 로그인 페이지를, 'signup'은 회원가입 페이지를 의미하며,
 * 이에 따라 OAuth 버튼의 텍스트 및 관련 로직이 변경됩니다.
 */
interface OAuthProps {
  pageType: 'signin' | 'signup';
}

/**
 * @component OAuth
 * @description
 * 소셜 로그인(OAuth) 버튼 UI와 관련 로직을 담당하는 재사용 가능한 클라이언트 컴포넌트입니다.
 * 이 컴포넌트는 `pageType` prop에 따라 버튼의 텍스트가 '카카오 로그인' 또는 '카카오 회원가입'으로 변경되며, 카카오 OAuth 인증 흐름을 시작합니다.
 *
 * @param {object} props - 컴포넌트의 props입니다.
 * @param {'signin' | 'signup'} props.pageType - 현재 페이지의 종류를 나타냅니다.
 * - `'signin'`은 로그인 페이지를, `'signup'`은 회원가입 페이지를 의미합니다.
 * - 이 값은 카카오 인증 URL의 `state` 파라미터로 전달되어, 인증 완료 후 리디렉션될 때 어떤 종류의 인증 요청이었는지(로그인 또는 회원가입) 식별하는 데 사용됩니다.
 *
 * @example
 * 로그인 페이지에서 사용 시:
 * <OAuth pageType="signin" />
 *
 * 회원가입 페이지에서 사용 시:
 * <OAuth pageType="signup" />
 *
 * @function generateRandomState
 * CSRF 공격을 방지하기 위해 OAuth 요청에 사용되는 고유한 `state` 값을 생성합니다.
 * 이 `state`는 현재 페이지 타입(`signin` 또는 `signup`)과 난수로 구성되며, (예: 'signin:xyz123')
 * OAuth 인증 후 콜백에서 해당 요청의 정당성을 검증하는 데 사용됩니다.
 *
 * @function handleKakaoAuth
 * 카카오 인증 프로세스를 시작하는 내부 핸들러 함수입니다.
 * 1. `.env` 파일에 저장된 `NEXT_PUBLIC_KAKAO_REST_API_KEY`와 `NEXT_PUBLIC_KAKAO_REDIRECT_URI` 환경 변수를 가져옵니다.
 * 2. 카카오 인가 코드를 요청할 URL을 동적으로 생성합니다.
 * 3. `pageType`이 'signup'일 경우, `prompt=consent` 파라미터를 추가하여 항상 동의 화면이 표시되도록 합니다.
 * 4. 생성된 URL로 사용자를 리디렉션하여 카카오 인증 페이지로 이동시킵니다.
 */
export default function OAuth({ pageType }: OAuthProps) {
  const buttonText =
    pageType === 'signin' ? '카카오 로그인' : '카카오 회원가입';

  const generateRandomState = (pageType: 'signin' | 'signup') => {
    const randomId = crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
    const state = `${pageType}:${randomId}`;
    return state;
  };

  const handleKakaoAuth = () => {
    const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    if (!KAKAO_CLIENT_ID || !KAKAO_REDIRECT_URI) {
      console.error('카카오 OAuth 환경 변수가 설정되지 않았습니다.');
      return;
    }

    const state = generateRandomState(pageType);

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&state=${state}`;

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
        <span className='text-gray-700'>{buttonText}</span>
      </div>
    </Button>
  );
}
