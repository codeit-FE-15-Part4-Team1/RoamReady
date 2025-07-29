'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import ActivitySearchBarForm from '@/domain/Activity/components/main/ActivityFilter/ActivitySearchForm';
import {
  ActivitySearchFormValues,
  activitySearchSchema,
} from '@/domain/Activity/schemas/main';

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
    console.log('액티비티 검색 데이터: ', data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <FormProvider {...methods}>
      <ActivitySearchBarForm onSubmit={onSubmit} />
    </FormProvider>
  );
}
