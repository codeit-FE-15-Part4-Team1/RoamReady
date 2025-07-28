import { cookies } from 'next/headers';

import { Activity } from '@/domain/Reservation/types/reservation';
import { API_ENDPOINTS } from '@/shared/constants/endpoints';

interface MyActivitiesResponse {
  cursorId: number;
  totalCount: number;
  activities: Activity[];
}

export const getMyActivities = async (): Promise<Activity[] | null> => {
  // 1. 서버 환경이므로 next/headers의 cookies()로 직접 토큰에 접근
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    console.error('인증 토큰이 없습니다.');
    return null;
  }

  try {
    // 2. 외부 백엔드 API로 직접 fetch 요청
    const response = await fetch(
      `${process.env.API_BASE_URL}${API_ENDPOINTS.MY_ACTIVITIES.BASE}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        // 서버 컴포넌트의 데이터 요청은 기본적으로 캐시되므로, 실시간 데이터는 no-store 옵션 필요
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      // 응답이 실패했을 경우 에러 처리
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: MyActivitiesResponse = await response.json();
    return data.activities; // 실제 체험 목록 배열만 반환
  } catch (error) {
    console.error('내 체험 리스트 조회 중 네트워크 오류 발생', error);
    return null;
  }
};
