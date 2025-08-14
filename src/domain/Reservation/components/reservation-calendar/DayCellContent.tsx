import dayjs from 'dayjs';

import { ReservationStatus } from '@/domain/Reservation/types/reservation';
import {
  getColorClassByStatus,
  STATUS_LABELS,
} from '@/domain/Reservation/utils/reservation';

interface DisplayItem {
  status: ReservationStatus;
  count: number;
}

interface DayCellContentProps {
  day: dayjs.Dayjs;
  cellClasses: string;
  dateClasses: string;
  displayItems: DisplayItem[];
  onClick: () => void;
}

export default function DayCellContent({
  day,
  cellClasses,
  dateClasses,
  displayItems,
  onClick,
}: DayCellContentProps) {
  return (
    <div
      role='gridcell'
      aria-label={`${day.format('M월 D일')}`}
      className={cellClasses}
      onClick={onClick}
    >
      {/* 반응형 알림 점 */}
      {displayItems.length > 0 && (
        <div className='tablet:right-[25%] desktop:right-[30%] absolute top-5 right-[20%] size-4 rounded-full bg-red-500 md:size-5' />
      )}

      {/* 반응형 날짜 폰트 */}
      <div className={`${dateClasses} font-size-14 md:font-size-16`}>
        {day.format('D')}
      </div>

      <div className='mt-1 flex w-full flex-col items-center space-y-1 overflow-hidden'>
        {/* --- 모바일 뷰 (md 사이즈 미만) --- */}
        {displayItems.length > 0 && (
          <div className='w-full text-center md:hidden'>
            <div
              className={`font-size-10 inline-block w-[90%] truncate rounded-xl px-1 font-medium ${getColorClassByStatus(displayItems[0].status)}`}
            >
              {STATUS_LABELS[displayItems[0].status]} {displayItems[0].count}건
            </div>
          </div>
        )}

        {/* --- 데스크톱 뷰 (md 사이즈 이상) --- */}
        <div className='hidden w-full flex-col items-center space-y-1 md:flex'>
          {displayItems.map((item, index) => (
            <div
              key={`${day.format('YYYY-MM-DD')}-${item.status}-${index}-desktop`}
              className={`font-size-12 md:font-size-14 w-[90%] truncate rounded-xl px-1 text-center font-medium ${getColorClassByStatus(item.status)}`}
            >
              {STATUS_LABELS[item.status]} {item.count}건
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
