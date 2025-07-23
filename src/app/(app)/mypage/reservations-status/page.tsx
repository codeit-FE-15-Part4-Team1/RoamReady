import ReservationCalendar from '@/domain/Reservation/components/reservation-calendar/ReservationCalendar';
import ReservationSelect from '@/domain/Reservation/components/reservation-calendar/ReservationSelect';

export default function MyReservationStatusPage() {
  return (
    <div className='flex w-full flex-col gap-16'>
      <div className='flex-start flex flex-col gap-10'>
        <h3 className='font-size-18 font-bold'>예약 현황</h3>
        <span className='font-semibold text-gray-200'>
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </span>
      </div>

      <div className='w-full'>
        <ReservationSelect />
      </div>

      <div className='w-full'>
        <ReservationCalendar />
      </div>
    </div>
  );
}
