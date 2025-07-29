'use client';

import Input from '@/shared/components/ui/input';

// Zod 스키마에 정의된 필드 이름과 일치시킵니다.
const FIELD_NAME = 'title';

export default function TitleInput() {
  return (
    // 1. 'name' prop을 추가하여 RHF의 'title' 필드와 연결합니다.
    <Input.Root id={FIELD_NAME} name={FIELD_NAME} type='text' className='my-10'>
      <Input.Label className='font-size-16 font-bold'>제목</Input.Label>
      <Input.Field placeholder='제목을 입력해 주세요' />

      {/* 2. 에러 메시지를 자동으로 표시하기 위해 Input.Helper를 추가합니다. */}
      <Input.Helper />
    </Input.Root>
  );
}
