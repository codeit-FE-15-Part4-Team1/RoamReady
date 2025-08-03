import { getActivities } from '@/domain/Activity/services/main/getActivities';

import ActivityCarouselClient from './ActivityCarousel.client';

/**
 * 인기 체험 캐러셀을 위한 데이터를 페칭하는 서버 컴포넌트입니다.
 * 실제 UI와 인터랙션은 `ActivityCarouselClient` 컴포넌트에 위임합니다.
 */
export default async function ActivityCarousel() {
  const data = await getActivities({
    method: 'offset',
    page: 1,
    size: 10,
    sort: 'most_reviewed',
  });

  const activities = data.activities.map((apiActivity) => ({
    ...apiActivity,
    subImages: [],
    schedules: [],
  }));

  return <ActivityCarouselClient activities={activities} />;
}
