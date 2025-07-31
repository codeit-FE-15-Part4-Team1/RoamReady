import { activityClient } from '@/domain/Activity/libs/main/activityClient';
import {
  GetActivitiesOffsetResponse,
  GetActivitiesRequestQuery,
  getActivitiesResponseOffsetSchema,
} from '@/domain/Activity/schemas/main';

export const getActivities = async (
  params?: Partial<GetActivitiesRequestQuery>,
) => {
  const defaultParams = {
    method: 'offset' as const,
    page: 1,
    size: 20,
  };

  // undefined 값들을 필터링하여 HTTP 요청에 포함되지 않도록 함
  const filteredParams = Object.fromEntries(
    Object.entries({ ...defaultParams, ...params }).filter(
      ([, value]) => value !== undefined && value !== null,
    ),
  );

  const response = await activityClient.get('activities', {
    searchParams: filteredParams,
  });

  const data = await response.json();

  const parsed = getActivitiesResponseOffsetSchema.safeParse(data);

  if (!parsed.success) {
    console.error('getActivities API 응답 검증 실패: ', parsed.error);
    throw new Error('잘못된 API 응답 구조입니다.');
  }

  return parsed.data as GetActivitiesOffsetResponse;
};
