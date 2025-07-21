import { ChangeEvent, useEffect, useState } from 'react';

/**
 * @function useImagePreview
 * @description
 * 이미지 파일을 선택하고 미리보기 URL을 생성해주는 커스텀 React 훅입니다.
 * 사용자가 `<input type="file" />` 요소를 통해 이미지를 업로드하면
 * 해당 파일 객체(`File`)와 브라우저에서 생성된 미리보기 URL(`previewUrl`)을 제공합니다.
 *
 * @returns {{
 *   file: File | null;
 *   previewUrl: string | null;
 *   handleFileChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
 * }}
 * - `file`: 현재 선택된 파일 객체입니다. 선택되지 않은 경우 `null`입니다.
 * - `previewUrl`: 브라우저에서 생성된 이미지 미리보기 URL입니다. 선택된 파일이 없으면 `null`입니다.
 * - `handleFileChange`: `<input type="file" />`의 `onChange`에 연결할 이벤트 핸들러입니다.
 *
 * @example
 * ```tsx
 * const { file, previewUrl, handleFileChange } = useImagePreview();
 *
 * return (
 *   <>
 *     <input type="file" accept="image/*" onChange={handleFileChange} />
 *     {previewUrl && <Img src={previewUrl} alt="미리보기" />}
 *   </>
 * );
 * ```
 */
export const useImagePreview = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const removeImage = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    //진짜 배열이 아니므로 배열로 변환
    const selectedFiles = Array.from(fileList);

    setFiles((prev) => {
      // 중복 검사 (파일명 기준) Set을 활용하여 중복된 파일은 추가하지 않음
      const existingNames = new Set(prev.map((file) => file.name));
      const newFiles = selectedFiles.filter(
        (file) => !existingNames.has(file.name),
      );
      return [...prev, ...newFiles];
    });

    // 같은 파일 재선택을 위해 input 초기화
    e.target.value = '';
  };

  // 파일 변경 시 미리보기 URL 업데이트
  useEffect(() => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    if (files.length === 0) {
      setPreviewUrls([]);
      return;
    }

    const objectUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(objectUrls);

    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]); // previewUrls는 files에 의해 항상 업데이트되므로 의존성 배열에 포함하지 않음

  return { files, previewUrls, handleFileChange, removeImage };
};
