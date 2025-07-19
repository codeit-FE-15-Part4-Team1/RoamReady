'use client';
import Input from '@/shared/components/ui/input';

export default function TitleInput() {
  return (
    <Input.Root id='title' type='text' className='my-10'>
      <Input.Label className='font-size-16 font-bold'>제목</Input.Label>
      <Input.Field placeholder='제목을 입력해 주세요' />
    </Input.Root>
  );
}
