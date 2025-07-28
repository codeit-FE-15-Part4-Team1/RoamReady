'use client';

import { useRouter } from 'next/navigation';

import { reserveAction } from '@/domain/Activity/actions/detail/reserve';
import { useReservationForm } from '@/domain/Activity/hooks/detail/useReservationForm';
import { Activity } from '@/domain/Activity/types/detail/types';
import Button from '@/shared/components/Button';
import { useToast } from '@/shared/hooks/useToast';

import AvailableTimeSection from './AvailableTimeSection';
import DateSelectSection from './DateSelectSection';
import ParticipantSelect from './ParticipationSection';

/**
 * ReservationPC
 * 데스크탑 환경에서 체험 예약을 위한 날짜, 시간, 인원 선택 및 총 합계를 표시하는 사이드 예약 폼 컴포넌트
 *
 * @param activity - 예약 대상이 되는 체험(Activity)의 정보 객체 (가격, 제목, ID 등 포함)
 * @returns 날짜, 시간, 인원 수 선택 및 총 합계와 함께 예약하기 버튼을 포함한 예약 UI
 *
 * @example
 * <ReservationPC activity={activityData} />
 */
export default function ReservationPC({ activity }: { activity: Activity }) {
  const router = useRouter();

  const { showError, showSuccess } = useToast();

  // 예약 상태 및 관련 핸들러 훅 호출
  const {
    selectedDate,
    selectedTime,
    participantCount,
    reservableDates,
    timeSlots,
    totalPrice,
    selectedScheduleId,
    setSelectedDate,
    setSelectedTime,
    handleTimeSelect,
    handleIncrease,
    handleDecrease,
    onMonthChange,
  } = useReservationForm(activity.price, activity.id);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) return;

    try {
      await reserveAction(activity.id, selectedScheduleId, participantCount);
      showSuccess('예약이 완료되었습니다!');
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (err) {
      showError(
        err instanceof Error
          ? err.message
          : '예약 처리 중 오류가 발생했습니다.',
      );
    }
  };

  return (
    <aside
      aria-label='예약 정보'
      className='h-fit max-h-950 w-400 rounded-4xl border-1 border-gray-50 bg-white p-30 shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
    >
      {/* Todo: form action 연결 */}
      <form className='flex flex-col gap-24' onSubmit={handleSubmit}>
        {/* 가격 정보 */}
        <section aria-labelledby='pricing'>
          <div className='flex items-center gap-8'>
            <h2 id='pricing' className='font-size-24 font-bold'>
              ₩ {activity.price.toLocaleString()}
            </h2>
            <span className='font-size-20 font-medium text-gray-500'>/ 인</span>
          </div>
        </section>

        {/* 날짜 선택 */}
        <DateSelectSection
          selectedDate={selectedDate}
          onDateChange={(date) => {
            setSelectedDate(date);
            setSelectedTime(null);
          }}
          reservableDates={reservableDates}
          onMonthChange={onMonthChange}
        />

        {/* 참여 인원 수 선택 */}
        <ParticipantSelect
          count={participantCount}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />

        {/* 예약 가능 시간대 */}
        <AvailableTimeSection
          selectedDate={selectedDate}
          timeSlots={timeSlots}
          selectedTime={selectedTime}
          onTimeSelect={handleTimeSelect}
          className='max-h-250'
        />

        {/* 총 합계 및 예약 버튼 */}
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
