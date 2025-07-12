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
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target instanceof HTMLInputElement && e.target.files) {
      const selectedFile = e.target.files[0];

      if (selectedFile) {
        setFile(selectedFile);
      } else {
        setFile(null);
      }
    }
  };

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return { file, previewUrl, handleFileChange };
};
