'use client';

import { useEffect, useState } from 'react';
import { Control, Path,useWatch } from 'react-hook-form';

/**
 * @function useImagePreview
 * @description
 * 특정 `fieldName`에 연결된 이미지 파일을 감시하고 미리보기 URL을 생성해주는 커스텀 React 훅입니다.
 * 이 훅은 `react-hook-form`의 `control` 객체를 매개변수로 받아 파일 입력의 변화를 감지합니다.
 * 사용자가 `<input type="file" />` 요소를 통해 이미지를 업로드하면,
 * `react-hook-form`에 의해 관리되는 파일 객체(`File`)를 기반으로 브라우저에서
 * 생성된 미리보기 URL(`previewUrl`)을 제공합니다.
 *
 * @param {string} fieldName - `react-hook-form`에 등록된 파일 입력 필드의 이름입니다.
 * @param {Control<any>} control - **(필수)** `react-hook-form`의 `useForm`에서 반환된 `control` 객체입니다. 이 객체를 통해 훅이 폼 상태에 접근합니다.
 * @returns {{
 * file: File | null;
 * previewUrl: string | null;
 * }}
 * - `file`: 현재 선택된 파일 객체입니다. 선택되지 않은 경우 `null`입니다. `react-hook-form`이 관리하는 값을 반영합니다.
 * - `previewUrl`: 브라우저에서 생성된 이미지 미리보기 URL입니다. 선택된 파일이 없으면 `null`입니다.
 *
 * @example
 * ```tsx
 * FormProvider로 감싸진 컴포넌트 (예: Example 또는 SignInPage) 내부에서 사용
 * import { useForm, FormProvider } from 'react-hook-form';
 * import Input from '@/shared/components/ui/input'; // Input 컴포넌트 가정
 *
 * function MyFormComponent() {
 * const { control, ...form } = useForm({
 * defaultValues: { profileImage: undefined }
 * });
 * const { previewUrl } = useImagePreview('profileImage', control); // **control 객체 전달**
 *
 * return (
 * <FormProvider {...form}>
 * <Input.Root name="profileImage" type="file">
 * <Input.Trigger triggerType="file-upload">
 * {previewUrl && <img src={previewUrl} alt="미리보기" style={{ width: 100, height: 100 }} />}
 * {!previewUrl && <span>이미지 업로드</span>}
 * </Input.Trigger>
 * <Input.Field accept="image/*" />
 * </Input.Root>
 * </FormProvider>
 * );
 * }
 * ```
 */
export const useImagePreview = <
  TFieldValues extends Record<string, any>,
  TName extends Path<TFieldValues>,
>(
  fieldName: TName,
  control: Control<TFieldValues>,
) => {
  const files = useWatch({
    control,
    name: fieldName,
  }) as FileList | undefined;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!files || files.length === 0) {
      setPreviewUrl(null);
      return;
    }

    const file = files[0];
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [files]);

  return {
    file: files?.[0] ?? null,
    previewUrl,
  };
};
