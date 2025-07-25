'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import type { FormValues } from '../../schemas/createActivity';
import { formSchema } from '../../schemas/createActivity';
import {
  createActivity,
  uploadActivityImages,
} from '../../services/create-activity/createActivity.api';
import BannerImageInput from './BannerImageInput';
import CategoryInput from './CategoryInput';
import DescriptionInput from './DescriptionInput';
import IntroImageInput from './IntroImageInput';
import LocationInput from './LocationInput';
import PriceInput from './PriceInput';
import SubmitButton from './SubmitButton';
import TimeSlotInput from './TimeSlotInput/TimeSlotInput';
import TitleInput from './TitleInput';

const initialFormValues: FormValues = {
  category: '',
  title: '',
  description: '',
  price: 0,
  address: '',
  schedules: [{ date: '', startTime: '', endTime: '' }],
  bannerImages: null,
  subImages: null,
};

export default function CreateActivityForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: initialFormValues,
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmittingError(null);

    try {
      const bannerImageFile = data.bannerImages?.[0];
      const bannerImageResponse = await uploadActivityImages(
        bannerImageFile as File,
      );
      const bannerImageUrl = bannerImageResponse.activityImageUrl;

      const subImageFiles = Array.from(data.subImages || []);
      const subImageUploadPromises = subImageFiles.map((file) =>
        uploadActivityImages(file),
      );
      const subImageResponses = await Promise.all(subImageUploadPromises);
      const subImageUrls = subImageResponses.map((res) => res.activityImageUrl);

      const finalFormData = {
        title: data.title,
        category: data.category,
        description: data.description,
        price: data.price,
        address: data.address,
        schedules: data.schedules,
        bannerImageUrl,
        subImageUrls,
      };

      await createActivity(finalFormData);
      methods.reset();
      router.push('/');
    } catch (error) {
      setSubmittingError(
        (error as { message: string }).message || '서버 오류가 발생했습니다.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
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
              value={value || undefined}
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
              value={value || undefined}
              onChange={onChange}
              name='subImages'
            />
          )}
        />

        <SubmitButton isSubmitting={isSubmitting} />
      </form>
      {submittingError && (
        <p className='font-size-16 text-red font-bold'>{submittingError}</p>
      )}
    </FormProvider>
  );
}
