import { X } from 'lucide-react';
import { useMemo } from 'react';

import Popover from '@/shared/components/ui/popover';
import { usePopover } from '@/shared/components/ui/popover/PopoverContext';
import Tabs from '@/shared/components/ui/tabs';

import { allReservations } from '../../mock/reservation';
import type { DayCellProps } from '../../types/reservation';
import {
  getColorClassByStatus,
  getDisplayItems,
  STATUS_LABELS,
} from '../../utils/reservation';
import ReservationDetail from './ReservationDetail';

// 팝 오버 닫기 버튼
const CloseButton = () => {
  const { setIsOpen } = usePopover();

  return (
    <button onClick={() => setIsOpen(false)}>
      <X className='size-15 cursor-pointer font-bold' />
    </button>
  );
};

export default function DayCellPopover({
  day,
  isCurrentMonth,
  isToday,
  isLastRow,
  reservation,
}: DayCellProps) {
  // 표시할 예약 상태들을 우선순위별로 처리
  const displayItems = useMemo(
    () => getDisplayItems(reservation),
    [reservation],
  );

  // 스타일 계산
  const styles = useMemo(() => {
    const cellClasses = `
      relative flex min-w-[9rem] min-h-[12rem] cursor-pointer flex-col items-center py-12 cursor-pointer font-size-14
      hover:bg-gray-50 
      ${!isLastRow ? 'border-b-[0.05rem] border-gray-100' : ''} 
      ${!isCurrentMonth ? 'bg-gray-200 text-gray-400 opacity-50' : ''} 
      ${isToday ? 'border-blue-300 bg-blue-100' : ''}
    `;

    const dayOfWeek = day.day();
    const dateClasses = `font-size-14 ${
      dayOfWeek === 0
        ? 'text-red-500'
        : dayOfWeek === 6
          ? 'text-blue-500'
          : isCurrentMonth
            ? 'text-gray-900'
            : ''
    }`;

    return { cellClasses, dateClasses };
  }, [day, isCurrentMonth, isToday, isLastRow]);

  const hasReservations = displayItems.length > 0;

  // **핵심 수정: 현재 날짜에 해당하는 예약만 필터링**
  const currentDayString = day.format('YYYY-MM-DD');
  const currentDayReservations = allReservations.filter(
    (r) => r.date === currentDayString,
  );

  // 상태별로 예약 데이터 필터링 (현재 날짜 기준)
  const confirmedReservations = currentDayReservations.filter(
    (r) => r.status === 'confirmed',
  );
  const pendingReservations = currentDayReservations.filter(
    (r) => r.status === 'pending',
  );
  const completedReservations = currentDayReservations.filter(
    (r) => r.status === 'completed',
  );

  // 실제 예약 수 계산
  const totalReservations = currentDayReservations.length;
  const confirmedCount = confirmedReservations.length;
  const pendingCount = pendingReservations.length;
  const completedCount = completedReservations.length;

  return (
    <Popover.Root>
      <Popover.Trigger>
        <div
          role='gridcell'
          aria-label={`${day.format('M월 D일')}`}
          className={styles.cellClasses}
        >
          {hasReservations && (
            <div className='absolute top-[10%] left-[60%] size-6 rounded-full bg-red-500' />
          )}

          <div className={`${styles.dateClasses} font-size-16`}>
            {day.format('D')}
          </div>

          <div className='mt-1 flex w-full flex-col items-center space-y-1'>
            {displayItems.map((item, index) => (
              <div
                key={`${reservation?.date}-${item.status}-${index}`}
                className={`font-size-14 w-[90%] truncate rounded-xl px-1 text-center font-medium ${getColorClassByStatus(item.status)}`}
              >
                {STATUS_LABELS[item.status]} {item.count}명
              </div>
            ))}
          </div>
        </div>
      </Popover.Trigger>

      <Popover.Content position='right-center' withBackdrop>
        <div className='min-w-[40rem] space-y-3 p-10'>
          <div className='flex items-center justify-between'>
            <div className='flex items-end gap-5'>
              <h3 className='font-size-20 font-bold text-gray-900'>
                {day.format('YY년 M월 D일')}
              </h3>
              <span className='font-size-12 text-gray-500'>
                {totalReservations}개의 예약
              </span>
            </div>
            <CloseButton />
          </div>

          <Tabs.Root defaultValue='신청'>
            <Tabs.List className='font-size-14 flex'>
              <Tabs.Trigger value='신청'>신청 {confirmedCount}</Tabs.Trigger>
              <Tabs.Trigger value='승인'>승인 {pendingCount}</Tabs.Trigger>
              <Tabs.Trigger value='거절'>거절 {completedCount}</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value='신청'>
              <ReservationDetail
                reservations={confirmedReservations}
                emptyMessage='신청된 예약이 없습니다.'
                showApprovalButton={true}
                showRejectButton={true}
                onApprove={() => {}}
                onReject={() => {}}
              />
            </Tabs.Content>

            <Tabs.Content value='승인'>
              <ReservationDetail
                reservations={pendingReservations}
                emptyMessage='승인된 예약이 없습니다.'
                showApprovalButton={false}
                showRejectButton={true}
                onApprove={() => {}}
                onReject={() => {}}
              />
            </Tabs.Content>

            <Tabs.Content value='거절'>
              <ReservationDetail
                reservations={completedReservations}
                emptyMessage='거절된 예약이 없습니다.'
                showApprovalButton={false}
                showRejectButton={false}
                onApprove={() => {}}
                onReject={() => {}}
              />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
