'use client';

import Input from '@/shared/components/ui/input';

export default function CreateExperiencePage() {
  return (
    <div>
      <h1 className='font-size-18 py-20 font-bold'>내 체험 등록</h1>

      <form>
        <Input.Root id='title' type='text' className='my-10'>
          <Input.Label className='font-size-16 font-bold'>제목</Input.Label>
          <Input.Field placeholder='제목을 입력해 주세요' />
        </Input.Root>

        {/*카테고리 선택 - select*/}

        <Input.Root id='description' type='textarea' className='my-10'>
          <Input.Label className='font-size-16 font-bold'>설명</Input.Label>
          <Input.Field
            placeholder='체험에 대한 설명을 입력해 주세요'
            rows={10}
          />
        </Input.Root>

        <Input.Root id='price' type='number' className='my-10'>
          <Input.Label className='font-size-16 font-bold'>가격</Input.Label>
          <Input.Field placeholder='체험 금액을 입력해 주세요' />
        </Input.Root>

        <Input.Root id='location' type='text' className='my-10'>
          <Input.Label className='font-size-16 font-bold'>주소</Input.Label>
          <Input.Field placeholder='주소를 입력해 주세요' />
        </Input.Root>
      </form>
    </div>
  );
}
