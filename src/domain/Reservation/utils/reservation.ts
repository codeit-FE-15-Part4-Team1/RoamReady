import { Event } from '../types/event';

// 요일 배열
export const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// 이벤트 우선순위 (중요도 순)
export const PRIORITY_MAP = {
  완료: 0,
  승인: 1,
  예약: 2,
  거절: 3,
  취소: 4,
};

/**
 * 이벤트 색상에 따른 Tailwind CSS 클래스를 반환합니다
 * @param color - 이벤트 색상 ('red' | 'blue' | 'orange' | 'green' | 'purple')
 * @returns Tailwind CSS 클래스 문자열
 */
export const getColorClass = (color: string) => {
  const colorMap = {
    red: 'bg-red-200 text-red-400',
    blue: 'bg-blue-200 text-blue-400',
    orange: 'bg-orange-200 text-orange-400',
    green: 'bg-green-200 text-green-400',
    purple: 'bg-purple-200 text-purple-400',
  };
  return colorMap[color as keyof typeof colorMap] || 'bg-gray-500';
};

/**
 * 이벤트를 우선순위에 따라 정렬합니다
 * @param events - 정렬할 이벤트 배열
 * @returns 우선순위 순으로 정렬된 이벤트 배열 (완료 > 승인 > 예약 > 거절 > 취소)
 */
export const sortEventsByPriority = (events: Event[]) => {
  return [...events].sort((a, b) => {
    const priorityA = PRIORITY_MAP[a.title as keyof typeof PRIORITY_MAP] ?? 999;
    const priorityB = PRIORITY_MAP[b.title as keyof typeof PRIORITY_MAP] ?? 999;
    return priorityA - priorityB;
  });
};
