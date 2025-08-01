import { getMyActivities } from '@/app/api/my-activities/api';
import ReservationDashboard from '@/domain/Reservation/components/reservation-calendar/ReservationDashboard';
import Nothing from '@/shared/components/ui/nothing';

export default async function MyReservationStatusPage() {
  const initialActivities = await getMyActivities();
  return (
    <div className='flex w-full flex-col gap-16'>
      <div className='flex-start flex flex-col gap-10'>
        <h3 className='font-size-18 font-bold'>예약 현황</h3>
        <span className='font-size-14 font-semibold text-gray-200'>
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </span>
      </div>

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
