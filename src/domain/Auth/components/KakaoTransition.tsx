'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import type { TransitionNicknameFormValues } from '@/domain/Auth/schemas/request';
import { transitionNicknameSchema } from '@/domain/Auth/schemas/request';
import LogoSymbol from '@/shared/assets/logos/LogoSymbol';
import Button from '@/shared/components/Button';
import Input from '@/shared/components/ui/input';
import { cn } from '@/shared/libs/cn';

const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI!;
const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;

/**
 * @component KakaoTransition
 * @description
 * 이 컴포넌트는 카카오 OAuth 인증 흐름 중, 사용자가 로그인 또는 회원가입 과정에서 특정 상황에 따라 분기될 때 표시되는 전환 페이지입니다.
 *
 * 이 페이지는 URL 쿼리 파라미터로 전달된 `status`와 `message`를 읽어,
 * 상황에 맞는 안내 메시지를 표시하고 사용자를 다시 카카오 인증 페이지로 리디렉션하는 버튼을 제공합니다.
 *
 * @param {object} props - 이 컴포넌트는 props를 직접 사용하지 않으며, URL 쿼리 파라미터에 의존합니다.
 *
 * @example
 *  회원가입이 필요한 사용자를 위한 URL
 * /kakao/transition?status=need-signup&message=회원가입 먼저 진행해주세요.
 *
 *  일반적인 오류가 발생했을 때의 URL
 * /kakao/transition?status=some-error&message=처리 중 문제가 발생했습니다.
 *
 * ### 쿼리 파라미터
 * @param {string} status - 필요한 조치를 나타내는 상태 코드.
 * - `need-signup`: 사용자가 아직 회원이 아니므로 회원가입이 필요합니다.
 * - 그 외의 상태 코드(예: 서버 오류)는 일반적인 오류 메시지를 표시합니다.
 * @param {string} message - 사용자에게 보여줄 친화적인 메시지.
 *
 * ### 동작 흐름
 * 1. 컴포넌트는 URL 쿼리 파라미터에서 `status`와 `message`를 읽어옵니다.
 * 2. `status`가 'need-signup'인 경우, "회원 가입 먼저 진행해주세요."라는 메시지와 함께 사용자가 닉네임을 입력할 수 있는 입력 필드를 표시합니다.
 * 3. 사용자는 닉네임을 입력하고 "계속하기" 버튼을 클릭합니다.
 * 4. `handleRedirectToKakao` 함수가 실행되어 새로운 카카오 인가 URL을 생성합니다.
 * 5. 입력된 닉네임은 URL 인코딩되어 새로운 인가 URL의 `state` 파라미터로 포함됩니다.
 * 6. 사용자는 카카오 인증 페이지로 리디렉션되어 새로운 인가 코드를 받게 되며, 서버는 이 코드를 통해 회원가입 절차를 진행합니다.
 */
export default function KakaoTransition() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const message = searchParams.get('message');

  const methods = useForm<TransitionNicknameFormValues>({
    mode: 'onChange',
    resolver: zodResolver(transitionNicknameSchema),
    defaultValues: {
      nickname: '',
    },
  });

  const { getValues, formState } = methods;

  const handleRedirectToKakao = () => {
    const nickname = getValues('nickname');

    // 닉네임을 URL에 포함될 수 있도록 인코딩
    const encodedNickname = encodeURIComponent(nickname);

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&state=${encodedNickname}`;
    window.location.href = kakaoAuthUrl;
  };

  const notAMember = status === 'need-signup';

  const title = notAMember
    ? '회원 가입 먼저 진행해주세요.'
    : '처리 중 문제가 발생했습니다.';

  return (
    <FormProvider {...methods}>
      <div className='flex-col-center font-size-16 gap-4 p-4 text-center text-black'>
        <LogoSymbol className='text-brand-2 size-100' />
        <div className='flex-col-center'>
          <h2 className='font-size-20 font-semibold'>{title}</h2>
          <p className='text-gray-700'>{message}</p>
        </div>

        {notAMember && (
          <Input.Root name='nickname' type='text'>
            <Input.Field placeholder='닉네임을 입력해주세요' maxLength={11} />
            <Input.Helper />
          </Input.Root>
        )}

        <Button
          variant='primary'
          size='small'
          className={cn('w-full py-17.5', {
            'bg-kakao hover:bg-kakao/80': formState.isValid,
          })}
          onClick={handleRedirectToKakao}
          disabled={!formState.isValid}
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
    </FormProvider>
  );
}
