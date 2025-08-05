import { useMutation } from '@tanstack/react-query';

import {
  UpdateUserInfoRequest,
  UpdateUserInfoResponse,
  UserInfoFormValues,
} from '@/domain/User/schemas/userInfoForm';
import { patchUserInfo } from '@/domain/User/services/patchUserInfo';
import { useRoamReadyStore } from '@/shared/store';

/**
 * 사용자 정보 업데이트를 처리하는 mutation 훅
 *
 * 사용자의 닉네임, 프로필 이미지, 비밀번호 정보를 업데이트하고,
 * 성공 시 전역 상태와 토스트 메시지를 업데이트합니다.
 *
 * @param currentProfileImageUrl - 현재 선택된 프로필 이미지 URL
 * @returns TanStack Query의 useMutation 결과 객체
 */
export const useUserInfoMutation = (currentProfileImageUrl: string) => {
  const { user, setUser, addToast } = useRoamReadyStore();

  return useMutation({
    mutationFn: async (
      data: UserInfoFormValues,
    ): Promise<UpdateUserInfoResponse> => {
      if (!user) {
        throw new Error('사용자 정보를 찾을 수 없습니다.');
      }

      // 이미지 URL 처리: 빈 문자열이면 null로 변환 (기본 이미지), 그렇지 않으면 현재 이미지 사용
      const profileImageUrl =
        currentProfileImageUrl.trim() === '' ? null : currentProfileImageUrl;

      const requestData: UpdateUserInfoRequest = {
        nickname: data.nickname,
        profileImageUrl,
        newPassword: data.password,
      };

      return patchUserInfo(requestData);
    },
    onSuccess: (updatedUser) => {
      // Zustand 스토어 업데이트
      setUser(updatedUser);
      addToast({
        message: '회원정보가 성공적으로 수정되었습니다.',
        type: 'success',
      });
    },
    onError: (error) => {
      // API 에러 메시지 표시
      addToast({
        message: error.message || '회원정보 수정에 실패했습니다.',
        type: 'error',
      });
    },
  });
};
