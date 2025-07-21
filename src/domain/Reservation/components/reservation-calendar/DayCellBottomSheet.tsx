import { X } from 'lucide-react';
import { useMemo } from 'react';

import { BottomSheet } from '@/shared/components/ui/bottom-sheet';
import { useBottomSheet } from '@/shared/components/ui/bottom-sheet/BottomSheetContext';
import Tabs from '@/shared/components/ui/tabs';

import { allReservations } from '../../mock/reservation';
import type { DayCellProps } from '../../types/reservation';
import {
  getColorClassByStatus,
  getDisplayItems,
  STATUS_LABELS,
} from '../../utils/reservation';
import ReservationDetail from './ReservationDetail';

// 팝 오버 닫기 버튼튼
const CloseButton = () => {
  const { onOpenChange } = useBottomSheet();

  return (
    <button onClick={() => onOpenChange(false)}>
      <X className='size-15 cursor-pointer font-bold' />
    </button>
  );
};

export default function DayCell({
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

  // 반응형 스타일 계산 (PC 기준 유지, 모바일만 축소)
  const styles = useMemo(() => {
    const cellClasses = `
      relative flex w-full min-h-[8rem] md:min-h-[12rem] cursor-pointer flex-col items-center py-6 md:py-12 text-xs md:font-size-14
      hover:bg-gray-50 
      ${!isLastRow ? 'border-b-[0.05rem] border-gray-100' : ''} 
      ${!isCurrentMonth ? 'bg-gray-200 text-gray-400 opacity-50' : ''} 
      ${isToday ? 'border-blue-300 bg-blue-100' : ''}
    `;

    const dayOfWeek = day.day();
    const dateClasses = `
      text-lg md:text-xl
      ${dayOfWeek === 0 ? 'text-red-500' : ''}
      ${dayOfWeek === 6 ? 'text-blue-500' : ''}
      ${isCurrentMonth ? 'text-gray-900' : ''}
    `;

    return { cellClasses, dateClasses };
  }, [day, isCurrentMonth, isToday, isLastRow]);

  const hasReservations = displayItems.length > 0;

  // 현재 날짜에 해당하는 예약만 필터링
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
    <BottomSheet.Root>
      <BottomSheet.Trigger>
        <div
          role='gridcell'
          aria-label={`${day.format('M월 D일')}`}
          className={styles.cellClasses}
        >
          {hasReservations && (
            <div className='absolute top-[10%] left-[60%] size-4 rounded-full bg-red-500 sm:size-5 md:size-6' />
          )}

          <div className={`${styles.dateClasses} md:font-size-16 text-sm`}>
            {day.format('D')}
          </div>

          <div className='mt-1 flex w-full flex-col items-center space-y-1 overflow-hidden px-1'>
            {displayItems.slice(0, 3).map((item, index) => (
              <div
                key={`${reservation?.date}-${item.status}-${index}`}
                className={`md:text-md font-size-10 w-[90%] truncate rounded-xl px-1 text-center font-medium ${getColorClassByStatus(item.status)}`}
              >
                {STATUS_LABELS[item.status]} {item.count}명
              </div>
            ))}
            {displayItems.length > 3 && (
              <div className='text-center text-xs text-gray-500'>
                +{displayItems.length - 3}개 더
              </div>
            )}
          </div>
        </div>
      </BottomSheet.Trigger>

      <BottomSheet.Content>
        <div className='mx-auto w-full max-w-2xl space-y-3 p-6 sm:max-w-4xl sm:p-8 md:p-10'>
          <div className='flex flex-col justify-between gap-3 sm:flex-row sm:items-center'>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-5'>
              <h3 className='font-size-20 font-bold text-gray-900'>
                {day.format('YY년 M월 D일')}
              </h3>
              <span className='text-sm text-gray-500'>
                {totalReservations}개의 예약
              </span>
            </div>
            <div className='self-end sm:self-auto'>
              <CloseButton />
            </div>
          </div>

          <Tabs.Root defaultValue='신청'>
            <Tabs.List className='md:font-size-14 flex w-full text-sm'>
              <Tabs.Trigger value='신청' className='flex-1'>
                신청 {confirmedCount}
              </Tabs.Trigger>
              <Tabs.Trigger value='승인' className='flex-1'>
                승인 {pendingCount}
              </Tabs.Trigger>
              <Tabs.Trigger value='거절' className='flex-1'>
                거절 {completedCount}
              </Tabs.Trigger>
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
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
}
