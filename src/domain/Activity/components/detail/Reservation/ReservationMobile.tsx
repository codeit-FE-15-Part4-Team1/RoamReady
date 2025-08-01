import dayjs from 'dayjs';

import { reserveAction } from '@/domain/Activity/actions/detail/reserve';
import { useReservationForm } from '@/domain/Activity/hooks/detail/useReservationForm';
import { Activity } from '@/domain/Activity/types/detail/types';
import Button from '@/shared/components/Button';
import { BottomSheet } from '@/shared/components/ui/bottom-sheet';
import { useToast } from '@/shared/hooks/useToast';

import AvailableTimeSection from './AvailableTimeSection';
import DateSelectSection from './DateSelectSection';
import ParticipantSelect from './ParticipationSection';

/**
 * ReservationMobile
 * 모바일 환경에서 체험 예약을 위한 날짜, 시간, 인원 선택을 단계적으로 진행하는 예약 폼 컴포넌트
 * 공통 BottomSheet 컴포넌트를 활용해 2가지 step으로 예약 폼 관리
 *
 * @param activity - 예약 대상이 되는 체험(Activity)의 정보 객체 (가격, ID 등 포함)
 * @returns 예약 금액 요약, 날짜/시간 선택, 인원 선택, 예약 버튼을 포함한 모바일 전용 예약 UI
 *
 * @example
 * <ReservationMobile activity={activityData} />
 */
export default function ReservationMobile({
  activity,
  reservation,
}: {
  activity: Activity;
  reservation: ReturnType<typeof useReservationForm>;
}) {
  const { showSuccess, showError } = useToast();

  // 예약 상태 및 관련 핸들러 훅 호출
  const {
    selectedDate,
    selectedTime,
    participantCount,
    reservableDates,
    timeSlots,
    selectedScheduleId,
    setSelectedDate,
    setSelectedTime,
    handleTimeSelect,
    handleIncrease,
    handleDecrease,
    onMonthChange,
  } = reservation;

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) return;

    const result = await reserveAction(
      activity.id,
      selectedScheduleId,
      participantCount,
    );

    if (result.statusCode !== 200) {
      showError(result.message);
      return;
    }

    showSuccess(result.message);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='fixed bottom-0 left-0 z-30 flex h-200 w-full flex-col justify-center gap-10 bg-white px-24 py-18'
    >
      <div className='flex flex-col gap-10'>
        <p className='font-size-18 font-bold'>
          ₩{activity.price.toLocaleString()}
          <span className='font-size-16 text-gray-550'>{` / ${participantCount}명`}</span>
        </p>

        <BottomSheet.Root>
          <BottomSheet.Trigger>
            <Button
              type='button'
              variant='primary'
              className='font-size-16 h-50 w-full'
            >
              예약하기
            </Button>
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
                  onMonthChange={onMonthChange}
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

            {/* Step 2: 인원 선택 */}
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
                  다음
                </Button>
              </BottomSheet.Footer>
            </BottomSheet.Step>

            {/*  Step 3: 예약 확인 */}
            <BottomSheet.Step>
              <BottomSheet.Header>예약 확인</BottomSheet.Header>
              <div className='space-y-10 px-20 py-30'>
                <p className='font-size-16 text-gray-800'>
                  일정:{' '}
                  <strong>
                    {dayjs(selectedDate).format('YYYY.MM.DD')} / {selectedTime}
                  </strong>
                </p>
                <p className='font-size-16 text-gray-800'>
                  인원: <strong>{participantCount}명</strong>
                </p>
                <hr className='my-10 border-gray-200' />
                <p className='font-size-18 font-bold'>
                  총 금액: ₩
                  {(activity.price * participantCount).toLocaleString()}
                </p>
              </div>
              <BottomSheet.Footer>
                <Button
                  variant='primary'
                  className='font-size-16 h-50 w-full'
                  disabled={!selectedDate || !selectedTime}
                  onClick={handleSubmit}
                >
                  예약하기
                </Button>
              </BottomSheet.Footer>
            </BottomSheet.Step>
          </BottomSheet.Content>
        </BottomSheet.Root>
      </div>
    </form>
  );
}
