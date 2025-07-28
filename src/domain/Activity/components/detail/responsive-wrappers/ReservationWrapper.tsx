'use client';

import Link from 'next/link';

import FallbackUI from '@/domain/Activity/components/detail/responsive-wrappers/FallbackUI';
import { useReservationForm } from '@/domain/Activity/hooks/detail/useReservationForm';
import { Activity, ReviewList } from '@/domain/Activity/types/detail/types';
import Button from '@/shared/components/Button';
import Footer from '@/shared/components/layouts/footer/Footer';
import { BREAKPOINTS } from '@/shared/constants/breakpoints';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useRoamReadyStore } from '@/shared/store';

import ActivitySummary from '../activity-summary/ActivitySummary';
import ReservationMobile from '../Reservation/ReservationMobile';
import ReservationPC from '../Reservation/ReservationPC';
import ReservationTablet from '../Reservation/ReservationTablet';

export default function ReservationWrapper({
  activity,
  reviews,
}: {
  activity: Activity;
  reviews: ReviewList;
}) {
  const isMobile = useMediaQuery(BREAKPOINTS.MOBILE);
  const isTablet = useMediaQuery(BREAKPOINTS.TABLET);

  const user = useRoamReadyStore((state) => state.user);
  const isLogin = Boolean(user);
  const isOwner = user?.id === activity.userId;

  const reservation = useReservationForm(activity.price, activity.id);

  // PC
  if (!isMobile && !isTablet) {
    if (!isLogin || isOwner) {
      return (
        <div className='sticky top-40 flex flex-col gap-38'>
          <div className='w-400'>
            <ActivitySummary activity={activity} review={reviews} />
          </div>
          <FallbackUI isOwner={isOwner} isLogin={isLogin} />
        </div>
      );
    }

    return (
      <div className='sticky top-40 flex flex-col gap-38'>
        <div className='w-400'>
          <ActivitySummary activity={activity} review={reviews} />
        </div>
        <ReservationPC activity={activity} reservation={reservation} />
      </div>
    );
  }

  // 모바일/태블릿
  if (!isLogin) {
    return null; // 비로그인 시 UI 없음
  }

  if (isOwner) {
    return (
      <div className='flex-center pt-50'>
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

  return (
    <>
      {isMobile ? (
        <ReservationMobile activity={activity} reservation={reservation} />
      ) : (
        <ReservationTablet activity={activity} reservation={reservation} />
      )}
      <div className={isTablet ? 'pt-100' : ''}>
        <Footer />
      </div>
    </>
  );
}
