import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

interface MutationHookProp {
  setProfileImageUrl: Dispatch<SetStateAction<string>>;
  initialImageUrl: string;
}

// 이미지 업로드 mock api 입니다.
// 추후 유저 기능 완성 후 tanstack-query 기반 api로 변경할 예정입니다.
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

export const useProfileImageMutation = ({
  setProfileImageUrl,
  initialImageUrl,
}: MutationHookProp) => {
  return useMutation({
    mutationFn: mockUploadApi,
    onMutate: async (imageFile: File) => {
      // UI 즉시 업데이트 (낙관적 업데이트)
      const imagePreviewUrl = URL.createObjectURL(imageFile);
      setProfileImageUrl;

      // 롤백 대비 context에 이전/임시 값 저장
      return { previousImagePreviewUrl: initialImageUrl, imagePreviewUrl };
    },
    onError: (error, _, context) => {
      console.error('이미지 업로드를 실패했습니다. 롤백을 실행합니다.', error);
      if (context?.previousImagePreviewUrl) {
        setProfileImageUrl(context.previousImagePreviewUrl);
      }
    },
    onSettled: (data, error, variables, context) => {
      if (context?.previousImagePreviewUrl) {
        URL.revokeObjectURL(context.imagePreviewUrl);
      }

      if (data) {
        setProfileImageUrl(data.profileImageUrl);
      }
    },
  });
};
