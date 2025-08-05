'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';

const mobileSearchSchema = z.object({
  keyword: z.string().optional(),
});

type MobileSearchFormValues = z.infer<typeof mobileSearchSchema>;

export default function MobileActivitySearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const methods = useForm<MobileSearchFormValues>({
    resolver: zodResolver(mobileSearchSchema),
    defaultValues: {
      keyword: searchParams.get('keyword') || '',
    },
  });

  const onSubmit = async (data: MobileSearchFormValues) => {
    try {
      const params = new URLSearchParams(searchParams.toString());

      if (data.keyword) {
        params.set('keyword', data.keyword);
      } else {
        params.delete('keyword');
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
      <MobileActivitySearchForm onSubmit={onSubmit} />
    </FormProvider>
  );
}

interface MobileActivitySearchFormProps {
  onSubmit: (data: MobileSearchFormValues) => void;
}

function MobileActivitySearchForm({ onSubmit }: MobileActivitySearchFormProps) {
  const { register, handleSubmit } = useFormContext<MobileSearchFormValues>();

  const handleFormSubmit = (data: MobileSearchFormValues) => {
    const searchData = {
      keyword: data.keyword || undefined,
    };

    onSubmit(searchData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='relative flex h-auto w-full max-w-800 items-center overflow-hidden rounded-full bg-white shadow-lg ring-1 ring-neutral-200'
    >
      <div className='flex flex-1 items-center px-20 py-16'>
        <Search className='mr-12 h-20 w-20 text-neutral-400' />
        <input
          {...register('keyword')}
          type='text'
          placeholder='액티비티 검색'
          className='font-size-14 flex-1 bg-transparent text-neutral-800 placeholder:text-neutral-400 focus:outline-none'
        />
      </div>

      <div className='absolute top-0 right-0 h-full p-8'>
        <button
          type='submit'
          className='font-size-14 bg-brand-2 flex h-full cursor-pointer items-center justify-center rounded-full p-12 font-medium text-white'
        >
          검색
        </button>
      </div>
    </form>
  );
}
