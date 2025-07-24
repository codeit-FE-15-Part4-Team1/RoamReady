import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { apiClient } from '@/shared/libs/apiClient';

export const createActivityWithFormData = async (data: FormData) => {
  // apiClient의 기본 'Content-Type'인 'application/json'을
  // 이 요청에 한해 비활성화하여 브라우저가 자동으로
  // 'multipart/form-data' 헤더를 설정하도록 합니다.
  const response = await apiClient.post(API_ENDPOINTS.MY_ACTIVITIES.BASE, {
    body: data,
    headers: {
      'Content-Type': undefined,
    },
  });
  console.log('createActivity', response);
  return response.json();
};

export const getMyActivity = async () => {
  const response = await apiClient.get(API_ENDPOINTS.MY_ACTIVITIES.BASE);
  console.log('getMyActivity', response);
  return response;
};
