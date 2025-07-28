// src/domain/Reservation/services/my-activities.ts

import { ReservationItem } from '@/domain/Reservation/types/reservation';
import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { apiClient } from '@/shared/libs/apiClient';

// 실제 API 응답에 맞는 타입 정의

// 월별 예약 현황 데이터 타입
export interface MonthlyReservation {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

// 스케줄 아이템 타입 정의
export interface ScheduleItem {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    pending: number;
    confirmed: number;
    declined: number;
  };
}

/**
 * [서버 전용] 내 체험 리스트를 조회하는 API 함수
 */

// --- 2. API 호출 함수들 ---

/**
 * [API 1] 내 체험 월별 예약 현황 조회
 * @param activityId - 체험 ID
 * @param year - 조회할 년도
 * @param month - 조회할 월
 */
export const getReservationDashboard = async (
  activityId: string,
  year: string,
  month: string,
): Promise<MonthlyReservation[] | null> => {
  try {
    const response = await apiClient
      .get(API_ENDPOINTS.MY_ACTIVITIES.DASHBOARD(activityId, year, month))
      .json<MonthlyReservation[]>();
    return response;
  } catch (error) {
    console.error('월별 예약 현황 조회 실패:', error);
    return null;
  }
};

/**
 * [API 2] 내 체험 날짜별 스케줄 조회
 * @param activityId - 체험 ID
 * @param date - 조회할 날짜 (YYYY-MM-DD)
 */
export const getSchedulesByDate = async (
  activityId: number,
  date: string,
): Promise<ScheduleItem[] | null> => {
  try {
    const response = await apiClient
      .get(API_ENDPOINTS.MY_ACTIVITIES.SCHEDULE(activityId), {
        searchParams: { date },
      })
      .json<ScheduleItem[]>();
    return response;
  } catch (error) {
    console.error('날짜별 스케줄 조회 실패:', error);
    return null;
  }
};

/**
 * [API 3] 내 체험 스케줄별/상태별 예약 내역 조회
 * @param activityId - 체험 ID
 * @param scheduleId - 스케줄 ID
 * @param status - 조회할 예약 상태
 */
export const getReservationsBySchedule = async (
  activityId: number,
  scheduleId: number,
  status: 'pending' | 'confirmed' | 'declined',
): Promise<ReservationItem[] | null> => {
  try {
    const response = await apiClient
      .get(API_ENDPOINTS.MY_ACTIVITIES.RESERVATION_DETAIL(activityId), {
        searchParams: {
          scheduleId,
          status,
        },
      })
      .json<{ reservations: ReservationItem[] }>();

    return response.reservations;
  } catch (error) {
    console.error('스케줄별 예약 내역 조회 실패:', error);
    return null;
  }
};

export const updateReservationStatus = async ({
  activityId,
  reservationId,
  status,
}: {
  activityId: number;
  reservationId: number;
  status: 'pending' | 'confirmed' | 'declined';
}) => {
  try {
    const response = await apiClient
      .patch(
        API_ENDPOINTS.MY_ACTIVITIES.RESERVATION(activityId, reservationId),
        {
          json: { status },
        },
      )
      .json<ReservationItem[]>();

    return response;
  } catch (error) {
    console.error('예약 상태 업데이트 실패:', error);
    return null;
  }
};
