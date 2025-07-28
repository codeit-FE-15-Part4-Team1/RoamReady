import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { apiClient } from '@/shared/libs/apiClient';

import type {
  AvailableScheduleParams,
  ReservableDate,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any).status = res.status;
    throw error;
  }

  return res.json();
};

/**
 * 체험 리뷰 목록을 조회하는 API
 *
 * @param {number} activityId - 조회할 체험 ID
 * @param {number} [page=1] - 조회할 페이지 번호 (기본값: 1)
 * @param {number} [size=3] - 페이지당 리뷰 개수 (기본값: 3)
 * @returns {Promise<ReviewList>} 리뷰 목록을 담은 Promise 객체
 *
 * @remarks
 * - React Query ISR tag: `'activity-review'`
 * - 페이징 처리된 리뷰 데이터를 반환합니다.
 */
export const getActivityReviews = async (
  activityId: number,
  page = 1,
  size = 3,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}activities/${activityId}/reviews?page=${page}&size=${size}`,
  );
  if (!res.ok) throw new Error('리뷰 불러오기 실패');
  return res.json();
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
