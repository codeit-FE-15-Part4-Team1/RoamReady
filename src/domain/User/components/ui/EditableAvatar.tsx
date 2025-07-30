'use client';

import { ChangeEvent, useCallback, useState } from 'react';

import { PROFILE_AVATAR_OPTIONS } from '@/shared/components/constants/image';
import Avatar from '@/shared/components/ui/avatar';
import { useImageCompression } from '@/shared/hooks/useImageCompression';
import { cn } from '@/shared/libs/cn';

import { useProfileImageMutation } from '../../hooks/useProfileImageMutation';
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
  /**
   * 이미지가 변경될 때 호출되는 콜백 함수.
   * 상위 컴포넌트에서 이미지 변경을 감지하고 상태를 업데이트하는 데 사용됩니다.
   */
  onImageChange?: (imageUrl: string) => void;
  className?: string;
}

/**
 * 마이페이지에서 사용되는 대형 + 수정 버튼을 포함하는 컴포넌트입니다.
 * 이미지 선택, 압축, 업로드 등의 비즈니스 로직을 포함하며 낙관적 업데이트를 지원합니다.
 *
 * ### 사용자 경험 플로우:
 * 1. **이미지 선택** → 파일 압축 → **즉시 미리보기 표시**
 * 2. **백그라운드 업로드** → 성공 시 서버 URL로 교체, 실패 시 롤백
 *
 * @param initialImageUrl - 초기 아바타 이미지 URL
 * @param onImageChange - 이미지 변경 시 호출되는 콜백 함수
 */
export default function EditableAvatar({
  initialImageUrl,
  onImageChange,
  className,
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
    onImageChange,
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

        // 3. 압축된 파일을 즉시 서버에 업로드
        mutate(compressedFile);
      } catch (error) {
        // 압축 과정에서 에러 발생 시 처리
        console.error('이미지 처리 중 오류가 발생했습니다:', error);
        alert('이미지 처리 중 오류가 발생했습니다.');
      }
    },
    [compressImage, mutate],
  );

  // 메모리 해제는 useProfileImageMutation에서 처리함 (낙관적 업데이트)

  return (
    <div className={cn('relative w-fit', className)}>
      {/* 아바타 UI를 표시하는 Presentational 컴포넌트 */}
      <Avatar
        profileImageUrl={profileImageUrl}
        size='lg'
        isLoading={isLoading}
      />
      <div className='absolute right-0 bottom-[15%]'>
        <AvatarEditButton
          onFileChange={handleImageFileChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
