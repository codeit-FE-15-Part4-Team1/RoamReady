'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import type { FormValues } from '../../schemas/createActivity';
import { formSchema } from '../../schemas/createActivity';

// ✨ 타입 정의 추가
interface SubImage {
  id: number;
  imageUrl: string;
}

interface Schedule {
  id?: number; // 기존 스케줄은 id가 있고, 새 스케줄은 없음
  date: string;
  startTime: string;
  endTime: string;
}

interface ExistingImageUrls {
  bannerImageUrl: string;
  subImageUrls: string[];
}
import {
  ActivityPayload,
  createActivity,
  getActivity,
  updateActivity,
  uploadActivityImages,
} from '../../services/create-activity';
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
  const params = useParams();
  const id = Number(params.id);
  const isEdit = !!id;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEdit);
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const [existingImageUrls, setExistingImageUrls] = useState<ExistingImageUrls>(
    {
      bannerImageUrl: '',
      subImageUrls: [],
    },
  );

  // ✨ 삭제할 이미지 ID들을 추적하는 상태 추가
  const [removedSubImageIds, setRemovedSubImageIds] = useState<number[]>([]);

  // ✨ 기존 이미지 URL과 ID의 매핑을 저장
  const [subImageUrlToIdMap, setSubImageUrlToIdMap] = useState<
    Record<string, number>
  >({});

  // ✨ 스케줄 관련 추적 상태 추가

  const [originalSchedules, setOriginalSchedules] = useState<Schedule[]>([]);

  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: initialFormValues,
  });

  const bannerImagesValue = methods.watch('bannerImages');
  console.log('현재 배너 이미지 파일 개수:', bannerImagesValue?.length);

  useEffect(() => {
    if (isEdit) {
      const fetchActivity = async () => {
        setIsLoading(true);
        try {
          const data: ActivityPayload = await getActivity(id);
          console.log('🔥 서버에서 받아온 전체 데이터:', data);
          console.log('🔥 data.subImages:', data.subImages);
          console.log('🔥 data.subImages 타입:', typeof data.subImages);
          console.log('🔥 data.subImages 길이:', data.subImages?.length);

          const subImages = (data.subImages || []).map(
            (imageObj: SubImage) => imageObj.imageUrl,
          );
          console.log('🔥 파싱된 subImages:', subImages);

          // ✨ URL과 ID 매핑 저장
          const urlToIdMap: Record<string, number> = {};
          (data.subImages || []).forEach((imageObj: SubImage) => {
            urlToIdMap[imageObj.imageUrl] = imageObj.id;
          });
          setSubImageUrlToIdMap(urlToIdMap);

          // ✨ 원본 스케줄 데이터 저장 (ID 포함)
          setOriginalSchedules(data.schedules || []);

          methods.reset({
            title: data.title,
            category: data.category,
            description: data.description,
            price: data.price,
            address: data.address,
            schedules: data.schedules,
            bannerImages: data.bannerImageUrl,
            subImages: subImages.length > 0 ? subImages : null,
          });

          setExistingImageUrls({
            bannerImageUrl: data.bannerImageUrl,
            subImageUrls: subImages,
          });

          console.log('2️⃣ RHF에 설정할 값:', {
            bannerImages: data.bannerImageUrl,
            subImages: subImages,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '서버 오류가 발생했습니다.';
          setSubmittingError(errorMessage);
        } finally {
          setIsLoading(false);
        }
      };
      fetchActivity();
    }
  }, [isEdit, id, methods]);

  const handleRemoveBannerImage = () => {
    setExistingImageUrls((prev) => ({
      ...prev,
      bannerImageUrl: '',
    }));
    methods.setValue('bannerImages', null);
  };

  // ✨ 수정된 이미지 삭제 핸들러 - ID 추적 추가
  const handleRemoveSubImage = (urlToRemove: string) => {
    console.log('🔥 기존 이미지 삭제:', urlToRemove);

    // 삭제할 이미지의 ID를 찾아서 추가
    const imageId = subImageUrlToIdMap[urlToRemove];
    if (imageId && !removedSubImageIds.includes(imageId)) {
      setRemovedSubImageIds((prev) => [...prev, imageId]);
    }

    const updatedUrls = existingImageUrls.subImageUrls.filter(
      (url) => url !== urlToRemove,
    );

    setExistingImageUrls((prev) => ({
      ...prev,
      subImageUrls: updatedUrls,
    }));

    const currentValue = methods.getValues('subImages');
    if (!(currentValue instanceof FileList)) {
      methods.setValue(
        'subImages',
        updatedUrls.length > 0 ? updatedUrls : null,
      );
    }
  };

  const onSubmit = async (data: FormValues) => {
    console.log('3️⃣ 폼 제출 최종 데이터:', data);
    setIsSubmitting(true);
    setSubmittingError(null);

    try {
      let bannerImageUrl = existingImageUrls.bannerImageUrl;

      // 배너 이미지 처리
      if (
        data.bannerImages instanceof FileList &&
        data.bannerImages.length > 0
      ) {
        const response = await uploadActivityImages(data.bannerImages[0]);
        bannerImageUrl = response.activityImageUrl;
      } else if (typeof data.bannerImages === 'string') {
        bannerImageUrl = data.bannerImages;
      }

      if (isEdit && !bannerImageUrl) {
        throw new Error('배너 이미지를 등록해주세요.');
      }

      // 소개 이미지 처리
      let subImageUrls = [...existingImageUrls.subImageUrls];
      let subImageUrlsToAdd: string[] = [];

      if (data.subImages instanceof FileList && data.subImages.length > 0) {
        console.log(
          '🔥 새 소개 이미지 업로드 중:',
          data.subImages.length,
          '개',
        );
        const uploadPromises = Array.from(data.subImages).map((file) =>
          uploadActivityImages(file),
        );
        const responses = await Promise.all(uploadPromises);
        const newSubImageUrls = responses.map((res) => res.activityImageUrl);

        if (isEdit) {
          subImageUrlsToAdd = newSubImageUrls;
        } else {
          subImageUrls = [...subImageUrls, ...newSubImageUrls];
        }
      }

      console.log('🔥 최종 소개 이미지 URLs:', subImageUrls);
      console.log('🔥 삭제할 이미지 IDs:', removedSubImageIds);
      console.log('🔥 추가할 이미지 URLs:', subImageUrlsToAdd);

      if (isEdit) {
        // ✨ 수정 모드: 스케줄 변경사항 분석
        const currentSchedules = data.schedules as Schedule[];
        const schedulesToAdd = currentSchedules.filter(
          (schedule: Schedule) => !schedule.id,
        );
        const existingScheduleIds = originalSchedules
          .map((s: Schedule) => s.id)
          .filter((id): id is number => id !== undefined);
        const currentScheduleIds = currentSchedules
          .filter((s: Schedule) => s.id)
          .map((s: Schedule) => s.id)
          .filter((id): id is number => id !== undefined);
        const scheduleIdsToRemove = existingScheduleIds.filter(
          (id: number) => !currentScheduleIds.includes(id),
        );

        // ✨ 수정 모드: PATCH 요청에 맞는 데이터 구조
        const finalFormData = {
          title: data.title,
          category: data.category,
          description: data.description,
          price: data.price,
          address: data.address,
          bannerImageUrl,
          subImageIdsToRemove: removedSubImageIds,
          subImageUrlsToAdd,
          scheduleIdsToRemove,
          schedulesToAdd,
        };

        console.log('🔥 최종 제출 데이터 (수정):', finalFormData);
        console.log('🔥 삭제할 스케줄 IDs:', scheduleIdsToRemove);
        console.log('🔥 추가할 스케줄들:', schedulesToAdd);
        const result = await updateActivity(id, finalFormData);
        console.log('🔥 updateActivity 결과:', result);
      } else {
        // 등록 모드: POST 요청에 맞는 데이터 구조
        const finalFormData = {
          title: data.title,
          category: data.category,
          description: data.description,
          price: data.price,
          address: data.address,
          schedules: data.schedules,
          bannerImageUrl,
          subImages: subImageUrls.map((url, index) => ({
            id: index + 1, // 임시 ID 생성
            imageUrl: url,
          })),
        };

        console.log('🔥 최종 제출 데이터 (등록):', finalFormData);
        await createActivity(finalFormData);
      }

      methods.reset();
      router.push('/');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '서버 오류가 발생했습니다.';
      setSubmittingError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

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
