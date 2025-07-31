'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import ActivitySearchBarForm from '@/domain/Activity/components/main/ActivitySearch/ActivitySearchForm';
import {
  ActivitySearchFormValues,
  activitySearchSchema,
} from '@/domain/Activity/schemas/main';
import { formatDateForAPI } from '@/shared/utils/formatDate';

export default function ActivitySearchBar() {
  const router = useRouter();
  const pathname = usePathname();

  const methods = useForm<ActivitySearchFormValues>({
    resolver: zodResolver(activitySearchSchema),
    defaultValues: {
      keyword: '',
      date: undefined,
      location: '',
    },
  });

  const onSubmit = (data: ActivitySearchFormValues) => {
    const params = new URLSearchParams();
    if (data.keyword) {
      params.append('keyword', data.keyword);
    }
    if (data.date) {
      params.append('date', formatDateForAPI(data.date));
    }
    if (data.location) {
      params.append('location', data.location);
    }
    const queryString = params.toString();
    const url = `/search?${queryString}`;

    // 검색 페이지로 이동
    router.push(url);
  };

  return (
    <FormProvider {...methods}>
      <ActivitySearchBarForm onSubmit={onSubmit} />
    </FormProvider>
  );
}
