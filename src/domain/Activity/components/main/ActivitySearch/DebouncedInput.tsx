'use client';

import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface DebouncedInputProps {
  name: 'keyword' | 'location';
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

  // 3. 값 확정 및 검증 로직 분리
  const handleConfirm = async () => {
    setValue(name, inputValue, { shouldValidate: true });
    const isValid = await trigger(name);
    if (isValid) {
      onConfirm(); // 부모 컴포넌트의 goToNextField 실행
    }
  };

  // 4. 'Enter' 키를 누르면 값 확정 후 부모의 onConfirm 콜백 실행
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await handleConfirm();
    }
  };

  // 5. 포커스를 잃으면(blur) 값만 조용히 확정
  const handleBlur = () => {
    setValue(name, inputValue, { shouldValidate: true });
  };

  return (
    <div className='relative w-full'>
      <input
        {...field} // name, ref 등을 자동으로 연결
        type='text'
        placeholder={placeholder}
        className='font-size-14 w-full rounded-full border border-neutral-300 p-12 pr-48 text-base'
        autoFocus
        value={inputValue} // 화면에 보여주는 값은 로컬 상태
        onChange={(e) => setInputValue(e.target.value)} // 입력 시 로컬 상태만 변경
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      <button
        type='button'
        onClick={handleConfirm}
        className='bg-brand-2 hover:bg-brand-2/80 absolute top-1/2 right-10 flex -translate-y-1/2 items-center justify-center rounded-full p-8 text-white'
      >
        <Search className='size-14' />
      </button>
    </div>
  );
}
