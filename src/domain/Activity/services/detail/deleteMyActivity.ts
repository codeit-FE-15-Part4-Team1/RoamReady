import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { apiClient } from '@/shared/libs/apiClient';

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
