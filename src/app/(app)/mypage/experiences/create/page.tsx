'use client';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'; // 1. 플러그인 import
import { FormProvider, useForm } from 'react-hook-form';

import BannerImageInput from '@/domain/User/components/create-activity/BannerImageInput';
import CategoryInput from '@/domain/User/components/create-activity/CategoryInput';
import DescriptionInput from '@/domain/User/components/create-activity/DescriptionInput';
import IntroImageInput from '@/domain/User/components/create-activity/IntroImageInput';
import PriceInput from '@/domain/User/components/create-activity/PriceInput';
import TimeSlotInput from '@/domain/User/components/create-activity/TimeSlotInput/TimeSlotInput';
import TitleInput from '@/domain/User/components/create-activity/TitleInput';
import Button from '@/shared/components/Button';

dayjs.extend(customParseFormat); // 2. dayjs에 플러그인 적용

export default function CreateExperiencePage() {
  const methods = useForm();

  return (
    <div className='mb-[3.4rem] w-[120rem]'>
      <h1 className='font-size-18 py-20 font-bold'>내 체험 등록</h1>
      <FormProvider {...methods}>
        <form className='flex flex-col gap-[2.4rem]'>
          <TitleInput />
          <CategoryInput />
          <DescriptionInput />
          <PriceInput />
          <TimeSlotInput />
          <BannerImageInput />
          <IntroImageInput />
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
    </div>
  );
}
