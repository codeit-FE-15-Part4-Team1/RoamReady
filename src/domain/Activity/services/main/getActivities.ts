import { activityClient } from '@/domain/Activity/libs/main/activityClient';
import {
  GetActivitiesOffsetResponse,
  GetActivitiesRequestQuery,
  getActivitiesResponseOffsetSchema,
} from '@/domain/Activity/schemas/main';

export const getActivities = async (
  params?: Partial<GetActivitiesRequestQuery>,
) => {
  const searchParams = {
    method: 'offset',
    page: 1,
    size: 20,
    ...params,
  };

  const data = await activityClient
    .get('activities', {
      searchParams,
    })
    .json();

  const parsed = getActivitiesResponseOffsetSchema.safeParse(data);

  if (!parsed.success) {
    console.error('getActivities API 응답 검증 실패: ', parsed.error);
    throw new Error('잘못된 API 응답 구조입니다.');
  }

  return parsed.data as GetActivitiesOffsetResponse;
};
