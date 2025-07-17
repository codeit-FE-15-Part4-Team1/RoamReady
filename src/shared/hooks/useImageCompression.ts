import { useState } from 'react';
import imageCompression from 'browser-image-compression';

/**
 * useImageCompression 훅에서 이미지 압축에 사용될 옵션 객체의 타입
 */
export interface ImageCompressionOptions {
  /** 압축 후 최대 파일 크기 (MB 단위) */
  maxSizeMB: number;
  /** 압축 후 최대 너비 또는 높이 (px 단위). 원본 비율은 유지됩니다. */
  maxWidthOrHeight: number;
  /** JPEG 압축 품질 (0~1 사이의 값, 1에 가까울수록 고화질) */
  quality: number;
}

/**
 * 이미지 압축 로직과 로딩 상태를 제공하는 커스텀 훅입니다.
 * `browser-image-compression` 라이브러리를 사용합니다.
 *
 * @returns `compressImage` 이미지 압축을 실행하는 `async` 함수
 * @returns `isCompressing` 이미지 압축이 진행 중인지 여부를 나타내는 `boolean` 상태
 *
 * @example
 * ```tsx
 * const { compressImage, isCompressing } = useImageCompression();
 * ...
 * const handleFileSelect = async (file) => {
 *   const options = {
 *     maxSizeMB: 1,
 *     maxWidthOrHeight: 1024,
 *     quality: 0.8
 *   };
 *   if (isCompressing) return;
 *
 *   const compressedFile = await compressImage(file, options);
 *   // 압축된 이미지 파일로 작업 이어서 진행
 *   ...
 * };
 * ```
 */
export const useImageCompression = () => {
  const [isCompressing, setIsCompressing] = useState(false);

  /**
   * 이미지 파일을 받아 주어진 옵션에 따라 압축을 실행합니다.
   * @param file - 압축할 원본 `File` 객체
   * @param options - 압축을 위한 `ImageCompressionOptions` 객체
   * @returns 압축된 새로운 `File` 객체를 담은 `Promise`
   */
  const compressImage = async (
    file: File,
    options: ImageCompressionOptions,
  ): Promise<File> => {
    setIsCompressing(true);
    console.log(`압축 시작... 원본: ${(file.size / 1024 / 1024).toFixed(2)}MB`);

    try {
      const compressedFile = await imageCompression(file, {
        ...options,
        useWebWorker: true, // UI 멈춤 현상을 방지하기 위해 웹 워커 사용
      });
      console.log(
        `압축 성공! 결과: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`,
      );
      return compressedFile;
    } catch (e) {
      console.error('이미지 압축에 실패했습니다:', e);
      throw e; // 에러를 호출한 쪽으로 다시 던져서 처리할 수 있도록 함
    } finally {
      setIsCompressing(false);
    }
  };

  return {
    /** 이미지 압축을 실행하는 async 함수 */
    compressImage,
    /** 이미지 압축이 진행 중인지 여부를 나타내는 boolean 상태 */
    isCompressing,
  };
};
