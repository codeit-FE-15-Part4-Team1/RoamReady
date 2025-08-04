'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import LogoSymbol from '@/shared/assets/logos/LogoSymbol';
import Button from '@/shared/components/Button';

const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI!;
const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;

/**
 * @component KakaoTransitionPage
 * @description
 * 카카오 OAuth 인증 흐름 중, 사용자가 로그인 또는 회원가입 중간에 분기되는 전환 페이지입니다.
 *
 * - 백엔드 응답에서 `403`, `404`, `409`, `400` 등의 상태 코드가 발생할 경우,
 *   서버는 클라이언트를 `/kakao/transition?status=...` 주소로 리디렉션합니다.
 *
 * - 해당 페이지는 쿼리 파라미터로 전달된 `status`, `message`를 읽고,
 *   상황에 따라 안내 메시지와 함께 다시 카카오 인증 페이지로 유도합니다.
 *
 * @example
 * ```
 * /kakao/transition?status=need-signup&message=회원가입 먼저 해주세요.
 *
 * ```
 *
 * ### 쿼리 파라미터
 * - `status`: 분기 상태 (`need-signup`)
 * - `message`: 사용자에게 표시할 메시지
 *
 * ### 동작 흐름
 * 1. `status`가 `need-signup`이면 "회원 가입 먼저 진행해주세요."라는 안내 문구가 표시됩니다.
 * 2. 버튼을 누르면 카카오 인증 페이지로 다시 리디렉션되어 새로운 인가 코드를 받게 됩니다.
 */
export default function KakaoTransition() {
  const searchParams = useSearchParams();

  const status = searchParams.get('status');
  const message = searchParams.get('message');

  const handleRedirectToKakao = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;
    window.location.href = kakaoAuthUrl;
  };

  const notAMember = status === 'need-signup';

  const title = notAMember
    ? '회원 가입 먼저 진행해주세요.'
    : '처리 중 문제가 발생했습니다.';

  return (
    <div className='flex-col-center font-size-16 gap-10 p-4 text-center text-black'>
      <LogoSymbol className='text-brand-2 size-100' />
      <h2 className='font-size-20 font-semibold'>{title}</h2>
      <p>{message ?? '아래 버튼을 눌러 회원가입하세요.'}</p>

      <Button
        variant='primary'
        size='small'
        className='bg-kakao hover:bg-kakao/80 w-full py-17.5'
        onClick={handleRedirectToKakao}
      >
        <div className='relative flex w-full items-center justify-center gap-0.5'>
          <Image
            src='/icons/kakao-btn-sm.svg'
            alt='Kakao Icon'
            width={24}
            height={24}
          />
          <span className='font-size-15 text-gray-800'>계속하기</span>
        </div>
      </Button>
    </div>
  );
}
