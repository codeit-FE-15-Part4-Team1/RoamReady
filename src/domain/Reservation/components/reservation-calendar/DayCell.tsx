import dayjs from 'dayjs';
import { useMemo } from 'react';

import Popover from '@/shared/components/ui/popover';
import Tabs from '@/shared/components/ui/tabs';

import type { Reservation, ReservationStatus } from '../../types/reservation';
import { getColorClassByStatus } from '../../utils/reservation';

interface DayCellProps {
  day: dayjs.Dayjs;
  isCurrentMonth: boolean;
  isToday: boolean;
  isLastRow: boolean;
  reservation: Reservation | null; // 배열이 아닌 단일 객체
}

export default function DayCell({
  day,
  isCurrentMonth,
  isToday,
  isLastRow,
  reservation,
}: DayCellProps) {
  // 표시할 예약 상태들을 우선순위별로 처리
  const displayItems = useMemo(() => {
    if (!reservation) return [];

    const items = [];
    const statusPriority = [
      'completed',
      'pending',
      'confirmed',
    ] as ReservationStatus[];

    for (const status of statusPriority) {
      const count = reservation.reservations[status];
      if (count && count > 0) {
        items.push({ status, count });
      }
    }

    return items;
  }, [reservation]);

  // 스타일 계산도 useMemo로 최적화
  const styles = useMemo(() => {
    const cellClasses = `
      relative flex min-h-[7rem] cursor-pointer flex-col items-center py-12 cursor-pointer 
      hover:bg-gray-50 
      ${!isLastRow ? 'border-b-[0.05rem] border-gray-100' : ''} 
      ${!isCurrentMonth ? 'bg-gray-200 text-gray-400 opacity-50' : ''} 
      ${isToday ? 'border-blue-300 bg-blue-100' : ''}
    `;

    const dayOfWeek = day.day();
    const dateClasses = `
      text-xl
      ${dayOfWeek === 0 ? 'text-red-500' : ''}
      ${dayOfWeek === 6 ? 'text-blue-500' : ''}
      ${isCurrentMonth ? 'text-gray-900' : ''}
    `;

    return { cellClasses, dateClasses };
  }, [day, isCurrentMonth, isToday, isLastRow]);

  // 예약이 있는지 확인 (빨간 점 표시용)
  const hasReservations = displayItems.length > 0;

  // 상태별 라벨 매핑 (계산 최소화)
  const statusLabels: Record<ReservationStatus, string> = {
    confirmed: '예약',
    pending: '승인',
    completed: '완료',
  };

  // 총 예약 수 계산
  const totalReservations = reservation
    ? Object.values(reservation.reservations).reduce(
        (sum, count) => sum + count,
        0,
      )
    : 0;

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

          <div className={styles.dateClasses}>{day.format('D')}</div>

          <div className='mt-1 flex w-full flex-col items-center space-y-1'>
            {displayItems.map((item, index) => (
              <div
                key={`${reservation?.date}-${item.status}-${index}`}
                className={`text-md w-[90%] truncate rounded-xl px-1 text-center font-medium ${getColorClassByStatus(item.status)}`}
              >
                {statusLabels[item.status]} {item.count}명
              </div>
            ))}
          </div>
        </div>
      </Popover.Trigger>

      <Popover.Content position='bottom-center'>
        <div className='w-80 space-y-3 p-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold text-gray-900'>
              {day.format('M월 D일')} ({day.format('ddd')})
            </h3>
            <span className='text-sm text-gray-500'>
              {totalReservations}개의 예약
            </span>
          </div>

          <Tabs.Root defaultValue='신청'>
            <Tabs.List>
              <Tabs.Trigger value='신청'>신청</Tabs.Trigger>
              <Tabs.Trigger value='승인'>승인</Tabs.Trigger>
              <Tabs.Trigger value='거절'>거절</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value='신청'>
              {!reservation || reservation.reservations.confirmed === 0 ? (
                <p className='py-4 text-center text-gray-500'>
                  신청된 예약이 없습니다.
                </p>
              ) : (
                <div className='max-h-60 space-y-2 overflow-y-auto'>
                  <div
                    className={`rounded-lg border p-3 ${getColorClassByStatus('confirmed')}`}
                  >
                    <div className='font-medium'>예약 신청</div>
                    <div className='mt-1 text-sm text-gray-600'>
                      {reservation.reservations.confirmed}명
                    </div>
                  </div>
                </div>
              )}
            </Tabs.Content>

            <Tabs.Content value='승인'>
              {!reservation || reservation.reservations.pending === 0 ? (
                <p className='py-4 text-center text-gray-500'>
                  승인된 예약이 없습니다.
                </p>
              ) : (
                <div className='max-h-60 space-y-2 overflow-y-auto'>
                  <div
                    className={`rounded-lg border p-3 ${getColorClassByStatus('pending')}`}
                  >
                    <div className='font-medium'>승인된 예약</div>
                    <div className='mt-1 text-sm text-gray-600'>
                      {reservation.reservations.pending}명
                    </div>
                  </div>
                </div>
              )}
            </Tabs.Content>

            <Tabs.Content value='거절'>
              {!reservation || reservation.reservations.completed === 0 ? (
                <p className='py-4 text-center text-gray-500'>
                  거절된 예약이 없습니다.
                </p>
              ) : (
                <div className='max-h-60 space-y-2 overflow-y-auto'>
                  <div
                    className={`rounded-lg border p-3 ${getColorClassByStatus('completed')}`}
                  >
                    <div className='font-medium'>거절된 예약</div>
                    <div className='mt-1 text-sm text-gray-600'>
                      {reservation.reservations.completed}명
                    </div>
                  </div>
                </div>
              )}
            </Tabs.Content>
          </Tabs.Root>

          <div className='border-t pt-2'>
            <button className='w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'>
              새 예약 추가
            </button>
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
