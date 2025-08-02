import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { apiClient } from '@/shared/libs/apiClient';

export interface ActivityResponse {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  bannerImageUrl: string;
  subImages: {
    id: number;
    imageUrl: string;
  }[];
}

export interface ActivityRequest {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  bannerImageUrl: string;
  subImageUrls: string[];
}

export interface UpdateActivityRequest {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
}

export const uploadActivityImages = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await apiClient.post(API_ENDPOINTS.ACTIVITIES.IMAGES, {
    body: formData,
    headers: {
      'Content-Type': undefined,
      accept: 'application/json',
    },
  });
  return response.json<{ activityImageUrl: string }>();
};

export const createActivity = async (data: ActivityRequest) => {
  const response = await apiClient.post(API_ENDPOINTS.ACTIVITIES.BASE, {
    json: data,
  });
  return response.json();
};

export const getActivity = async (
  activityId: number,
): Promise<ActivityResponse> => {
  const response = await apiClient.get(
    API_ENDPOINTS.ACTIVITIES.DETAIL(activityId),
  );
  return response.json();
};

export const updateActivity = async (
  activityId: number,
  data: UpdateActivityRequest,
) => {
  console.log('🔥 updateActivity 서비스 호출');
  console.log('🔥 activityId:', activityId);
  console.log('🔥 data:', data);
  console.log(
    '🔥 요청 URL:',
    `${API_ENDPOINTS.MY_ACTIVITIES.ACTIVITY_DETAIL(activityId)}`,
  );

  try {
    const response = await apiClient.patch(
      `${API_ENDPOINTS.MY_ACTIVITIES.ACTIVITY_DETAIL(activityId)}`,
      { json: data },
    );
    console.log('🔥 PATCH 응답 성공');
    const result = await response.json();
    console.log('🔥 응답 데이터:', result);
    return result;
  } catch (error) {
    console.error('🔥 updateActivity 에러:', error);
    throw error;
  }
};
