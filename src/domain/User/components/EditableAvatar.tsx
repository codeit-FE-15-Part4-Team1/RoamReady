'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { PROFILE_AVATAR_OPTIONS } from '@/shared/components/constants/image';
import Avatar from '@/shared/components/ui/avatar';
import { useImageCompression } from '@/shared/hooks/useImageCompression';

import { useProfileImageMutation } from '../hooks/useProfileImageMutation';
import AvatarEditButton from './AvatarEditButton';

/**
 * EditableAvatar 컴포넌트의 props
 */
interface EditableAvatarProps {
  /**
   * 컴포넌트가 처음 렌더링될 때 표시할 초기 이미지 URL.
   * 이미지 업로드 실패 시 이 URL로 복구됩니다.
   */
  initialImageUrl: string;
}

/**
 * 마이페이지에서 사용되는 대형 + 수정 버튼을 포함하는 컴포넌트입니다.
 * 이미지 선택, 이미지 업로드, 이미지 반영 등 비즈니스 로직을 한 번에 포함합니다.
 * @param initialImageUrl - 초기 아바타 이미지 URL
 */
export default function EditableAvatar({
  initialImageUrl,
}: EditableAvatarProps) {
  // 화면에 실제로 보여지는 이미지 URL을 관리하는 상태
  // 낙관적 업데이트를 위해 즉시 미리보기 URL로 변경되었다가, 최종적으로 서버 URL로 교체됩니다.
  const [profileImageUrl, setProfileImageUrl] =
    useState<string>(initialImageUrl);

  // 이미지 압축 커스텀 훅
  const { compressImage, isCompressing } = useImageCompression();

  // 이미지 업로드(Mutation) 커스텀 훅 (Tasntack-Query 기반)
  const { mutate, isPending: isUploading } = useProfileImageMutation({
    setProfileImageUrl,
    initialImageUrl,
  });

  /**
   * 이미지가 압축 중이거나 업로드 중일 때를 모두 포함하는 통합 로딩 상태.
   */
  const isLoading = isCompressing || isUploading;

  /**
   * 파일 input의 변경 이벤트를 받아 이미지 처리 플로우 전체를 실행하는 핸들러.
   */
  const handleImageFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      // 1. 사용자가 디바이스에서 선택한 파일 가져오기
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        // 2. 이미지 압축 실행 (압축이 끝날 때까지 기다림)
        const compressedFile = await compressImage(
          file,
          PROFILE_AVATAR_OPTIONS,
        );

        // 3. 압축된 파일로 업로드(Mutation) 실행.
        // useProfileImageMutation 훅의 onMutate가 즉시 실행되어 낙관적 업데이트가 시작됩니다.
        mutate(compressedFile);
      } catch (error) {
        // 압축 과정에서 에러 발생 시 처리
        console.log(error);
        alert('이미지 처리 중 오류가 발생했습니다.');
      }
    },
    // 의존성 배열: 이 함수들은 재생성되지 않으므로, handleImageFileChange도 처음 한 번만 생성됩니다.
    [compressImage, mutate],
  );

  /**
   * 컴포넌트가 unmount되거나 profileImageUrl이 변경될 때,
   * 이전에 생성된 blob URL의 메모리를 해제하여 누수를 방지합니다.
   */
  useEffect(() => {
    const currentUrl = profileImageUrl;

    // cleanup
    return () => {
      // URL이 'blob:'으로 시작하는 임시 URL인 경우에만 메모리 해제 실행
      if (currentUrl && currentUrl.startsWith('blob:')) {
        URL.revokeObjectURL(currentUrl);
        console.log(`메모리 해제: ${currentUrl}`);
      }
    };
  }, [profileImageUrl]);

  return (
    <div className='relative w-fit'>
      {/* 아바타 UI를 표시하는 Presentational 컴포넌트 */}
      <Avatar
        profileImageUrl={profileImageUrl}
        size='lg'
        isLoading={isLoading}
      />
      <div className='absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 transform'>
        <AvatarEditButton
          onFileChange={handleImageFileChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
