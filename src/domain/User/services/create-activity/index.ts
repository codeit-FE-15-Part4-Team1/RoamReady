import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { apiClient } from '@/shared/libs/apiClient';

export interface ActivityPayload {
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

export const createActivity = async (data: ActivityPayload) => {
  const response = await apiClient.post(API_ENDPOINTS.ACTIVITIES.BASE, {
    json: data,
  });
  return response.json();
};

export const getMyActivity = async () => {
  const response = await apiClient.get(API_ENDPOINTS.ACTIVITIES.BASE);
  console.log('getMyActivity', response);
  return response;
};
