'use client';

import { FormProvider, useForm } from 'react-hook-form';

import InputExample from '@/shared/components/ui/input/Example';

interface FormValues {
  textExample: string;
  textExampleHalf: string;
  password: string;
  email: string;
  comment: string;
  profileImage?: FileList;
  disabledExample: string;
  searchExample: string;
  numberExample: number;
}

/**
 * @component InputTestPage
 * @description
 * `Input` 컴포넌트의 다양한 사용 예시를 렌더링하는 테스트용 페이지입니다.
 * 이 컴포넌트는 `react-hook-form`의 `useForm` 훅을 초기화하고,
 * `FormProvider`를 통해 폼 컨텍스트를 하위의 `Example` 컴포넌트에 제공합니다.
 * `Example` 컴포넌트가 폼 데이터를 관리하는 데 필요한 `onSubmit`, `isSubmitting`, `control` 객체를 `prop`으로 전달합니다.
 */
export default function InputTestPage() {
  // `useForm`을 이 페이지에서 초기화하여 폼 전체의 상태를 관리하고,
  // `FormProvider`를 통해 하위 컴포넌트들에게 컨텍스트를 제공합니다.
  const form = useForm<FormValues>({
    defaultValues: {
      textExample: '',
      textExampleHalf: '',
      password: '',
      email: '',
      comment: '',
      profileImage: undefined as FileList | undefined,
      disabledExample: '',
      searchExample: '',
      numberExample: 0,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control, // `Example` 컴포넌트의 `useImagePreview`에 전달하기 위해 필요합니다.
  } = form;

  /**
   * @function onSubmit
   * @description
   * 폼 제출 시 호출되는 핸들러 함수입니다.
   * `react-hook-form`의 `handleSubmit`에 의해 유효성 검사 후 호출되며, 폼 데이터를 인수로 받습니다.
   * @param {any} data - 제출된 폼 데이터 객체입니다.
   */
  const onSubmit = (data: FormValues) => {
    console.log('폼 제출:', data);
    // 여기에 폼 데이터 처리 로직(예: API 호출)을 추가할 수 있습니다.
  };

  return (
    // `FormProvider`로 `Example` 컴포넌트를 감싸서 `Example` 컴포넌트 내부에서
    // `useFormContext`를 사용할 수 있게 합니다.
    <FormProvider {...form}>
      {/* `Example` 컴포넌트에 폼 제출 핸들러, 제출 상태, `control` 객체를 `prop`으로 전달합니다. */}
      <InputExample
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        control={control}
      />
    </FormProvider>
  );
}
