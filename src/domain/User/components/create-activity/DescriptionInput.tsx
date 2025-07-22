'use client';

import Input from '@/shared/components/ui/input';

// 필드 이름을 상수로 관리하면 오타를 방지하고 유지보수에 용이합니다.
const FIELD_NAME = 'description';

export default function DescriptionInput() {
  return (
    // 1. 'name' prop을 추가합니다.
    //    이 이름은 CreateExperienceForm에 정의된 Zod 스키마의 필드명과 일치해야 합니다.
    <Input.Root
      id={FIELD_NAME}
      name={FIELD_NAME}
      type='textarea'
      className='my-10'
    >
      <Input.Label className='font-size-16 font-bold'>설명</Input.Label>
      <Input.Field placeholder='체험에 대한 설명을 입력해 주세요' rows={10} />

      {/* 2. Input.Helper를 추가합니다. */}
      {/* 이 컴포넌트는 Input.Root의 name을 기반으로 RHF의 에러 상태를 자동으로 찾아 표시합니다. */}
      <Input.Helper />
    </Input.Root>
  );
}
