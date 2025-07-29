import { useQuery } from '@tanstack/react-query';

import { getAvailableSchedule } from '@/domain/Activity/services/detail';

import {
  AvailableScheduleParams,
  ReservableDate,
} from '../../types/detail/types';

/**
 * 예약 가능 일정 조회를 위한 React Query 훅
 *
 * @param {AvailableScheduleParams} params - 조회에 필요한 파라미터 객체
 * @param {number} params.activityId - 조회할 체험(액티비티) ID
 * @param {number} params.year - 조회 연도 (YYYY 형식)
 * @param {number} params.month - 조회 월 (1~12)
 *
 * 데이터의 최신성을 안전하게 보장하기 위해 10분 주기로 데이터를 새로 불러옵니다.
 *
 * @returns {UseQueryResult<ReservableDate[], unknown>} 예약 가능한 날짜 배열을 반환하는 쿼리 결과 객체
 *
 * @example
 * const { data, isLoading, error } = useAvailableSchedule({
 *   activityId: 123,
 *   year: 2025,
 *   month: 7,
 * });
 */
export const useAvailableSchedule = ({
  activityId,
  year,
  month,
}: AvailableScheduleParams) => {
  return useQuery<ReservableDate[]>({
    queryKey: ['availableSchedule', activityId, year, month],
    queryFn: () => getAvailableSchedule({ activityId, year, month }),
    staleTime: 1000 * 60 * 10, // 10분 캐싱
    enabled: !!activityId && !!year && !!month, // 안전하게 조건부 실행
  });
};
