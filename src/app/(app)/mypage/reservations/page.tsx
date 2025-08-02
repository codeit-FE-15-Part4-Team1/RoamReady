import MyPageContentHeader from '@/domain/Reservation/components/header';
import ReservationSection from '@/domain/Reservation/components/reservation-section/ReservationSection';

export default function MyReservationsPage() {
  return (
    <div>
      <MyPageContentHeader
        title='예약내역'
        description='예약내역 변경 및 취소할 수 있습니다.'
      />
      <ReservationSection />
    </div>
  );
}
