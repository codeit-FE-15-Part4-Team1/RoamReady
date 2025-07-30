'use client';

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
 */
export default function EditUserInfoFormField({
  name,
  label,
  type,
  disabled,
}: EditUserInfoFormFieldProps) {
  const { register } = useFormContext();

  return (
    <Input.Root name={name} type={type} disabled={disabled}>
      <div className='mt-12 flex items-center justify-between'>
        <Input.Label className='ml-4 font-semibold text-neutral-900'>
          {label}
        </Input.Label>
        <Input.Helper />
      </div>
      <Input.Field
        {...register(name)}
        className={cn(
          'rounded-3xl border-neutral-200 p-14 py-12 text-neutral-900 placeholder:text-neutral-400',
          disabled && 'cursor-not-allowed bg-neutral-100 text-neutral-400',
        )}
        placeholder={`${label}을 입력해주세요.`}
      />

      <Input.Trigger />
    </Input.Root>
  );
}
