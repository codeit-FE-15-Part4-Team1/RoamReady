import ky from 'ky';

import { BRIDGE_API } from '@/shared/constants/bridgeEndpoints';
import { API_ENDPOINTS } from '@/shared/constants/endpoints';

/**
 * 프로필 이미지 업로드 응답 타입
 */
export interface UploadProfileImageResponse {
  profileImageUrl: string;
}

/**
 * 이미지 업로드 전용 API 클라이언트
 * FormData 업로드에 최적화된 설정을 가집니다.
 */
const imageUploadClient = ky.create({
  prefixUrl: BRIDGE_API.PREFIX,
  timeout: 60000, // 60초 (이미지 업로드는 시간이 오래 걸릴 수 있음)
  // Content-Type 헤더를 설정하지 않아 브라우저가 자동으로 multipart/form-data로 설정
});

/**
 * 프로필 이미지를 서버에 업로드하는 API 함수
 * @param imageFile - 업로드할 이미지 파일
 * @returns 업로드된 이미지의 URL을 포함한 응답
 */
export const uploadProfileImage = async (
  imageFile: File,
): Promise<UploadProfileImageResponse> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  return await imageUploadClient
    .post(API_ENDPOINTS.USERS.UPLOAD_IMAGE, {
      body: formData,
    })
    .json<UploadProfileImageResponse>();
};
