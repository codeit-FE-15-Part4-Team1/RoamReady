'use client';

import Link from 'next/link';

import FallbackUI from '@/domain/Activity/components/detail/responsive-wrappers/FallbackUI';
import { useReservationForm } from '@/domain/Activity/hooks/detail/useReservationForm';
import { Activity, ReviewList } from '@/domain/Activity/types/detail/types';
import Button from '@/shared/components/Button';
import { BREAKPOINTS } from '@/shared/constants/breakpoints';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useRoamReadyStore } from '@/shared/store';

import ActivitySummary from '../activity-summary/ActivitySummary';
import ReservationMobile from '../Reservation/ReservationMobile';
import ReservationPC from '../Reservation/ReservationPC';
import ReservationTablet from '../Reservation/ReservationTablet';

/**
 * ReservationWrapper
 *
 * 사용자의 디바이스 크기와 로그인 여부, 소유 여부에 따라 예약 UI를 다르게 렌더링합니다.
 * useReservationForm 훅은 공통 상태를 Wrapper에서 한 번만 호출하여 하위 컴포넌트에 전달합니다.
 */
export default function ReservationWrapper({
  activity,
  reviews,
}: {
  activity: Activity;
  reviews: ReviewList;
}) {
  // 반응형 구분
  const isMobile = useMediaQuery(BREAKPOINTS.MOBILE);
  const isTablet = useMediaQuery(BREAKPOINTS.TABLET);

  // 로그인 및 체험 등록 당사자 여부 판별
  const user = useRoamReadyStore((state) => state.user);
  const isLogin = Boolean(user);
  const isOwner = user?.id === activity.userId;

  // 공통 예약 상태 훅 호출 (날짜, 시간, 인원 등) 하위 PC,MOBILE,TABLET 에 전달
  const reservation = useReservationForm(activity.price, activity.id);

  // PC
  if (!isMobile && !isTablet) {
    // 비로그인 상태이거나 체험 작성자 본인일 경우 → 예약 폼 대신 요약 + 안내 UI
    if (!isLogin || isOwner) {
      return (
        <div className='sticky top-40 flex flex-col gap-38'>
          <div className='w-400'>
            {/* 체험 요약 정보 + 후기 */}
            <ActivitySummary activity={activity} review={reviews} />
          </div>
          {/* 로그인 유도 또는 본인 체험 안내 */}
          <FallbackUI isOwner={isOwner} isLogin={isLogin} />
        </div>
      );
    }

    // 일반 사용자 (PC, 로그인, 소유자 아님) → 예약 폼 노출
    return (
      <div className='sticky top-150 flex flex-col gap-38'>
        <div className='w-400'>
          <ActivitySummary activity={activity} review={reviews} />
        </div>
        <ReservationPC activity={activity} reservation={reservation} />
      </div>
    );
  }

  // 모바일/태블릿

  // 비로그인 사용자는 예약 UI 미노출
  if (!isLogin) {
    return null;
  }

  // 체험 작성자 본인은 예약 폼 대신 '내 체험 예약 현황' 버튼만 노출
  if (isOwner) {
    return (
      <div className='flex-center tablet:pt-50 tablet:pb-0 pt-20 pb-50'>
        <Button
          className='hover:bg-brand-2 font-size-12 h-40 w-160 border-gray-50 hover:text-white'
          asChild
        >
          <Link href='/mypage/reservations-status'>
            내 체험 예약 현황 보러가기
          </Link>
        </Button>
      </div>
    );
  }

  // 일반 사용자 (모바일/태블릿) → 예약 폼 노출
  return (
    <>
      {isMobile ? (
        <ReservationMobile activity={activity} reservation={reservation} />
      ) : (
        <ReservationTablet activity={activity} reservation={reservation} />
      )}
    </>
  );
}
