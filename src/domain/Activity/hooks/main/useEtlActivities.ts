import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import {
  Activity,
  ActivitySearchFormValues,
  EtlActivity,
} from '@/domain/Activity/schemas/main';
import { getEtlActivities } from '@/domain/Activity/services/main/getEtlActivities';

interface UseEtlActivitiesParams {
  searchParams?: ActivitySearchFormValues;
}

/**
 * ETL 데이터를 사용하여 활동 목록을 가져오는 훅
 * 검색 기능 포함 (키워드: title/description, 날짜: schedules.date, 위치: address)
 */
export function useEtlActivities({
  searchParams,
}: UseEtlActivitiesParams = {}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['etl-activities', searchParams],
    queryFn: () => getEtlActivities(searchParams),
  });

  // ETL 데이터를 통합된 Activity 타입으로 변환
  const convertedActivities = useMemo(() => {
    if (!data?.activities) return [];

    return data.activities.map(
      (etlActivity: EtlActivity): Activity => ({
        id: etlActivity.id,
        userId: etlActivity.userId,
        title: etlActivity.title,
        description: etlActivity.description,
        category: etlActivity.category,
        price: etlActivity.price,
        address: etlActivity.address,
        bannerImageUrl: etlActivity.bannerImageUrl,
        rating: etlActivity.rating,
        reviewCount: etlActivity.reviewCount,
        createdAt: etlActivity.createdAt,
        updatedAt: etlActivity.updatedAt,
        subImages: etlActivity.subImages,
        schedules: etlActivity.schedules,
      }),
    );
  }, [data?.activities]);

  return {
    activities: convertedActivities,
    totalCount: convertedActivities.length,
    isLoading,
    error,
    lastUpdated: data?.lastUpdated,
  };
}
