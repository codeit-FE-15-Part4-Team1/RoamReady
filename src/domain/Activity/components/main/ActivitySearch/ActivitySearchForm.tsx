'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import ActivitySearchButton from '@/domain/Activity/components/main/ActivitySearch/ActivitySearchButton';
import ActivitySearchField from '@/domain/Activity/components/main/ActivitySearch/ActivitySearchField';
import DebouncedInput from '@/domain/Activity/components/main/ActivitySearch/DebouncedInput';
import { ActivitySearchFormValues } from '@/domain/Activity/schemas/main';
import { DatePicker } from '@/shared/components/ui/date-picker';
import { formatDate } from '@/shared/utils/formatDate';

interface ActivitySearchFormProps {
  onSubmit: (data: ActivitySearchFormValues) => void;
}

type ActiveField = 'keyword' | 'date' | 'address';

export default function ActivitySearchForm({
  onSubmit,
}: ActivitySearchFormProps) {
  const { watch, setValue, handleSubmit } =
    useFormContext<ActivitySearchFormValues>();
  const [activeField, setActiveField] = useState<ActiveField | null>(null);
  const prevIsAllFieldsEmptyRef = useRef(false);

  const date = watch('date');
  const keyword = watch('keyword');
  const address = watch('address');
  const displayDateValue = date ? formatDate(date) : undefined;

  // 모든 필드가 비어있는지 확인
  const isAllFieldsEmpty = !keyword && !date && !address;

  // 모든 필드가 비어있을 때 자동으로 전체 검색 실행 (이전에 비어있지 않았을 때만)
  useEffect(() => {
    const prevIsAllFieldsEmpty = prevIsAllFieldsEmptyRef.current;

    if (isAllFieldsEmpty && !prevIsAllFieldsEmpty) {
      onSubmit({
        keyword: '',
        date: undefined,
        address: '',
      });
    }

    prevIsAllFieldsEmptyRef.current = isAllFieldsEmpty;
  }, [isAllFieldsEmpty, onSubmit]);

  const goToNextField = useCallback((currentField: ActiveField) => {
    if (currentField === 'keyword') setActiveField('date');
    else if (currentField === 'date') setActiveField('address');
    else setActiveField(null);
  }, []);

  const handleFormSubmit = (data: ActivitySearchFormValues) => {
    // 빈 값이 아닌 데이터만 필터링
    const searchData = {
      keyword: data.keyword || undefined,
      date: data.date || undefined,
      address: data.address || undefined,
    };

    onSubmit(searchData);
  };

  const handleClearKeyword = useCallback(() => {
    setValue('keyword', '', { shouldValidate: true });
  }, [setValue]);

  const handleClearDate = useCallback(() => {
    setValue('date', undefined, { shouldValidate: true });
  }, [setValue]);

  const handleClearAddress = useCallback(() => {
    setValue('address', '', { shouldValidate: true });
  }, [setValue]);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='relative flex h-auto w-full max-w-800 items-center overflow-hidden rounded-full bg-white shadow-lg ring-1 ring-neutral-200'
    >
      {/* Keyword 필드 */}
      <ActivitySearchField
        label='액티비티'
        displayValue={keyword}
        placeholder='액티비티 검색'
        popoverPosition='bottom-start'
        isOpen={activeField === 'keyword'}
        isActive={activeField === 'keyword'}
        hasActiveField={activeField !== null}
        onOpenChange={(open) => setActiveField(open ? 'keyword' : null)}
        onClick={() => setActiveField('keyword')}
        onClear={handleClearKeyword}
      >
        <DebouncedInput
          name='keyword'
          placeholder='액티비티 제목, 지역 등 검색'
          onConfirm={() => goToNextField('keyword')}
          isOpen={activeField === 'keyword'}
        />
      </ActivitySearchField>

      {/* 구분선 */}
      <div className='h-32 w-px bg-neutral-200' />

      {/* Date 필드 */}
      <ActivitySearchField
        label='날짜'
        displayValue={displayDateValue}
        placeholder='날짜 선택'
        popoverPosition='bottom-center'
        isOpen={activeField === 'date'}
        isActive={activeField === 'date'}
        hasActiveField={activeField !== null}
        onOpenChange={(open) => setActiveField(open ? 'date' : null)}
        onClick={() => setActiveField('date')}
        onClear={handleClearDate}
      >
        <DatePicker.Root
          selectedDate={date}
          onDateClick={(selectedDate) => {
            setValue('date', selectedDate, { shouldValidate: true });
            goToNextField('date');
          }}
        >
          <DatePicker.Month />
          <DatePicker.Week />
          <DatePicker.Date />
        </DatePicker.Root>
      </ActivitySearchField>

      {/* 구분선 */}
      <div className='h-32 w-px bg-neutral-200' />
      {/* Address 필드 */}
      <ActivitySearchField
        label='위치'
        displayValue={address}
        placeholder='지역 검색'
        popoverPosition='bottom-end'
        isOpen={activeField === 'address'}
        isActive={activeField === 'address'}
        hasActiveField={activeField !== null}
        onOpenChange={(open) => setActiveField(open ? 'address' : null)}
        onClick={() => setActiveField('address')}
        onClear={handleClearAddress}
      >
        <DebouncedInput
          name='address'
          placeholder='지역, 주소 검색'
          onConfirm={() => goToNextField('address')}
          isOpen={activeField === 'address'}
        />
      </ActivitySearchField>

      <ActivitySearchButton />
    </form>
  );
}
