import { apiClient } from '@/shared/libs/apiClient';

import {
  AvailableScheduleParams,
  ReservableDate,
} from '../../types/detail/types';

/**
 * 예약 가능한 날짜 목록 조회
 * @param activityId - 대상 체험 ID
 * @param year - 조회 연도 (예: 2025)
 * @param month - 조회 월 (예: 7)
 * @returns 예약 가능한 날짜 목록
 */
export const getAvailableSchedule = async ({
  activityId,
  year,
  month,
}: AvailableScheduleParams): Promise<ReservableDate[]> => {
  const res = await apiClient
    .get(`activities/${activityId}/available-schedule`, {
      searchParams: { year, month },
    })
    .json<ReservableDate[]>();

  return res;
};
