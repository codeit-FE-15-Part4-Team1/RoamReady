'use client';


import { useReservationForm } from '@/domain/Activity/hooks/detail/useReservationForm';
import { Activity } from '@/domain/Activity/types/detail/types';
import Button from '@/shared/components/Button';
import { BottomSheet } from '@/shared/components/ui/bottom-sheet';

import AvailableTimeSection from './AvailableTimeSection';
import DateSelectSection from './DateSelectSection';
import ParticipantSelect from './ParticipationSection';

/**
 * ReservationTablet
 * 태블릿 환경에서 체험 예약을 위한 날짜, 시간, 인원 선택 UI를 제공하는 예약 폼 컴포넌트
 * 공통 BottomSheet 컴포넌트를 활용해 구현
 *
 * @param activity - 예약 대상 체험의 정보 객체 (가격, 제목, ID 등 포함)
 * @returns 예약 금액, 날짜/시간 선택, 인원 선택을 포함한 태블릿 전용 예약 UI
 *
 * @example
 * <ReservationTablet activity={activityData} />
 */
export default function ReservationTablet({
  activity,
}: {
  activity: Activity;
}) {
  // 예약 상태 및 관련 핸들러 훅 호출
  const {
    selectedDate,
    selectedTime,
    participantCount,
    reservableDates,
    timeSlots,
    setSelectedDate,
    setSelectedTime,
    handleTimeSelect,
    handleIncrease,
    handleDecrease,
    onMonthChange,
  } = useReservationForm(activity.price, activity.id);
  return (
    //  ✅ TODO: form action 연결
    <form className='fixed bottom-0 left-0 flex h-150 w-full flex-col justify-between bg-white px-24 py-18'>
      {/* 가격 및 날짜 선택 버튼 영역 */}
      <div className='flex items-center justify-between'>
        {/* 가격 및 인원 수 표시 */}
        <p className='font-size-18 font-bold'>
          ₩{activity.price.toLocaleString()}{' '}
          <span className='font-size-16 text-gray-550'>{`/ ${participantCount}명`}</span>
        </p>

        {/* 날짜 선택 버튼 + BottomSheet */}
        <BottomSheet.Root>
          <BottomSheet.Trigger>
            <button
              type='button'
              className='font-size-14 text-blue-500 underline'
            >
              날짜 선택하기
            </button>
          </BottomSheet.Trigger>

          <BottomSheet.Content>
            <div className='flex h-450 w-full gap-50'>
              <DateSelectSection
                selectedDate={selectedDate}
                onDateChange={(date) => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                reservableDates={reservableDates}
                onMonthChange={onMonthChange}
              />

              <div className='flex h-full w-450 flex-col gap-50 rounded-4xl border border-gray-50 p-20 shadow-[0_4px_20px_rgba(0,0,0,0.05)]'>
                <AvailableTimeSection
                  selectedDate={selectedDate}
                  timeSlots={timeSlots}
                  selectedTime={selectedTime}
                  onTimeSelect={handleTimeSelect}
                  className='max-h-250'
                />

                {selectedDate && (
                  <ParticipantSelect
                    count={participantCount}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                  />
                )}
              </div>
            </div>

            <BottomSheet.Footer>
              <Button
                disabled={!selectedDate || !selectedTime}
                variant='primary'
                className='font-size-16 h-50 w-full'
              >
                확인
              </Button>
            </BottomSheet.Footer>
          </BottomSheet.Content>
        </BottomSheet.Root>
      </div>

      <Button
        type='submit'
        variant='primary'
        className='font-size-16 h-50 w-full'
        disabled={!selectedDate || !selectedTime}
      >
        예약하기
      </Button>
    </form>
  );
}
