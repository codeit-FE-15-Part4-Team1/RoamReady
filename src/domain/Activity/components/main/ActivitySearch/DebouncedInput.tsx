'use client';

import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface DebouncedInputProps {
  name: 'keyword' | 'address';
  placeholder: string;
  onConfirm: () => void; // 값 확정 후 부모에게 알릴 콜백
  isOpen?: boolean; // popover가 열려있는지 여부
}

export default function DebouncedInput({
  name,
  placeholder,
  onConfirm,
  isOpen,
}: DebouncedInputProps) {
  const { setValue, trigger } = useFormContext();
  const { field } = useController({ name });
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. 입력값 관리를 위한 로컬 상태
  const [inputValue, setInputValue] = useState(field.value || '');

  // 2. 외부(react-hook-form)의 값이 변경되면 내부 상태에 반영
  useEffect(() => {
    if (field.value !== inputValue) {
      setInputValue(field.value || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);

  // 3. popover가 닫힐 때 입력값 확정
  useEffect(() => {
    if (!isOpen && inputValue !== field.value) {
      // popover가 닫힐 때 입력값을 확정
      setValue(name, inputValue, { shouldValidate: true });
      console.log(`${name} 필드 값 확정:`, inputValue);
    }
  }, [isOpen, inputValue, field.value, setValue, name]);

  // 4. 값 확정 및 검증 로직 분리
  const handleConfirm = async () => {
    setValue(name, inputValue, { shouldValidate: true });
    const isValid = await trigger(name);
    if (isValid) {
      onConfirm(); // 부모 컴포넌트의 goToNextField 실행
    }
  };

  // 5. 'Enter' 키를 누르면 값 확정 후 부모의 onConfirm 콜백 실행
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await handleConfirm();
    }
  };

  // 6. 포커스를 잃으면(blur) 값만 조용히 확정
  const handleBlur = () => {
    setValue(name, inputValue, { shouldValidate: true });
  };

  // 7. 값 지우기 - focus 유지하면서 즉시 삭제
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 값 즉시 지우기
    setInputValue('');
    setValue(name, '', { shouldValidate: true });

    // input에 focus 유지
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  // 8. 입력값 변경 시 로컬 상태만 업데이트 (디바운스 제거)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <div className='relative w-full'>
      <input
        {...field} // name, ref 등을 자동으로 연결
        ref={(el) => {
          // react-hook-form의 ref와 직접 ref 모두 설정
          field.ref(el);
          inputRef.current = el;
        }}
        type='text'
        placeholder={placeholder}
        className='font-size-14 w-full rounded-full border border-neutral-300 p-12 pr-48 text-base'
        autoFocus
        value={inputValue} // 화면에 보여주는 값은 로컬 상태
        onChange={handleChange} // 로컬 상태만 업데이트
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      {inputValue && (
        <button
          type='button'
          onMouseDown={handleClear}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleClear(e as unknown as React.MouseEvent);
            }
          }}
          className='absolute top-1/2 right-10 flex -translate-y-1/2 items-center justify-center rounded-full p-8 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600'
        >
          <X className='size-14' />
        </button>
      )}
    </div>
  );
}
