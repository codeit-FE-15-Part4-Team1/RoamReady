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
    queryFn: getEtlActivities,
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

  // 검색 필터링 로직
  const filteredActivities = useMemo(() => {
    if (!convertedActivities) return [];

    let activities = convertedActivities;

    // 키워드 검색 (제목, 설명)
    if (searchParams?.keyword && searchParams.keyword.trim()) {
      const keyword = searchParams.keyword.toLowerCase().trim();
      activities = activities.filter(
        (activity) =>
          activity.title.toLowerCase().includes(keyword) ||
          activity.description.toLowerCase().includes(keyword),
      );
    }

    // 위치 검색 (주소)
    if (searchParams?.address && searchParams.address.trim()) {
      const address = searchParams.address.toLowerCase().trim();
      activities = activities.filter((activity) =>
        activity.address.toLowerCase().includes(address),
      );
    }

    // 날짜 검색 (스케줄 날짜)
    if (searchParams?.date) {
      const year = searchParams.date.getFullYear();
      const month = String(searchParams.date.getMonth() + 1).padStart(2, '0');
      const day = String(searchParams.date.getDate()).padStart(2, '0');
      const searchDate = `${year}-${month}-${day}`;

      activities = activities.filter((activity) =>
        activity.schedules.some((schedule) => schedule.date === searchDate),
      );
    }

    return activities;
  }, [convertedActivities, searchParams]);

  return {
    activities: filteredActivities,
    totalCount: filteredActivities.length,
    isLoading,
    error,
    lastUpdated: data?.lastUpdated,
  };
}
