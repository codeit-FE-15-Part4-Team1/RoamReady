'use client';

import { FormProvider, useForm } from 'react-hook-form';

import InputExample from '@/shared/components/ui/input/InputExample';

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
 * `Input` 컴포넌트의 다양한 사용 예시를 렌더링하고 테스트하는 페이지입니다.
 * 이 컴포넌트는 `react-hook-form`의 `useForm` 훅을 초기화하여 폼의 전체 상태와 로직을 관리합니다.
 *
 * 주요 역할은 다음과 같습니다:
 * - 폼 컨텍스트 제공:
 * useForm이 반환하는 모든 폼 관련 메서드와 상태(control 제외)를
 * <FormProvider {...form}>을 통해 하위 컴포넌트(예: InputExample)에 컨텍스트로 제공합니다.
 * 이를 통해 하위 컴포넌트들은 useFormContext 훅을 사용하여 폼 데이터를 쉽게 다룰 수 있습니다.
 *
 * - 필수 Props 전달:
 * InputExample 컴포넌트에 폼 제출 핸들러 (onSubmit), 제출 상태 (isSubmitting),
 * 그리고 useImagePreview 같은 훅에서 필요한 control 객체를 명시적인 prop으로 전달합니다.
 *
 * 즉, InputTestPage는 react-hook-form을 설정하고 InputExample이 폼의 기능을 활용할 수 있도록 환경을 조성하는 컨트롤러 역할을 합니다.
 */
export default function InputTestPage() {
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
    control,
  } = form;

  /**
   * @function onSubmit
   * @description
   * 폼 제출 시 호출되는 비동기 핸들러 함수입니다.
   * `react-hook-form`의 `handleSubmit`에 의해 폼 유효성 검사 통과 후 호출되며,
   * 유효한 폼 데이터를 인수로 받습니다. 이 함수 내에서 실제 폼 데이터 처리 로직(예: API 호출, 상태 업데이트)을 구현할 수 있습니다.
   * @param {FormValues} data - 제출된 폼 데이터 객체입니다. `FormValues` 타입으로 정의됩니다.
   */
  const onSubmit = (data: FormValues) => {
    console.log('폼 제출:', data);
    // 여기에 폼 데이터 처리 로직(예: API 호출)을 추가할 수 있습니다.
  };

  return (
    <FormProvider {...form}>
      <InputExample
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        control={control}
      />
    </FormProvider>
  );
}
