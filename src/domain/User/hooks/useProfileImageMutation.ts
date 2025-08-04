import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

import { useRoamReadyStore } from '@/shared/store';

import {
  uploadProfileImage,
  UploadProfileImageResponse,
} from '../services/uploadProfileImage';

interface MutationHookProp {
  setProfileImageUrl: Dispatch<SetStateAction<string>>;
  initialImageUrl: string;
  onImageChange?: (imageUrl: string) => void;
}

interface MutationContext {
  previousImageUrl: string;
  previewUrl: string;
}

/**
 * 프로필 이미지 업로드(Mutation)와 낙관적 업데이트 로직을 처리하는 커스텀 훅입니다.
 *
 * ### 낙관적 업데이트 플로우:
 * 1. **즉시 미리보기**: 파일 선택 시 즉시 미리보기 URL로 UI 업데이트
 * 2. **백그라운드 업로드**: 동시에 서버로 실제 파일 업로드 진행
 * 3. **성공 시**: 서버 URL로 교체 및 미리보기 URL 메모리 해제
 * 4. **실패 시**: 이전 이미지로 롤백 및 에러 메시지 표시
 *
 * @param setProfileImageUrl - 부모 컴포넌트의 이미지 URL 상태를 업데이트하는 함수
 * @param initialImageUrl - 롤백 시 돌아갈 초기 이미지 URL
 * @param onImageChange - 이미지 변경 시 호출되는 콜백 함수
 * @returns TanStack Query의 `useMutation` 결과 객체 (`mutate` 함수, `isPending` 상태 등)
 */
export const useProfileImageMutation = ({
  setProfileImageUrl,
  initialImageUrl,
  onImageChange,
}: MutationHookProp) => {
  const queryClient = useQueryClient();
  const { user, setUser } = useRoamReadyStore();

  return useMutation<UploadProfileImageResponse, Error, File, MutationContext>({
    mutationFn: uploadProfileImage,

    // 낙관적 업데이트: 업로드 시작 전 즉시 미리보기 표시
    onMutate: async (imageFile: File): Promise<MutationContext> => {
      // 롤백을 위해 이전 이미지 URL 저장
      const previousImageUrl = initialImageUrl;

      // 즉시 미리보기를 위한 임시 URL 생성
      const previewUrl = URL.createObjectURL(imageFile);

      // UI를 즉시 업데이트하여 사용자에게 반응성 제공
      setProfileImageUrl(previewUrl);
      onImageChange?.(previewUrl);

      // 컨텍스트로 이전 상태와 임시 URL 반환
      return { previousImageUrl, previewUrl };
    },

    // 업로드 성공 시 실행: 실제 서버 URL로 교체
    onSuccess: (data, _variables, context?: MutationContext) => {
      // 기존 user 객체의 다른 정보는 유지한 채, profileImageUrl만 업데이트합니다.
      if (user) {
        const updatedUser = { ...user, profileImageUrl: data.profileImageUrl };
        setUser(updatedUser);
      }

      // Tanstack Query 캐시 무효화는 그대로 유지합니다.
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });

      // API로부터 받은 실제 이미지 URL로 상태 업데이트
      setProfileImageUrl(data.profileImageUrl);
      // 상위 컴포넌트에 최종 이미지 변경을 알림
      onImageChange?.(data.profileImageUrl);

      // 미리보기 URL 메모리 해제
      if (context?.previewUrl) {
        URL.revokeObjectURL(context.previewUrl);
      }
    },

    // 업로드 실패 시 실행: 이전 상태로 롤백
    onError: (error, _variables, context?: MutationContext) => {
      console.error('이미지 업로드 실패:', error);

      // 이전 이미지로 롤백
      if (context?.previousImageUrl) {
        setProfileImageUrl(context.previousImageUrl);
        onImageChange?.(context.previousImageUrl);
      }

      // 미리보기 URL 메모리 해제
      if (context?.previewUrl) {
        URL.revokeObjectURL(context.previewUrl);
      }

      // 더 구체적인 에러 메시지 제공
      let errorMessage = '이미지 업로드에 실패했습니다.';

      if (error.name === 'TimeoutError') {
        errorMessage =
          '이미지 업로드 시간이 초과되었습니다. 파일 크기를 확인해주세요.';
      } else if (error.message?.includes('404')) {
        errorMessage = '이미지 업로드 API가 구현되지 않았습니다.';
      } else if (error.message?.includes('500')) {
        errorMessage = '서버 내부 오류가 발생했습니다.';
      }

      alert(errorMessage);
    },

    // 성공/실패와 관계없이 항상 실행: 메모리 정리
    onSettled: (_data, _error, _variables, context?: MutationContext) => {
      // 혹시 놓친 미리보기 URL이 있다면 정리
      if (context?.previewUrl) {
        URL.revokeObjectURL(context.previewUrl);
      }
    },
  });
};
