import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

interface MutationHookProp {
  setProfileImageUrl: Dispatch<SetStateAction<string>>;
  initialImageUrl: string;
}

// 이미지 업로드 mock api 입니다.
const mockUploadApi = (file: File): Promise<{ profileImageUrl: string }> => {
  console.log(`[MOCK API] 서버 업로드 시작: ${file.name}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const newImageUrl = URL.createObjectURL(file);
      console.log(`[MOCK API] 새 이미지 URL 수신: ${newImageUrl}`);
      resolve({ profileImageUrl: newImageUrl });
    }, 1500);
  });
};

/**
 * 프로필 이미지 업로드(Mutation)와 낙관적 업데이트 로직을 처리하는 커스텀 훅입니다.
 * @param setProfileImageUrl - 부모 컴포넌트의 이미지 URL 상태를 업데이트하는 함수
 * @param initialImageUrl - 롤백 시 돌아갈 초기 이미지 URL
 * @returns TanStack Query의 `useMutation` 결과 객체 (`mutate` 함수, `isPending` 상태 등)
 */
export const useProfileImageMutation = ({
  setProfileImageUrl,
  initialImageUrl,
}: MutationHookProp) => {
  return useMutation({
    mutationFn: mockUploadApi,

    // 1. Mutation이 시작되기 직전에 실행됩니다. (낙관적 업데이트의 핵심)
    onMutate: async (imageFile: File) => {
      // 롤백을 대비하여 이전 이미지 URL을 저장합니다.
      const previousImageUrl = initialImageUrl;

      // 사용자에게 즉각적인 피드백을 주기 위해 임시 미리보기 URL을 생성합니다.
      const previewUrl = URL.createObjectURL(imageFile);

      // setProfileImageUrl 함수를 호출하여 UI를 즉시 업데이트합니다.
      setProfileImageUrl(previewUrl);

      // onError와 onSettled에서 사용할 값들을 context 객체에 담아 반환합니다.
      return { previousImageUrl, previewUrl };
    },

    // 2. Mutation이 실패했을 때 실행됩니다.
    onError: (error, _variables, context) => {
      console.error('이미지 업로드를 실패했습니다. 롤백을 실행합니다.', error);
      // onMutate에서 저장해 둔 이전 이미지로 UI를 되돌립니다.
      if (context?.previousImageUrl) {
        setProfileImageUrl(context.previousImageUrl);
      }
    },

    // 3. Mutation이 성공했을 때 실행됩니다.
    onSuccess: (data) => {
      // API로부터 받은 최종 이미지 URL로 UI 상태를 업데이트합니다.
      setProfileImageUrl(data.profileImageUrl);
    },

    // 4. Mutation이 성공하든 실패하든, 마지막에 항상 실행됩니다. (주로 뒷정리 로직)
    onSettled: (_data, _error, _variables, context) => {
      // onMutate에서 생성했던 임시 미리보기 URL의 메모리를 해제합니다.
      if (context?.previewUrl) {
        URL.revokeObjectURL(context.previewUrl);
      }
    },
  });
};
