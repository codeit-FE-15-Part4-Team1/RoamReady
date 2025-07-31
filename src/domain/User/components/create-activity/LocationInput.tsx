'use client';

import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useFormContext } from 'react-hook-form';

import Input from '@/shared/components/ui/input';

// Zod 스키마에 정의된 필드 이름과 일치시킵니다.
const FIELD_NAME = 'address';

export default function LocationInput() {
  const { setValue } = useFormContext();
  const openPostcodePopup = useDaumPostcodePopup();

  const handleOpenPostcode = () => {
    openPostcodePopup({
      onComplete: (data) => {
        setValue(FIELD_NAME, data.address, {
          shouldValidate: true,
          shouldDirty: true,
        });
      },
    });
  };

  return (
    <div>
      <Input.Root
        id={FIELD_NAME}
        name={FIELD_NAME}
        type='text'
        className='my-10'
      >
        <Input.Label className='font-size-16 font-bold'>주소</Input.Label>
        <Input.Trigger triggerType='base' onClick={handleOpenPostcode}>
          <Input.Field placeholder='주소 검색 버튼을 눌러주세요.' readOnly />
        </Input.Trigger>

        {/* 2. 에러 메시지를 자동으로 표시하기 위해 Input.Helper를 추가합니다. */}
        <Input.Helper />
      </Input.Root>
    </div>
  );
}
