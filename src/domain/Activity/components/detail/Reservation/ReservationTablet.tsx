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
      setSelectedDate(null);
      return;
    }

    showSuccess(result.message);
  };

  return (
    <section
      // onSubmit={handleSubmit}
      className='fixed bottom-0 left-0 z-30 w-full bg-white px-24 py-18 pt-50'
    >
      {/* 가격 및 날짜 선택 버튼 영역 */}
      <div className='flex flex-col gap-30'>
        {/* 가격 및 인원 수 표시 */}
        <p className='font-size-18 font-bold'>
          ₩{activity.price.toLocaleString()}
          <span className='font-size-16 text-gray-550'>{` / ${participantCount}명`}</span>
        </p>

        {/* 예약하기 버튼이 BottomSheet.Trigger 역할 */}
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
            {/*  Step 1: 날짜 + 시간 + 인원 선택  */}
            <BottomSheet.Step>
              <BottomSheet.Header>예약 정보 선택</BottomSheet.Header>

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
                  variant='primary'
                  className='font-size-16 h-50 w-full'
                  disabled={!selectedDate || !selectedTime}
                >
                  다음
                </Button>
              </BottomSheet.Footer>
            </BottomSheet.Step>

            {/*  Step 2: 총 금액 확인 + 예약 확정 submit */}
            <BottomSheet.Step>
              <BottomSheet.Header>예약 확인</BottomSheet.Header>

              <div className='space-y-10 px-20 py-30'>
                <div className='font-size-18 flex gap-3 text-gray-800'>
                  <span>일정: </span>
                  <span className='font-bold'>
                    {selectedDate
                      ? dayjs(selectedDate).format('YYYY.MM.DD')
                      : '날짜 미선택'}{' '}
                    / {selectedTime ?? '시간 미선택'}
                  </span>
                </div>

                <p className='font-size-18 text-gray-800'>
                  인원: <strong>{participantCount}명</strong>
                </p>

                <hr className='my-10 border-gray-200' />

                <p className='font-size-20 font-bold'>
                  총 금액: ₩
                  {(activity.price * participantCount).toLocaleString()}
                </p>
              </div>

              <BottomSheet.Footer>
                <Button
                  type='button'
                  onClick={handleSubmit}
                  variant='primary'
                  className='font-size-16 h-50 w-full'
                  disabled={!selectedDate || !selectedTime}
                >
                  예약하기
                </Button>
              </BottomSheet.Footer>
            </BottomSheet.Step>
          </BottomSheet.Content>
        </BottomSheet.Root>
      </div>
    </section>
  );
}
