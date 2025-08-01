import ReservationSection from '@/domain/Reservation/components/reservation-section/ReservationSection';

export default function MyReservationsPage() {
  return (
    <div>
      <h1 className='font-size-18 font-bold text-neutral-900'>예약내역</h1>
      <p className='font-size-16 text-neutral-700'>
        예약내역 변경 및 취소할 수 있습니다.
      </p>
      <ReservationSection />
    </div>
  );
}
