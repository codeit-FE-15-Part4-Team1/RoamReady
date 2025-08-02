import MyPageContentHeader from '@/domain/Reservation/components/header';
import ReservationSection from '@/domain/Reservation/components/reservation-section/ReservationSection';

export default function MyReservationsPage() {
  return (
    <div>
      <MyPageContentHeader title='예약내역' />
      <ReservationSection />
    </div>
  );
}
