'use client';

import { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface DebouncedInputProps {
  name: 'title' | 'location';
  placeholder: string;
  onConfirm: () => void; // 값 확정 후 부모에게 알릴 콜백
}

export default function DebouncedInput({
  name,
  placeholder,
  onConfirm,
}: DebouncedInputProps) {
  const { setValue, trigger } = useFormContext();
  const { field } = useController({ name });

  // 1. 입력값 관리를 위한 로컬 상태
  const [inputValue, setInputValue] = useState(field.value || '');

  // 2. 외부(react-hook-form)의 값이 변경되면 내부 상태에 반영
  useEffect(() => {
    if (field.value !== inputValue) {
      setInputValue(field.value || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);

  // 3. 'Enter' 키를 누르면 값 확정 후 부모의 onConfirm 콜백 실행
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setValue(name, inputValue, { shouldValidate: true });
      const isValid = await trigger(name);
      if (isValid) {
        onConfirm(); // 부모 컴포넌트의 goToNextField 실행
      }
    }
  };

  // 4. 포커스를 잃으면(blur) 값만 조용히 확정
  const handleBlur = () => {
    setValue(name, inputValue, { shouldValidate: true });
  };

  return (
    <input
      {...field} // name, ref 등을 자동으로 연결
      type='text'
      placeholder={placeholder}
      className='w-full rounded-lg border border-neutral-300 p-3 text-base'
      autoFocus
      value={inputValue} // 화면에 보여주는 값은 로컬 상태
      onChange={(e) => setInputValue(e.target.value)} // 입력 시 로컬 상태만 변경
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  );
}
