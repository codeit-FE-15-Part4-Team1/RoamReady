'use client';

import { CircleAlert } from 'lucide-react';
import Link from 'next/link';

import Button from '@/shared/components/Button';

interface FallbackUIProps {
  isOwner: boolean;
  isLogin: boolean;
}

/**
 * FallbackUI 컴포넌트
 *
 * 로그인 상태 및 체험 소유 여부에 따라 예약 불가 메시지와
 * 적절한 안내 버튼을 보여주는 UI 컴포넌트입니다.
 *
 * @param {boolean} isOwner - 현재 사용자가 체험 소유자인지 여부
 * @param {boolean} isLogin - 현재 사용자의 로그인 상태
 *
 * @returns 로그인 필요 또는 예약 불가 안내 UI 렌더링
 *
 * @example
 * <FallbackUI isOwner={false} isLogin={true} />
 */
export default function FallbackUI({ isOwner, isLogin }: FallbackUIProps) {
  // 제목 텍스트 결정
  const title = !isLogin ? '로그인이 필요합니다' : isOwner ? '예약 불가' : '';

  // 설명 텍스트 결정
  const description = !isLogin
    ? '예약을 위해 로그인이 필요합니다.\n로그인 후 이용해주세요.'
    : isOwner
      ? '이 체험은 회원님이 직접 등록한 체험입니다.\n본인의 체험은 예약할 수 없습니다.'
      : '';

  // 버튼 경로 및 텍스트 조건부
  const buttonHref = !isLogin
    ? '/signin'
    : isOwner
      ? '/mypage/reservations-status'
      : '/signin';

  // 버튼 텍스트 결정
  const buttonText = !isLogin
    ? '로그인하러 가기'
    : isOwner
      ? '내 체험 예약 현황 보러가기'
      : '로그인하러 가기';

  return (
    <div className='flex-col-center h-700 w-400 gap-30 rounded-4xl border-1 border-gray-50 bg-white px-24 py-32 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]'>
      {/* 아이콘과 메시지 영역 */}
      <div className='font-size-18 flex-col-center mb-12 gap-15'>
        <CircleAlert className='text-brand-2 h-30 w-30' />
        <span className='font-bold whitespace-pre-line'>{title}</span>
        <p className='font-size-15 leading-35 whitespace-pre-line text-gray-600'>
          {description}
        </p>
      </div>

      {/* 안내 버튼 영역 */}
      <div className='flex-col-center gap-20'>
        <Button
          className='hover:bg-brand-2 font-size-12 h-40 w-160 border-gray-50 hover:text-white'
          asChild
        >
          <Link href={buttonHref}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
}
