import { Reservation, ReservationStatus } from '../types/reservation';

// 요일 배열
export const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// 이벤트 우선순위 (중요도 순)
const PRIORITY_MAP: Record<ReservationStatus, number> = {
  completed: 0,
  pending: 1,
  confirmed: 2,
};

/**
 * 예약 상태에 따른 Tailwind CSS 클래스를 반환합니다
 * @param status - 예약 상태 ('completed' | 'confirmed' | 'pending')
 * @returns Tailwind CSS 클래스 문자열
 */
export const getColorClassByStatus = (status: ReservationStatus) => {
  const statusColorMap: Record<ReservationStatus, string> = {
    completed: 'bg-green-200 text-green-600', // 완료
    confirmed: 'bg-purple-200 text-purple-600', // 예약
    pending: 'bg-blue-200 text-blue-600', // 승인
  };

  return statusColorMap[status] || 'bg-gray-200 text-gray-600';
};

/**
 * 예약을 우선순위에 따라 정렬합니다
 * @param reservations - 정렬할 예약 배열
 * @returns 우선순위 순으로 정렬된 예약 배열 (완료 > 승인 > 예약)
 */
export const sortEventsByPriority = (reservations: Reservation[]) => {
  return [...reservations].sort((a, b) => {
    // 각 예약에서 가장 높은 우선순위의 상태를 찾기
    const getHighestPriority = (reservation: Reservation): number => {
      const statuses = Object.keys(
        reservation.reservations,
      ) as ReservationStatus[];
      if (statuses.length === 0) return -1;

      return Math.min(...statuses.map((status) => PRIORITY_MAP[status]));
    };

    const priorityA = getHighestPriority(a);
    const priorityB = getHighestPriority(b);

    return priorityA - priorityB;
  });
};
