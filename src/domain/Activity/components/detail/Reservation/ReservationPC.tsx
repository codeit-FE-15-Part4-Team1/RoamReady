'use client';

import { useReservationForm } from '@/domain/Activity/hooks/detail/useReservationForm';
import { Activity } from '@/domain/Activity/types/detail/types';
import Button from '@/shared/components/Button';

import AvailableTimeSection from './AvailableTimeSection';
import DateSelectSection from './DateSelectSection';
import ParticipantSelect from './ParticipationSection';

export default function ReservationPC({ activity }: { activity: Activity }) {
  const {
    selectedDate,
    selectedTime,
    participantCount,
    reservableDates,
    timeSlots,
    totalPrice,
    setSelectedDate,
    setSelectedTime,
    handleTimeSelect,
    handleIncrease,
    handleDecrease,
  } = useReservationForm(activity.price);

  return (
    <aside
      aria-label='예약 정보'
      className='h-fit max-h-950 w-400 rounded-4xl border-1 border-gray-50 bg-white p-30 shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
    >
      <form className='flex flex-col gap-24'>
        <section aria-labelledby='pricing'>
          <div className='flex items-center gap-8'>
            <h2 id='pricing' className='font-size-24 font-bold'>
              ₩ {activity.price.toLocaleString()}
            </h2>
            <span className='font-size-20 font-medium text-gray-500'>/ 인</span>
          </div>
        </section>

        <DateSelectSection
          selectedDate={selectedDate}
          onDateChange={(date) => {
            setSelectedDate(date);
            setSelectedTime(null);
          }}
          reservableDates={reservableDates}
        />

        <ParticipantSelect
          count={participantCount}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />

        <AvailableTimeSection
          selectedDate={selectedDate}
          timeSlots={timeSlots}
          selectedTime={selectedTime}
          onTimeSelect={handleTimeSelect}
        />

        <div className='flex items-center justify-between border-t-1 border-gray-100 pt-24'>
          <section aria-labelledby='total-price'>
            <div className='flex items-center gap-8'>
              <h3
                className='font-size-20 font-medium text-gray-400'
                id='total-price'
              >
                총 합계
              </h3>
              <span className='font-size-20 text-950 font-bold'>
                ₩{totalPrice.toLocaleString()}
              </span>
            </div>
          </section>

          <Button
            variant='primary'
            className='font-size-16 h-50 w-135'
            type='submit'
            disabled={!selectedDate || !selectedTime}
          >
            예약하기
          </Button>
        </div>
      </form>
    </aside>
  );
}
