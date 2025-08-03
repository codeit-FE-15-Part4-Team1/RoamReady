'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import ActivitySearchBarForm from '@/domain/Activity/components/main/ActivitySearch/ActivitySearchForm';
import {
  ActivitySearchFormValues,
  activitySearchSchema,
} from '@/domain/Activity/schemas/main';

export default function ActivitySearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const methods = useForm<ActivitySearchFormValues>({
    resolver: zodResolver(activitySearchSchema),
    defaultValues: {
      keyword: searchParams.get('keyword') || '',
      date: searchParams.get('date')
        ? new Date(searchParams.get('date')!)
        : undefined,
      address: searchParams.get('address') || '',
    },
  });

  const onSubmit = async (data: ActivitySearchFormValues) => {
    try {
      // URL 파라미터 업데이트
      const params = new URLSearchParams(searchParams.toString());

      if (data.keyword) {
        params.set('keyword', data.keyword);
      } else {
        params.delete('keyword');
      }

      if (data.date) {
        params.set('date', data.date.toISOString().split('T')[0]);
      } else {
        params.delete('date');
      }

      if (data.address) {
        params.set('address', data.address);
      } else {
        params.delete('address');
      }

      // 페이지 초기화
      params.delete('page');

      const queryString = params.toString();
      const url = `/activities?${queryString}`;

      router.push(url, { scroll: false });
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <ActivitySearchBarForm onSubmit={onSubmit} />
    </FormProvider>
  );
}
