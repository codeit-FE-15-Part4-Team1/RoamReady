'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/shared/components/Button';

import BannerImageInput from './BannerImageInput';
import CategoryInput from './CategoryInput';
import DescriptionInput from './DescriptionInput';
import IntroImageInput from './IntroImageInput';
import LocationInput from './LocationInput';
import PriceInput from './PriceInput';
import TimeSlotInput from './TimeSlotInput/TimeSlotInput';
import TitleInput from './TitleInput';

// Zod 스키마와 타입 정의 (기존과 동일)
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  category: z.string({ required_error: '카테고리를 선택해주세요.' }),
  description: z.string().min(1, '설명을 입력해주세요.'),
  price: z.coerce.number().min(0, '가격은 0 이상이어야 합니다.'),
  address: z.string().min(1, '주소를 입력해주세요.'),
  schedules: z
    .array(
      z
        .object({
          date: z.string().min(1, '날짜를 선택해주세요.'),
          startTime: z.string().min(1, '시작 시간을 선택해주세요.'),
          endTime: z.string().min(1, '종료 시간을 선택해주세요.'),
        })
        // [수정] .refine()을 사용하여 객체 수준의 유효성 검사를 추가합니다.
        .refine(
          (data) => {
            // date, startTime, endTime이 모두 있어야 비교가 가능합니다.
            if (!data.date || !data.startTime || !data.endTime) {
              return true; // 아직 모든 필드가 채워지지 않았을 때는 통과시킵니다.
            }
            const start = dayjs(`${data.date} ${data.startTime}`);
            const end = dayjs(`${data.date} ${data.endTime}`);
            return end.isAfter(start); // end가 start 이후 시간인지 확인합니다.
          },
          {
            // 유효성 검사 실패 시 이 메시지를 보여줍니다.
            message: '종료 시간은 시작 시간보다 늦어야 합니다.',
            // 이 에러가 'endTime' 필드에 대한 것임을 명시합니다.
            path: ['endTime'],
          },
        ),
    )
    .min(1, '예약 가능한 시간대를 최소 1개 이상 추가해주세요.'),

  bannerImages: z
    .custom<FileList>()
    .refine(
      (files) => files?.length >= 1,
      '배너 이미지를 1개 이상 등록해주세요.',
    )
    .refine(
      (files) => files && files[0].size <= MAX_FILE_SIZE,
      `이미지 크기는 5MB를 초과할 수 없습니다.`,
    )
    .refine(
      (files) => files && ACCEPTED_IMAGE_TYPES.includes(files[0].type),
      '.jpg, .jpeg, .png, .webp 형식의 파일만 허용됩니다.',
    ),
  subImages: z
    .custom<FileList>()
    .refine(
      (files) => files?.length >= 1,
      '소개 이미지를 1개 이상 등록해주세요.',
    ),
});

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
