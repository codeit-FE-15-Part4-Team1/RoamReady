'use server';

import { FormValues } from '../../components/create-activity/CreateActivityForm';
import { formSchema } from '../../schemas/createActivity';
import { createActivityWithFormData } from '../../services/create-activity/createAcitvity.api';

export interface ActionState {
  message: string | null;
  errors?: Record<string, string[] | undefined> | null;
  success: boolean;
  inputValues?: Partial<FormValues>;
}

// 메인 서버 액션 함수
export const createActivityAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const schedules = [];
  let i = 0;
  while (formData.has(`schedules.${i}.date`)) {
    schedules.push({
      date: (formData.get(`schedules.${i}.date`) as string) || '',
      startTime: (formData.get(`schedules.${i}.startTime`) as string) || '',
      endTime: (formData.get(`schedules.${i}.endTime`) as string) || '',
    });
    i++;
  }

  const objectToValidate = {
    title: (formData.get('title') as string) || '',
    category: (formData.get('category') as string) || '',
    description: (formData.get('description') as string) || '',
    price: Number(formData.get('price')) || 0,
    address: (formData.get('address') as string) || '',
    schedules, // 이제 이 배열의 타입이 FormValues와 호환됩니다.
    bannerImages: formData.getAll('bannerImages') as File[],
    subImages: formData.getAll('subImages') as File[],
  };

  const validatedFields = formSchema.safeParse(objectToValidate);

  if (!validatedFields.success) {
    const { fieldErrors } = validatedFields.error.flatten();
    const firstErrorMessage =
      Object.values(fieldErrors).flat()[0] || '입력 내용을 다시 확인해주세요.';

    return {
      message: firstErrorMessage,
      errors: fieldErrors,
      success: false,
      inputValues: {
        ...objectToValidate,
        // File 객체는 직렬화할 수 없으므로, 변환하지 않기 위해 undefined로 설정
        bannerImages: undefined,
        subImages: undefined,
      },
    };
  }

  try {
    await createActivityWithFormData(formData);
    return {
      message: '체험이 성공적으로 등록되었습니다!',
      success: true,
      errors: null,
    };
  } catch (error: unknown) {
    let errorMessage = '서버에 예상치 못한 오류가 발생했습니다.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // ✨ [핵심 수정] 예외가 발생했을 때도 입력값을 유지하기 위해
    // 이전에 입력된 값(파일 제외)을 inputValues에 담아 반환합니다.
    const valuesToReturn = {
      ...objectToValidate,
      bannerImages: undefined,
      subImages: undefined,
    };

    return {
      message: errorMessage,
      success: false,
      errors: null,
      inputValues: valuesToReturn,
    };
  }
};
