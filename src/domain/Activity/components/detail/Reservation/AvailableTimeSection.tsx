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

export default function AvailableTimeSection({
  selectedDate,
  timeSlots,
  selectedTime,
  onTimeSelect,
  className,
}: AvailableTimeSectionProps) {
  return (
    <section aria-labelledby='available-times' className='flex flex-col gap-14'>
      <h3 id='available-times' className='font-size-16 font-bold'>
        예약 가능한 시간
      </h3>
      <div className='relative'>
        <div
          className={cn(
            'scrollbar-none flex max-h-200 flex-col gap-10 overflow-y-auto',
            className,
          )}
        >
          {selectedDate ? (
            timeSlots.length > 0 ? (
              timeSlots.map(({ id, startTime, endTime }) => {
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

        {/* 흐림 효과: 타임슬롯이 많을 때만 표시 */}
        {timeSlots.length >= 3 && (
          <div className='pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-white to-transparent' />
        )}
      </div>
    </section>
  );
}
