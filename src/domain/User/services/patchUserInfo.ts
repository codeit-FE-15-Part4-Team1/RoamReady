import {
  UpdateUserInfoRequest,
  UpdateUserInfoResponse,
} from '@/domain/User/schemas/userInfoForm';
import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { apiClient } from '@/shared/libs/apiClient';

/**
 * 사용자 정보를 업데이트하는 API 함수
 *
 * 사용자의 닉네임, 프로필 이미지 URL, 새 비밀번호 정보를 서버에 전송하여
 * 사용자 정보를 업데이트합니다.
 *
 * @param data - 업데이트할 사용자 정보
 * @returns 업데이트된 사용자 정보
 */
export const patchUserInfo = async (
  data: UpdateUserInfoRequest,
): Promise<UpdateUserInfoResponse> => {
  return await apiClient
    .patch(API_ENDPOINTS.USERS.ME, {
      json: data,
    })
    .json<UpdateUserInfoResponse>();
};
