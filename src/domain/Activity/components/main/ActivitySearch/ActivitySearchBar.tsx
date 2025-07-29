'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import ActivitySearchBarForm from '@/domain/Activity/components/main/ActivitySearch/ActivitySearchForm';
import {
  ActivitySearchFormValues,
  activitySearchSchema,
} from '@/domain/Activity/schemas/main';
import { formatDate } from '@/shared/utils/formatDate';

export default function ActivitySearchBar() {
  const methods = useForm({
    resolver: zodResolver(activitySearchSchema),
    defaultValues: {
      title: '',
      date: undefined,
      location: '',
    },
  });

  const onSubmit = (data: ActivitySearchFormValues) => {
    // 1. URLSearchParams 객체 생성
    const params = new URLSearchParams();

    // 2. 값이 있는 필드만 파라미터에 추가
    if (data.title) {
      params.append('title', data.title);
    }
    if (data.date) {
      // Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환
      params.append('date', formatDate(data.date));
    }
    if (data.location) {
      params.append('location', data.location);
    }

    // 3. 쿼리 스트링 생성
    const queryString = params.toString();
    const url = `/activities/search?${queryString}`;

    // 4. 새 탭에서 URL 열기
    window.open(url, '_blank');
  };

  return (
    <FormProvider {...methods}>
      <ActivitySearchBarForm onSubmit={onSubmit} />
    </FormProvider>
  );
}
