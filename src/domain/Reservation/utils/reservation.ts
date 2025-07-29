import { Reservation, ReservationStatus } from '../types/reservation';

// 요일 배열
export const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// 상태별 우선순위 (표시 순서)
export const STATUS_PRIORITY: ReservationStatus[] = [
  'pending',
  'confirmed',
  'declined',
];

// 상태별 한글 라벨
export const STATUS_LABELS: Record<ReservationStatus, string> = {
  confirmed: '승인',
  pending: '신청',
  declined: '거절',
};

/**
 * 예약 상태에 따른 Tailwind CSS 클래스를 반환합니다
 * @param status - 예약 상태 ('declined' | 'confirmed' | 'pending')
 * @returns Tailwind CSS 클래스 문자열
 */
export const getColorClassByStatus = (status: ReservationStatus) => {
  const statusColorMap: Record<ReservationStatus, string> = {
    declined: 'bg-red-200 text-red-600', // 완료
    confirmed: 'bg-purple-200 text-purple-600', // 예약
    pending: 'bg-blue-200 text-blue-600', // 승인
  };

  return statusColorMap[status] || 'bg-gray-200 text-gray-600';
};

/**
 * 예약 데이터에서 표시할 아이템들을 우선순위 순으로 반환
 * @param reservation - 예약 객체 (null 가능)
 * @returns 표시할 아이템 배열 (우선순위 순)
 */
export const getDisplayItems = (reservation: Reservation | null) => {
  if (!reservation) return [];

  const items = [];
  for (const status of STATUS_PRIORITY) {
    const count = reservation.reservations[status];
    if (count && count > 0) {
      items.push({ status, count });
    }
  }
  return items;
};
