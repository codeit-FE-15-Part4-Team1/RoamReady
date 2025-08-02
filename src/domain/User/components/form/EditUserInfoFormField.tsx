'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Input from '@/shared/components/ui/input';
import { cn } from '@/shared/libs/cn';

interface EditUserInfoFormFieldProps {
  /** 폼 필드의 name 속성 */
  name: string;
  /** 필드에 표시될 라벨 텍스트 */
  label: string;
  /** 입력 필드의 타입 */
  type: 'text' | 'email' | 'password';
  /** 필드 비활성화 여부 */
  disabled?: boolean;
}

/**
 * 사용자 정보 수정 폼에서 사용되는 개별 입력 필드 컴포넌트
 *
 * react-hook-form과 통합되어 있으며, 공통 Input 컴포넌트를 래핑하여
 * 일관된 스타일과 유효성 검사 기능을 제공합니다.
 * 비밀번호 필드의 경우 show/hide 토글 기능을 제공합니다.
 */
export default function EditUserInfoFormField({
  name,
  label,
  type,
  disabled,
}: EditUserInfoFormFieldProps) {
  const { register } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === 'password';
  const actualType = isPasswordField && showPassword ? 'text' : type;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Input.Root name={name} type={actualType} disabled={disabled}>
      <div className='mt-12 flex items-center justify-between'>
        <Input.Label className='ml-4 font-semibold text-neutral-900'>
          {label}
        </Input.Label>
        <Input.Helper />
      </div>
      <div className='relative'>
        <Input.Field
          {...register(name)}
          className={cn(
            'rounded-3xl border-neutral-200 p-14 py-12 text-neutral-900 placeholder:text-neutral-400',
            disabled && 'cursor-not-allowed bg-neutral-100 text-neutral-400',
            isPasswordField && 'pr-50',
          )}
          placeholder={`${label}을 입력해주세요.`}
        />
        {isPasswordField && (
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute top-1/2 right-14 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 focus:outline-none'
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className='size-20 cursor-pointer' />
            ) : (
              <Eye className='size-20 cursor-pointer' />
            )}
          </button>
        )}
      </div>

      <Input.Trigger />
    </Input.Root>
  );
}
