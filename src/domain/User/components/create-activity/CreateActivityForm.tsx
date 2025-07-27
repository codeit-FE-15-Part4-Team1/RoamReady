'use client';

import { Controller, FormProvider } from 'react-hook-form';

import { useActivityForm } from '@/domain/User/hooks/create-activity/useActivityForm';

import BannerImageInput from './BannerImageInput';
import CategoryInput from './CategoryInput';
import DescriptionInput from './DescriptionInput';
import IntroImageInput from './IntroImageInput';
import LocationInput from './LocationInput';
import PriceInput from './PriceInput';
import SubmitButton from './SubmitButton';
import TimeSlotInput from './TimeSlotInput/TimeSlotInput';
import TitleInput from './TitleInput';

export default function CreateActivityForm() {
  const {
    methods,
    isEdit,
    isLoading,
    isSubmitting,
    submittingError,
    existingImageUrls,
    handleRemoveSubImage,
    onSubmit,
    handleRemoveBannerImage,
  } = useActivityForm();

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        <LocationInput />
        <TimeSlotInput />

        <Controller
          name='bannerImages'
          control={methods.control}
          render={({ field: { onChange, value } }) => (
            console.log('BannerImageInput value', value),
            (
              <BannerImageInput
                value={value}
                onChange={onChange}
                name='bannerImages'
                existingImageUrl={existingImageUrls.bannerImageUrl}
                onRemoveExistingImage={handleRemoveBannerImage}
              />
            )
          )}
        />

        <Controller
          name='subImages'
          control={methods.control}
          render={({ field: { onChange, value } }) => {
            console.log(
              '➡️ IntroImageInput으로 전달되는 기존 이미지 URL:',
              existingImageUrls.subImageUrls,
            );
            console.log('IntroImageInput value', value);
            console.log(
              'IntroImageInput existingImageUrls',
              existingImageUrls.subImageUrls,
            );

            return (
              <IntroImageInput
                value={value}
                onChange={onChange}
                name='subImages'
                existingImageUrls={existingImageUrls.subImageUrls}
                onRemoveExistingImage={handleRemoveSubImage}
              />
            );
          }}
        />

        <SubmitButton isSubmitting={isSubmitting} isEdit={isEdit} />
      </form>
      {submittingError && (
        <p className='font-size-16 text-red font-bold'>{submittingError}</p>
      )}
    </FormProvider>
  );
}
