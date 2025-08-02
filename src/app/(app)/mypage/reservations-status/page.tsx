import { getMyActivities } from '@/app/api/my-activities/api';
import MyPageContentHeader from '@/domain/Reservation/components/header';
import ReservationDashboard from '@/domain/Reservation/components/reservation-calendar/ReservationDashboard';
import Nothing from '@/shared/components/ui/nothing';

export default async function MyReservationStatusPage() {
  const initialActivities = await getMyActivities();
  return (
    <div className='flex w-full flex-col gap-16'>
      <MyPageContentHeader title='예약 현황' />

      {/* 가져온 초기 데이터를 클라이언트 컴포넌트에 props로 전달합니다. */}
      {/* initialActivities가 null일 경우를 대비해 에러 메시지나 빈 상태를 보여주는 것이 좋습니다. */}
      {initialActivities ? (
        <ReservationDashboard initialActivities={initialActivities} />
      ) : (
        <Nothing type='activity' />
      )}
    </div>
  );
}
