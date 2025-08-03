'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { getActivities } from '@/domain/Activity/services/main/getActivities';

import ActivityCarouselClient from './ActivityCarousel.client';
import CarouselSkeleton from './CarouselSkeleton';

export default function ActivityCarouselWrapper() {
  const searchParams = useSearchParams();

  // 검색 조건이 있는지 확인
  const hasSearchConditions = useMemo(() => {
    const keyword = searchParams.get('keyword');
    const date = searchParams.get('date');
    const address = searchParams.get('address');

    return keyword || date || address;
  }, [searchParams]);

  // 캐러셀 데이터 가져오기
  const { data, isLoading } = useQuery({
    queryKey: ['carousel-activities'],
    queryFn: async () => {
      const data = await getActivities({
        method: 'offset',
        page: 1,
        size: 10,
        sort: 'most_reviewed',
      });

      return data.activities.map((apiActivity) => ({
        ...apiActivity,
        subImages: [],
        schedules: [],
      }));
    },
    enabled: !hasSearchConditions, // 검색 조건이 없을 때만 데이터 가져오기
  });

  // 검색 조건이 있으면 캐러셀 숨기기
  if (hasSearchConditions) {
    return null;
  }

  // 로딩 중이면 스켈레톤 표시
  if (isLoading) {
    return <CarouselSkeleton />;
  }

  // 데이터가 없으면 아무것도 표시하지 않기
  if (!data) {
    return null;
  }

  return <ActivityCarouselClient activities={data} />;
}
