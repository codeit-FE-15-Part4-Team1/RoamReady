import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { apiClient } from '@/shared/libs/apiClient';

import type {
  AvailableScheduleParams,
  ReservableDate,
  ReviewList,
} from '../../types/detail/types';

/**
 * 내 체험 삭제 API (BFF 경유 요청)
 * @param activityId - 삭제할 체험 ID
 */
export const deleteMyActivity = async (activityId: number) => {
  const res = await apiClient.delete(
    API_ENDPOINTS.MY_ACTIVITIES.ACTIVITY_DETAIL(activityId),
  );

  console.log(res);
  return res;
};

/**
 * 체험 상세 데이터 조회 API (ISR tag: 'activity-detail')
 * @param activityId - 체험 ID
 * @returns 체험 상세 데이터
 */
export const getActivityDetail = async (activityId: number) => {
  const res = await fetch(
    `${process.env.API_BASE_URL}/activities/${activityId}`,
    {
      next: { tags: ['activity-detail'] },
    },
  );

  if (!res.ok) {
    const error = new Error(
      `체험 상세 데이터를 불러오는데 실패했습니다: ${res.statusText}`,
    );
    (error as any).status = res.status;
    throw error;
  }

  return res.json();
};

/**
 * 체험 리뷰 데이터 조회 API (ISR tag: 'activity-review')
 * @param activityId - 체험 ID
 * @returns 리뷰 목록
 */
export const getActivityReviews = async (
  activityId: number,
  page = 1,
  size = 3,
): Promise<ReviewList> => {
  const res = await apiClient.get(`activities/${activityId}/reviews`, {
    searchParams: { page, size },
  });
  return res.json<ReviewList>();
};

/**
 * 예약 가능한 날짜 목록 조회 API
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
