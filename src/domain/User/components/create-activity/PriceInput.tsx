'use client';

import { useFormContext } from 'react-hook-form';

import Input from '@/shared/components/ui/input';

const FIELD_NAME = 'price';

export default function PriceInput() {
  // 1. useState를 제거하고, useFormContext에서 watch 함수를 가져옵니다.
  const { watch } = useFormContext();

  // 2. watch 함수로 RHF의 'price' 필드 값을 실시간으로 감시합니다.
  //    RHF에서 숫자 입력값은 문자열로 관리될 수 있으므로, 숫자 타입으로 변환해 줍니다.
  const priceValue = watch(FIELD_NAME);
  const priceAsNumber =
    typeof priceValue === 'string' && priceValue !== ''
      ? Number(priceValue)
      : priceValue;

  return (
    <>
      {/* 3. Input.Root에 name을 지정하여 RHF와 연결합니다. */}
      <Input.Root
        id={FIELD_NAME}
        name={FIELD_NAME}
        type='number'
        className='my-10'
      >
        <Input.Label className='font-size-16 font-bold'>가격</Input.Label>
        {/* 4. 자체 onChange 핸들러를 제거합니다. Input.Field가 자동으로 RHF와 연결됩니다. */}
        <Input.Field
          placeholder='체험 금액을 입력해 주세요'
          step='1000'
          min='0'
        />
        <Input.Helper />
      </Input.Root>

      {/* 5. 서식이 적용된 금액 표시에 RHF로부터 받아온 값을 사용합니다. */}
      {typeof priceAsNumber === 'number' && priceAsNumber > 0 && (
        <p className='mt-4 text-gray-600'>
          입력된 금액: {priceAsNumber.toLocaleString('ko-KR')}원
        </p>
      )}
    </>
  );
}
