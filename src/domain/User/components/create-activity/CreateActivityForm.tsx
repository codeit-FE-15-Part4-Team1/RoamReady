'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/shared/components/Button';

import { formSchema } from '../../schemas/createActivity';
import BannerImageInput from './BannerImageInput';
import CategoryInput from './CategoryInput';
import DescriptionInput from './DescriptionInput';
import IntroImageInput from './IntroImageInput';
import LocationInput from './LocationInput';
import PriceInput from './PriceInput';
import TimeSlotInput from './TimeSlotInput/TimeSlotInput';
import TitleInput from './TitleInput';

type FormValues = z.infer<typeof formSchema>;

export default function CreateExperienceForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      schedules: [{ date: '', startTime: '', endTime: '' }],
    },
  });

  const onSubmit = (data: FormValues) => {
    // 추후에 서버에 전송하는 로직 추가
    console.log('Form Submitted Data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className='flex flex-col gap-[2.4rem]'
      >
        <TitleInput />
        <CategoryInput />
        <DescriptionInput />
        <PriceInput />
        <TimeSlotInput />
        <LocationInput />

        {/* BannerImageInput을 Controller로 감싸 RHF와 연결합니다. */}
        <Controller
          name='bannerImages'
          control={methods.control}
          render={({ field: { onChange, value } }) => (
            <BannerImageInput value={value} onChange={onChange} />
          )}
        />

        {/* IntroImageInput도 Controller로 감싸 RHF와 연결합니다. */}
        <Controller
          name='subImages' // Zod 스키마에 정의된 이름으로 변경
          control={methods.control}
          render={({ field: { onChange, value } }) => (
            <IntroImageInput value={value} onChange={onChange} />
          )}
        />

        <div className='flex w-full justify-center'>
          <Button
            variant='primary'
            size='medium'
            className='h-40'
            type='submit'
          >
            등록하기
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
