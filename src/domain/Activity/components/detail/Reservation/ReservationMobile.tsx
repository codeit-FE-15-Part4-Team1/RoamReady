import { useReservationForm } from '@/domain/Activity/hooks/detail/useReservationForm';
import { Activity } from '@/domain/Activity/types/detail/types';
import Button from '@/shared/components/Button';
import { BottomSheet } from '@/shared/components/ui/bottom-sheet';

import AvailableTimeSection from './AvailableTimeSection';
import DateSelectSection from './DateSelectSection';
import ParticipantSelect from './ParticipationSection';

export default function ReservationMobile({
  activity,
}: {
  activity: Activity;
}) {
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
  } = useReservationForm(activity.price);

  return (
    <form className='fixed bottom-0 left-0 z-30 flex h-200 w-full flex-col justify-center gap-10 bg-white px-24 py-18'>
      <div className='mx-auto flex w-full max-w-1200 items-center justify-between'>
        <p className='font-size-18 font-bold'>
          ₩{activity.price.toLocaleString()}
          <span className='font-size-16 text-gray-550'>{` / ${participantCount}명`}</span>
        </p>

        <BottomSheet.Root>
          <BottomSheet.Trigger>
            <button
              type='button'
              className='font-size-14 text-blue-500 underline'
            >
              날짜 선택
            </button>
          </BottomSheet.Trigger>

          <BottomSheet.Content hasMultiStep>
            {/* Step 1: 날짜 및 시간 선택 */}
            <BottomSheet.Step>
              <BottomSheet.Header>날짜 및 시간 선택</BottomSheet.Header>
              <div className='flex h-fit w-full flex-col gap-10 p-20'>
                <DateSelectSection
                  selectedDate={selectedDate}
                  onDateChange={(date) => {
                    setSelectedDate(date);
                    setSelectedTime(null);
                  }}
                  reservableDates={reservableDates}
                />

                <AvailableTimeSection
                  selectedDate={selectedDate}
                  timeSlots={timeSlots}
                  selectedTime={selectedTime}
                  onTimeSelect={handleTimeSelect}
                  className='max-h-200'
                />
              </div>

              <BottomSheet.Footer>
                <Button
                  variant='primary'
                  className='font-size-16 h-50 w-full'
                  disabled={!selectedDate || !selectedTime}
                >
                  다음
                </Button>
              </BottomSheet.Footer>
            </BottomSheet.Step>

            {/* Step 2: 참여 인원 선택 */}
            <BottomSheet.Step>
              <BottomSheet.Header>참여 인원 선택</BottomSheet.Header>
              <div className='h-80 px-20 py-30'>
                <ParticipantSelect
                  count={participantCount}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                />
              </div>

              <BottomSheet.Footer>
                <Button variant='primary' className='font-size-16 h-50 w-full'>
                  확인
                </Button>
              </BottomSheet.Footer>
            </BottomSheet.Step>
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
