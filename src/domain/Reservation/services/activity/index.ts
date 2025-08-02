import {
  DeleteMyActivityeRequestQuery,
  deleteMyActivityeRequestSchema,
  GetMyActivityeRequestQuery,
  getMyActivityeRequestSchema,
  GetMyActivityeResponse,
  getMyActivityeResponseSchema,
} from '@/domain/Reservation/schemas/activity';
import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { apiClient } from '@/shared/libs/apiClient';

export const getMyActivities = async (query: GetMyActivityeRequestQuery) => {
  const validatedQuery = getMyActivityeRequestSchema.parse(query);

  // undefined 값을 필터링하여 실제 값이 있는 파라미터만 전송
  const filteredQuery = Object.fromEntries(
    Object.entries(validatedQuery).filter(([, value]) => value !== undefined),
  );

  const response = await apiClient
    .get(API_ENDPOINTS.MY_ACTIVITIES.BASE, {
      searchParams: filteredQuery,
    })
    .json<GetMyActivityeResponse>();

  const validatedResponse = getMyActivityeResponseSchema.parse(response);

  return validatedResponse;
};

export const deleteMyActivity = async (
  query: DeleteMyActivityeRequestQuery,
) => {
  const validatedQuery = deleteMyActivityeRequestSchema.parse(query);

  return await apiClient
    .delete(
      API_ENDPOINTS.MY_ACTIVITIES.ACTIVITY_DETAIL(validatedQuery.activityId),
    )
    .json<void>();
};
