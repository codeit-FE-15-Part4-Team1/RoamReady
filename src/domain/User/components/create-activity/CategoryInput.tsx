'use client';
import { Controller, useFormContext } from 'react-hook-form';

import { CATEGORIES } from '@/domain/User/constants/createActivity';
import Select from '@/shared/components/ui/select';

const FIELD_NAME = 'category';

export default function CategoryInput() {
  const { control } = useFormContext();
  return (
    <div>
      <h3 className='font-size-16 mb-10 font-bold'>카테고리</h3>
      <Controller
        control={control}
        name={FIELD_NAME}
        render={({ field }) => (
          <>
            <Select.Root
              value={field.value}
              onValueChange={field.onChange}
              className='font-size-16'
              name={field.name}
            >
              <Select.Trigger className='font-size-16 px-20 py-17.5'>
                <Select.Value placeholder='카테고리를 선택해 주세요.' />
              </Select.Trigger>
              <Select.Content className='font-size-16 scrollbar-hide'>
                {CATEGORIES.map((category) => (
                  <Select.Item
                    key={category}
                    value={category}
                    className='px-20 py-17.5'
                  >
                    {category}
                  </Select.Item>
                ))}
              </Select.Content>
              {/* FormData가 값을 가져갈 수 있도록 숨겨진 input에 이름표(name)와 값(value)을 붙여줍니다. */}
              <input
                type='hidden'
                name={field.name}
                value={field.value}
                placeholder='카테고리를 선택해 주세요.'
              />

              <Select.Helper name={field.name} />
            </Select.Root>
          </>
        )}
      />
    </div>
  );
}
