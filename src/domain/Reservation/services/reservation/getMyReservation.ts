import {
  GetMyReservationsRequest,
  GetMyReservationsResponse,
  GetMyReservationsRequestSchema,
  GetMyReservationsResponseSchema,
} from '@/domain/Reservation/schemas/reservation';
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

  console.log('🔍 getMyReservation 호출됨:', filteredQuery);
  console.log('🔗 요청 엔드포인트:', API_ENDPOINTS.MY_RESERVATIONS.BASE);

  const response = await apiClient
    .get(API_ENDPOINTS.MY_RESERVATIONS.BASE, {
      searchParams: filteredQuery,
    })
    .json<GetMyReservationsResponse>();

  // 응답 데이터 검증
  const validatedResponse = GetMyReservationsResponseSchema.parse(response);

  return validatedResponse;
};
