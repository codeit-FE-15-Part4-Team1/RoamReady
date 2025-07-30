import dayjs from 'dayjs';

import Button from '@/shared/components/Button';
import { cn } from '@/shared/libs/cn';

type TimeSlot = { id: string | number; startTime: string; endTime: string };

interface AvailableTimeSectionProps {
  selectedDate: Date | null;
  timeSlots: TimeSlot[];
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  className?: string;
}

/**
 * AvailableTimeSection
 * 선택된 날짜를 기준으로 예약 가능한 시간대를 보여주는 UI 컴포넌트
 *
 * @param selectedDate - 현재 선택된 날짜 (날짜가 선택되지 않았을 경우 메시지 표시)
 * @param timeSlots - 예약 가능한 시간대 배열 (시작 및 종료 시간 포함)
 * @param selectedTime - 현재 선택된 시간대 문자열 (예: '13:00-14:00')
 * @param onTimeSelect - 시간대 선택 시 호출되는 콜백 함수
 * @param className - 타임 슬롯 리스트에 추가로 적용할 CSS 클래스
 * @returns 시간대 버튼 목록 또는 안내 메시지를 포함한 section 요소
 *
 * @example
 * <AvailableTimeSection
 *   selectedDate={new Date()}
 *   timeSlots={[{ id: 1, startTime: '10:00', endTime: '11:00' }]}
 *   selectedTime={'10:00-11:00'}
 *   onTimeSelect={(time) => setSelectedTime(time)}
 * />
 */
export default function AvailableTimeSection({
  selectedDate,
  timeSlots,
  selectedTime,
  onTimeSelect,
  className,
}: AvailableTimeSectionProps) {
  const now = dayjs();

  // 선택된 날짜가 있을 경우, 현재 시간 기준으로 지난 시간대 제외
  const filteredSlots =
    selectedDate !== null
      ? timeSlots.filter(({ startTime }) => {
          const fullStart = dayjs(
            `${dayjs(selectedDate).format('YYYY-MM-DD')}T${startTime}`,
          );
          return fullStart.isAfter(now);
        })
      : [];

  return (
    <section aria-labelledby='available-times' className='flex flex-col gap-14'>
      {/* 제목 영역 */}
      <h3 id='available-times' className='font-size-16 font-bold'>
        예약 가능한 시간
      </h3>

      <div className='relative'>
        {/* 시간 선택 버튼 렌더링 영역 (최대 높이를 벗어날 경우 스크롤 가능) */}
        <div
          className={cn(
            'scrollbar-none flex max-h-200 flex-col gap-10 overflow-y-auto',
            className,
          )}
        >
          {selectedDate ? (
            filteredSlots.length > 0 ? (
              filteredSlots.map(({ id, startTime, endTime }) => {
                const timeLabel = `${startTime}-${endTime}`;
                return (
                  <Button
                    key={id}
                    type='button'
                    variant='outline'
                    selected={selectedTime === timeLabel}
                    onClick={() => onTimeSelect(timeLabel)}
                    className='font-size-16 min-h-50 w-full border-2 font-medium'
                  >
                    {timeLabel}
                  </Button>
                );
              })
            ) : (
              <span className='font-size-14 text-gray-400'>
                예약 가능한 시간이 없습니다.
              </span>
            )
          ) : (
            <span className='font-size-14 text-gray-400'>
              날짜를 먼저 선택해주세요.
            </span>
          )}
        </div>

        {/* 흐림 효과: 타임 슬롯이 많아 스크롤이 필요한 경우 하단 fade 효과 표시 */}
        {filteredSlots.length >= 3 && (
          <div className='pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-white to-transparent' />
        )}
      </div>
    </section>
  );
}
