'use client';
import Select from '@/shared/components/ui/select';

export default function CategoryInput() {
  return (
    <>
      <h3 className='font-size-16 font-bold'>카테고리</h3>
      <Select.Root className='font-size-14'>
        <Select.Trigger className='font-size-14 px-20 py-17.5'>
          <Select.Value placeholder='카테고리를 선택해 주세요.' />
        </Select.Trigger>
        <Select.Content className='font-size-14'>
          <Select.Item value='1' className='px-20 py-17.5'>
            카테고리 1
          </Select.Item>
          <Select.Item value='2' className='px-20 py-17.5'>
            카테고리 2
          </Select.Item>
          <Select.Item value='3' className='px-20 py-17.5'>
            카테고리 3
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </>
  );
}
