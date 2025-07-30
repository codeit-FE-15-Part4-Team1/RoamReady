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

    // 현재 페이지가 /activities/search인 경우 현재 페이지에서 파라미터만 업데이트
    if (pathname === '/search') {
      router.push(url, { scroll: false });
    } else {
      // 다른 페이지에서는 새 창으로 열기
      window.open(url, '_blank');
    }
  };

  return (
    <FormProvider {...methods}>
      <ActivitySearchBarForm onSubmit={onSubmit} />
    </FormProvider>
  );
}
