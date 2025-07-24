'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  ActionState,
  createActivityAction,
} from '../../actions/create-activity/actions';
import { formSchema } from '../../schemas/createActivity';
import BannerImageInput from './BannerImageInput';
import CategoryInput from './CategoryInput';
import DescriptionInput from './DescriptionInput';
import IntroImageInput from './IntroImageInput';
import LocationInput from './LocationInput';
import PriceInput from './PriceInput';
import SubmitButton from './SubmitButton';
import TimeSlotInput from './TimeSlotInput/TimeSlotInput';
import TitleInput from './TitleInput';

const initialFormValues = {
  category: '',
  title: '',
  description: '',
  price: 0,
  address: '',
  schedules: [{ date: '', startTime: '', endTime: '' }],
  bannerImages: new DataTransfer().files, // 빈 FileList
  subImages: new DataTransfer().files, // 빈 FileList
};

export type FormValues = z.infer<typeof formSchema>;

const initialState: ActionState = {
  message: null,
  errors: {},
  success: false,
  inputValues: initialFormValues,
};

export default function CreateExperienceForm() {
  const [state, formAction] = useActionState(
    createActivityAction,
    initialState,
  );

  // ✨ [디버깅 로그 3] 서버로부터 받은 state와 inputValues 확인

  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: state.inputValues,
  });

  useEffect(() => {
    // 서버 액션이 성공적으로 완료되었을 때
    if (state.success) {
      alert(state.message || '성공적으로 등록되었습니다.'); // 혹은 토스트 메시지
      // 폼을 완전히 초기 상태로 리셋합니다.
      methods.reset(initialFormValues);
      router.push('/');
    }

    // 서버 액션이 실패하고, 서버가 이전에 입력한 값을 보내줬을 때
    if (!state.success && state.inputValues) {
      // 그 값으로 폼의 상태를 업데이트(복원)합니다.
      methods.reset(state.inputValues);
    }

    // state가 바뀔 때마다 이 effect를 실행합니다.
  }, [state, methods, router]);

  return (
    <FormProvider {...methods}>
      <form
        action={formAction}
        className='flex flex-col gap-[2.4rem]'
        noValidate
      >
        <TitleInput />
        <CategoryInput />
        <DescriptionInput />
        <PriceInput />
        <LocationInput />
        <TimeSlotInput />

        {/* BannerImageInput을 Controller로 감싸 RHF와 연결합니다. */}
        <Controller
          name='bannerImages'
          control={methods.control}
          render={({ field: { onChange, value } }) => (
            <BannerImageInput
              value={value}
              onChange={onChange}
              name='bannerImages'
            />
          )}
        />

        {/* IntroImageInput도 Controller로 감싸 RHF와 연결합니다. */}
        <Controller
          name='subImages' // Zod 스키마에 정의된 이름으로 변경
          control={methods.control}
          render={({ field: { onChange, value } }) => (
            <IntroImageInput
              value={value}
              onChange={onChange}
              name='subImages'
            />
          )}
        />

        <SubmitButton />
      </form>
      {state.message && !state.success && (
        <p className='font-size-16 text-red font-bold'>{state.message}</p>
      )}
    </FormProvider>
  );
}
