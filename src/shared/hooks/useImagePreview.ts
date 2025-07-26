'use client';

import { useEffect, useState } from 'react';
import { Control, FieldValues, Path, useWatch } from 'react-hook-form';

/**
 * @function useImagePreview
 * @description
 * 특정 `fieldName`에 연결된 이미지 파일을 감시하고 미리보기 URL을 생성해주는 커스텀 React 훅입니다.
 * 이 훅은 `react-hook-form`의 `control` 객체를 매개변수로 받아 파일 입력의 변화를 감지합니다.
 * 사용자가 `<input type="file" />` 요소를 통해 이미지를 업로드하면,
 * `react-hook-form`에 의해 관리되는 파일 객체(`File`)를 기반으로 브라우저에서
 * 생성된 미리보기 URL(`previewUrl`)을 제공합니다.
 *
 * @template TFieldValues - 폼 전체의 타입을 나타내는 제네릭 타입입니다. `Record<string, any>`를 확장하여
 * 문자열 키와 모든 타입의 값을 가질 수 있는 객체임을 명시합니다.
 * @template TName - `fieldName` 매개변수에 전달될 필드 이름의 타입을 나타내는 제네릭 타입입니다.
 * `TFieldValues` 내에 존재하는 유효한 경로 문자열만 허용하도록 `Path<TFieldValues>`를 확장합니다.
 *
 * @param {TName} fieldName - **(필수)** `react-hook-form`에 등록된 파일 입력 필드의 이름입니다.
 * 이는 `TFieldValues` 타입 내의 유효한 경로여야 합니다 (예: 'profileImage', 'user.avatar').
 * @param {Control<TFieldValues>} control - **(필수)** `react-hook-form`의 `useForm`에서 반환된 `control` 객체입니다.
 * 이 객체를 통해 훅이 폼의 현재 상태와 값을 감시합니다.
 *
 * @returns {{
 * file: File | null;
 * previewUrl: string | null;
 * }} 반환되는 객체는 다음과 같은 속성을 포함합니다.
 * - `file`: 현재 선택된 `File` 객체입니다. 파일이 선택되지 않았거나 유효하지 않은 경우 `null`을 반환합니다.
 * 이는 `react-hook-form`이 관리하는 `FileList`에서 첫 번째 파일을 추출한 결과입니다.
 * - `previewUrl`: 브라우저에서 생성된 이미지 미리보기 URL입니다. 선택된 파일이 없으면 `null`입니다.
 * 이 URL은 `URL.createObjectURL()`에 의해 생성되며, `<img>` 태그의 `src` 속성으로 사용될 수 있습니다.
 * **주의**: 이 URL은 임시적이며, 컴포넌트 언마운트 또는 파일 변경 시 `URL.revokeObjectURL()`을 통해 메모리에서 해제됩니다.
 *
 * @example
 * ```tsx
 * FormProvider로 감싸진 컴포넌트 (예: SignupPage 또는 SigninPage) 내부에서 사용
 * import { useForm, FormProvider } from 'react-hook-form';
 *
 * interface MyFormData {
 * profileImage?: FileList; // react-hook-form에서 파일 입력은 보통 FileList 타입입니다.
 * ...
 * nickname: string;
 * }
 *
 * function SignupPage() {
 * const { control, ...methods } = useForm<MyFormData>({
 * defaultValues: { profileImage: undefined, nickname: '' }
 * });
 *
 * 'profileImage' 필드의 변화를 감시하여 미리보기 URL을 얻습니다.
 * const { previewUrl } = useImagePreview('profileImage', control);
 *
 * return (
 * <FormProvider {...methods}>
 * <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
 * <Input.Root name="nickname" type="text">
 * <Input.Label>사용자 이름</Input.Label>
 * <Input.Field placeholder="이름을 입력하세요" />
 * </Input.Root>
 *
 * <Input.Root name="profileImage" type="file">
 * <Input.Trigger triggerType="file-upload" className="w-full h-32 border flex items-center justify-center cursor-pointer">
 * {previewUrl ? (
 * <img src={previewUrl} alt="미리보기" className="max-w-full max-h-full object-contain"/>
 * ) : (
 * <span>클릭하여 이미지 업로드</span>
 * )}
 * </Input.Trigger>
 * <Input.Field accept="image/*" />
 * <Input.Helper fallbackMessage="JPG, PNG, GIF 등 이미지 파일만 업로드 가능합니다." />
 * </Input.Root>
 *
 * <Button type="submit">회원가입</Button>
 * </form>
 * </FormProvider>
 * );
 * }
 * ```
 */
const useImagePreview = <
  TFieldValues extends FieldValues,
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

export default useImagePreview;
