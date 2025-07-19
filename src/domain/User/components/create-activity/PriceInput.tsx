'use client';
import { useState } from 'react';

import Input from '@/shared/components/ui/input';

export default function PriceInput() {
  const [price, setPrice] = useState<number | null>(null);

  return (
    <>
      <Input.Root id='price' type='number' className='my-10'>
        <Input.Label className='font-size-16 font-bold'>가격</Input.Label>
        <Input.Field
          placeholder='체험 금액을 입력해 주세요'
          step='1000'
          min='0'
          onChange={(e) => {
            const value = e.target.value === '' ? null : Number(e.target.value);
            setPrice(value);
          }}
        />
      </Input.Root>
      {/* --- 서식이 적용된 금액 표시 --- */}
      {typeof price === 'number' && price > 0 && (
        <p className='mt-4 text-gray-600'>
          입력된 금액: {price.toLocaleString('ko-KR')}원
        </p>
      )}
    </>
  );
}
