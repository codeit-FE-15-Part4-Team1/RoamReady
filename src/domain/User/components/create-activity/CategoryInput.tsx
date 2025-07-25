'use client';
import { Controller, useFormContext } from 'react-hook-form';

import Select from '@/shared/components/ui/select';

const FIELD_NAME = 'category';

export default function CategoryInput() {
  const { control } = useFormContext();
  return (
    <div>
      <h3 className='font-size-16 font-bold'>카테고리</h3>
      <Controller
        control={control}
        name={FIELD_NAME}
        render={({ field }) => (
          <>
            <Select.Root
              value={field.value}
              onValueChange={field.onChange}
              className='font-size-14'
              name={field.name}
            >
              <Select.Trigger className='font-size-14 px-20 py-17.5'>
                <Select.Value placeholder='카테고리를 선택해 주세요.' />
              </Select.Trigger>
              <Select.Content className='font-size-14'>
                <Select.Item value='투어' className='px-20 py-17.5'>
                  카테고리 1
                </Select.Item>
                <Select.Item value='하세요' className='px-20 py-17.5'>
                  카테고리 2
                </Select.Item>
                <Select.Item value='제발발' className='px-20 py-17.5'>
                  카테고리 3
                </Select.Item>
              </Select.Content>
              {/* FormData가 값을 가져갈 수 있도록 숨겨진 input에 이름표(name)와 값(value)을 붙여줍니다. */}
              <input
                type='hidden'
                name={field.name}
                value={field.value || ''}
              />

              <Select.Helper name={field.name} />
            </Select.Root>
          </>
        )}
      />
    </div>
  );
}
