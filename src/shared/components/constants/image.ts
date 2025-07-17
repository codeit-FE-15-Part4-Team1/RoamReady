import { ImageCompressionOptions } from '@/shared/hooks/useImageCompression';

/** 프로필 아바타용 압축 옵션 */
export const PROFILE_AVATAR_OPTIONS: ImageCompressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 400,
  quality: 0.85,
};

/** 액티비티 사진용 압축 옵션 (가장 표준적) */
export const ACTIVITY_IMAGE_OPTIONS: ImageCompressionOptions = {
  maxSizeMB: 2,
  maxWidthOrHeight: 1280,
  quality: 0.8,
};
