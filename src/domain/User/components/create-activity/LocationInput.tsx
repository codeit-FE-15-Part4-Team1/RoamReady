'use client';
import Input from '@/shared/components/ui/input';

export default function LocationInput() {
  return (
    <Input.Root id='location' name='location' type='text' className='my-10'>
      <Input.Label className='font-size-16 font-bold'>주소</Input.Label>
      <Input.Field placeholder='주소를 입력해 주세요' />
    </Input.Root>
  );
}
