'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { formSchema, FormValues } from '@/domain/User/schemas/createActivity';
import {
  ActivityResponse,
  createActivity,
  getActivity,
  updateActivity,
  uploadActivityImages,
} from '@/domain/User/services/create-activity';
import { ROUTES } from '@/shared/constants/routes';

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

// 파일 업로드 시 초기 값
const initialFormValues: FormValues = {
  category: '',
  title: '',
  description: '',
  price: 0,
  address: '',
  schedules: [{ date: '', startTime: '', endTime: '' }],
  bannerImages: null,
  subImages: [],
};

export const useActivityForm = () => {
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
  // 삭제할 이미지 ID들을 추적하는 상태 추가
  const [removedSubImageIds, setRemovedSubImageIds] = useState<number[]>([]);
  // 기존 이미지 URL과 ID의 매핑을 저장
  const [subImageUrlToIdMap, setSubImageUrlToIdMap] = useState<
    Record<string, number>
  >({});
  // 스케줄 관련 추적 상태 추가
  const [originalSchedules, setOriginalSchedules] = useState<Schedule[]>([]);

  const router = useRouter();

  // 폼 상태 관리
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: initialFormValues,
  });

  useEffect(() => {
    if (isEdit) {
      const fetchActivity = async () => {
        setIsLoading(true);
        try {
          const data: ActivityResponse = await getActivity(id);
          const subImages = (data.subImages || []).map(
            (imageObj: SubImage) => imageObj.imageUrl,
          );

          // URL과 ID 매핑 저장
          const urlToIdMap: Record<string, number> = {};
          (data.subImages || []).forEach((imageObj: SubImage) => {
            urlToIdMap[imageObj.imageUrl] = imageObj.id;
          });
          setSubImageUrlToIdMap(urlToIdMap);

          // 원본 스케줄 데이터 저장 (ID 포함)
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

  // 수정된 이미지 삭제 핸들러 - ID 추적 추가
  const handleRemoveSubImage = (urlToRemove: string) => {
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

      // ✅ 변경: 등록 모드에서도 배너 이미지 필수 체크
      if (!bannerImageUrl) {
        throw new Error('배너 이미지를 등록해주세요.');
      }

      // ✅ 변경: 수정/등록 모드 완전 분리
      if (isEdit) {
        // 수정 모드: 기존 이미지 + 새 이미지 추가 처리
        let subImageUrlsToAdd: string[] = [];

        if (data.subImages instanceof FileList && data.subImages.length > 0) {
          console.log(
            '🔍 [수정모드] 새 파일 업로드 중:',
            data.subImages.length,
            '개',
          );

          const uploadPromises = Array.from(data.subImages).map((file) =>
            uploadActivityImages(file),
          );
          const responses = await Promise.all(uploadPromises);
          subImageUrlsToAdd = responses.map((res) => res.activityImageUrl);

          console.log('✅ [수정모드] 업로드된 이미지 URLs:', subImageUrlsToAdd);
        }

        // 수정 모드 API 호출
        const finalFormData = {
          title: data.title,
          category: data.category,
          description: data.description,
          price: data.price,
          address: data.address,
          bannerImageUrl,
          subImageIdsToRemove: removedSubImageIds,
          subImageUrlsToAdd,
          scheduleIdsToRemove: getScheduleIdsToRemove(data.schedules),
          schedulesToAdd: getSchedulesToAdd(data.schedules),
        };

        console.log('📤 [수정모드] 전송 데이터:', finalFormData);
        await updateActivity(id, finalFormData);
      } else {
        // 등록 모드: 새 이미지만 처리
        let finalSubImageUrls: string[] = [];

        if (data.subImages instanceof FileList && data.subImages.length > 0) {
          console.log(
            '🔍 [등록모드] 새 파일 업로드 중:',
            data.subImages.length,
            '개',
          );

          const uploadPromises = Array.from(data.subImages).map((file) =>
            uploadActivityImages(file),
          );
          const responses = await Promise.all(uploadPromises);
          finalSubImageUrls = responses.map((res) => res.activityImageUrl);

          console.log('✅ [등록모드] 업로드된 이미지 URLs:', finalSubImageUrls);
        }

        // 등록 모드 API 호출
        const finalFormData = {
          title: data.title,
          category: data.category,
          description: data.description,
          price: data.price,
          address: data.address,
          schedules: data.schedules,
          bannerImageUrl,
          subImageUrls: finalSubImageUrls, // ✅ URL 배열로 전송
        };

        console.log('📤 [등록모드] 전송 데이터:', finalFormData);
        console.log('🔍 subImageUrls 개수:', finalSubImageUrls.length);

        await createActivity(finalFormData);
      }

      router.push(ROUTES.ACTIVITIES.ROOT);
    } catch (error) {
      console.error('❌ 폼 제출 에러:', error);
      const errorMessage =
        error instanceof Error ? error.message : '서버 오류가 발생했습니다.';
      setSubmittingError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 헬퍼 함수들 (기존 로직을 분리)
  const getScheduleIdsToRemove = (currentSchedules: Schedule[]) => {
    const existingScheduleIds = originalSchedules
      .map((s: Schedule) => s.id)
      .filter((id): id is number => id !== undefined);
    const currentScheduleIds = currentSchedules
      .filter((s: Schedule) => s.id)
      .map((s: Schedule) => s.id)
      .filter((id): id is number => id !== undefined);

    return existingScheduleIds.filter(
      (id: number) => !currentScheduleIds.includes(id),
    );
  };

  const getSchedulesToAdd = (currentSchedules: Schedule[]) => {
    return currentSchedules.filter((schedule: Schedule) => !schedule.id);
  };

  return {
    methods,
    isEdit,
    isLoading,
    isSubmitting,
    submittingError,
    existingImageUrls,
    handleRemoveSubImage,
    onSubmit,
    handleRemoveBannerImage,
  };
};
