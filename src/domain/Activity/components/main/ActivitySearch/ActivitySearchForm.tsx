'use client';

import { Controller, useFormContext } from 'react-hook-form';

import ActivitySearchButton from '@/domain/Activity/components/main/ActivitySearch/ActivitySearchButton';
import ActivitySearchField from '@/domain/Activity/components/main/ActivitySearch/ActivitySearchField';
import { ActivitySearchFormValues } from '@/domain/Activity/schemas/main';
import { DatePicker } from '@/shared/components/ui/date-picker';
import { formatDate } from '@/shared/utils/formatDate';

interface ActivitySearchFormProps {
  onSubmit: (data: ActivitySearchFormValues) => void;
}

export default function ActivitySearchForm({
  onSubmit,
}: ActivitySearchFormProps) {
  const { control, watch, setValue, handleSubmit } = useFormContext();

  const title = watch('title');
  const date = watch('date');
  const location = watch('location');
  const displayDateValue = date ? formatDate(date) : undefined;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='relative flex h-auto w-full max-w-800 items-center rounded-full bg-white shadow-lg ring-1 ring-neutral-200'
    >
      {/* Title 필드 */}
      <ActivitySearchField
        label='액티비티'
        displayValue={title}
        placeholder='액티비티 검색'
        popoverPosition='bottom-start'
      >
        <Controller
          name='title'
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type='text'
              placeholder='액티비티 제목 검색'
              className='w-full rounded-lg border border-neutral-300 p-3 text-base'
            />
          )}
        />
      </ActivitySearchField>

      {/* Date 필드 */}
      <ActivitySearchField
        label='날짜'
        displayValue={displayDateValue}
        placeholder='날짜 선택'
        popoverPosition='bottom-center'
      >
        <DatePicker.Root
          selectedDate={date}
          onDateClick={(selectedDate) =>
            setValue('date', selectedDate, { shouldValidate: true })
          }
        >
          <DatePicker.Month />
          <DatePicker.Week />
          <DatePicker.Date />
        </DatePicker.Root>
      </ActivitySearchField>

      {/* Location 필드 */}
      <ActivitySearchField
        label='위치'
        displayValue={location}
        placeholder='지역 검색'
        popoverPosition='bottom-end'
      >
        <Controller
          name='location'
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type='text'
              placeholder='지역, 주소 검색'
              className='w-full rounded-lg border border-neutral-300 p-3 text-base'
            />
          )}
        />
      </ActivitySearchField>

      <ActivitySearchButton />
    </form>
  );
}
