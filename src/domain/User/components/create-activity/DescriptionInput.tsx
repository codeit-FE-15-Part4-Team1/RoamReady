'use client';
import Input from '@/shared/components/ui/input';

export default function DescriptionInput() {
  return (
    <Input.Root
      id='description'
      name='description'
      type='textarea'
      className='my-10'
    >
      <Input.Label className='font-size-16 font-bold'>설명</Input.Label>
      <Input.Field placeholder='체험에 대한 설명을 입력해 주세요' rows={10} />
    </Input.Root>
  );
}
