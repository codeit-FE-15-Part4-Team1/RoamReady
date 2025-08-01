import z from 'zod';
import {
  GetMyReservationsRequest,
  GetMyReservationsResponse,
  GetMyReservationsRequestSchema,
  GetMyReservationsResponseSchema,
} from '@/domain/Reservation/schemas/reservation';
import {
  CreateReservationReview,
  CreateReservationReviewResponse,
  createReservationReviewSchema,
  createReservationReviewResponseSchema,
} from '@/domain/Reservation/schemas/review';
import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { apiClient } from '@/shared/libs/apiClient';

export const getMyReservation = async (
  query: GetMyReservationsRequest,
): Promise<GetMyReservationsResponse> => {
  // 요청 데이터 검증
  const validatedQuery = GetMyReservationsRequestSchema.parse(query);

  // undefined 값을 필터링하여 실제 값이 있는 파라미터만 전송
  const filteredQuery = Object.fromEntries(
    Object.entries(validatedQuery).filter(([_, value]) => value !== undefined),
  );

  const response = await apiClient
    .get(API_ENDPOINTS.MY_RESERVATIONS.BASE, {
      searchParams: filteredQuery,
    })
    .json<GetMyReservationsResponse>();

  // 응답 데이터 검증
  const validatedResponse = GetMyReservationsResponseSchema.parse(response);

  return validatedResponse;
};

export const deleteMyReservation = async (reservationId: number) => {
  // 요청 파라미터 검증
  const validatedReservationId = z.number().positive().parse(reservationId);

  return await apiClient
    .patch(API_ENDPOINTS.MY_RESERVATIONS.BASE + `/${validatedReservationId}`, {
      json: { status: 'canceled' },
    })
    .json<void>();
};

export const writeReview = async (
  reservationId: number,
  review: CreateReservationReview,
) => {
  // 요청 파라미터 검증
  const validatedReservationId = z.number().positive().parse(reservationId);
  const validatedReview = createReservationReviewSchema.parse(review);

  const response = await apiClient
    .post(
      API_ENDPOINTS.MY_RESERVATIONS.BASE + `/${validatedReservationId}/reviews`,
      {
        json: validatedReview,
      },
    )
    .json<CreateReservationReviewResponse>();

  // 응답 데이터 검증
  const validatedResponse =
    createReservationReviewResponseSchema.parse(response);

  return validatedResponse;
};
