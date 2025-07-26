'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import { Control, FieldError, UseFormRegisterReturn } from 'react-hook-form';

import Button from '@/shared/components/Button';
import { useImagePreview } from '@/shared/hooks/useImagePreview';
import { cn } from '@/shared/libs/cn';

import Input from '.';
import { InputContext } from './InputContext';

interface FormValues {
  textExample: string;
  textExampleHalf: string;
  password: string;
  email: string;
  comment: string;
  profileImage?: FileList;
  disabledExample: string;
  searchExample: string;
  numberExample: number;
}

interface ExampleProps {
  onSubmit?: (e?: React.BaseSyntheticEvent) => void;
  isSubmitting?: boolean;
  control: Control<FormValues>;
}

/**
 * @component Example
 * @description
 * `Input` 컴포넌트의 다양한 사용 예시를 보여주는 데모용 UI입니다.
 * 이 컴포넌트는 **부모 컴포넌트(예: `InputTestPage`)로부터 `react-hook-form`의 폼 컨텍스트를 제공받아 사용**합니다.
 *
 * 폼 관련 로직(`useFormContext`를 통한 상태 접근, `useImagePreview` 훅 사용 등)은 부모가 `FormProvider`를 통해 제공하는
 * 컨텍스트를 기반으로 동작합니다.
 *
 * 텍스트, 비밀번호, 텍스트에리어, 숫자, 파일 업로드, 에러 상태, 검색, 비활성화 등의
 * 다양한 입력 필드를 실제로 어떻게 구성하고 사용하는지를 시각적으로 확인할 수 있습니다.
 *
 * @param {ExampleProps} props - Example 컴포넌트에 전달되는 속성
 * @param {function(React.BaseSyntheticEvent=): void} [props.onSubmit] - 폼 제출 시 호출될 콜백 함수입니다.
 * `react-hook-form`의 `handleSubmit`으로 래핑되어 유효성 검사 후 호출됩니다.
 * @param {boolean} [props.isSubmitting] - 폼 제출 진행 중인지 여부를 나타내는 불리언 값입니다.
 * 제출 버튼의 활성화/비활성화 상태를 제어하는 데 사용됩니다.
 * @param {Control<FormValues>} props.control - `react-hook-form`의 `control` 객체입니다.
 * `useWatch`를 사용하는 `useImagePreview`와 같은 훅에 전달되어 필드 값을 감시합니다.
 *
 * @returns {JSX.Element} Input 컴포넌트들의 다양한 예시를 포함하는 폼 요소.
 *
 * @see {@link RoamReady/src/app/test/input/page.dev.tsx src/app/test/input/page.dev.tsx} - 이 컴포넌트의 사용 예시를 확인할 수 있는 테스트 페이지 경로
 */
export default function InputExample({
  onSubmit,
  isSubmitting,
  control,
}: ExampleProps) {
  const { previewUrl } = useImagePreview('profileImage', control);
  const group = 'rounded-lg border border-gray-300 px-20 py-15';

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-40 p-30'>
      <h1 className='font-size-20 font-bold'>Input Component Examples</h1>

      {/* 텍스트 입력 예시 */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-size-15 font-semibold'>Text Input</h2>
        <Input.Root
          id='text-example'
          name='textExample'
          type='text'
          className={group}
        >
          <Input.Label>이름</Input.Label>
          <Input.Field placeholder='이름을 입력하세요' />
          <Input.Helper>안내 메시지</Input.Helper>
        </Input.Root>
      </div>

      {/* 텍스트 입력 예시(half width) */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-size-15 font-semibold'>Text Input (Half Width)</h2>
        <Input.Root
          id='text-example-half'
          name='textExampleHalf'
          type='text'
          className={cn('w-1/2', group)}
        >
          <Input.Label>이름</Input.Label>
          <Input.Field placeholder='이름을 입력하세요' />
        </Input.Root>
      </div>

      {/* 비밀번호 입력 예시 */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-size-15 font-semibold'>Password Input</h2>
        <Input.Root
          id='password'
          name='password'
          type='password'
          className={group}
        >
          <Input.Label>비밀번호</Input.Label>
          <Input.Field
            placeholder='비밀번호를 입력해주세요'
            rightIcon={<Input.Trigger triggerType='password-toggle' />}
          />
        </Input.Root>
      </div>

      {/* 에러 상태의 텍스트 입력 예시 */}
      {/*
       *❗주의: 이 InputContext.Provider 사용 방식은 실제 프로덕션 코드에서는 사용하지 않습니다.
       *
       * 이 코드는 react-hook-form의 상태 없이 Input 컴포넌트의 "에러 상태 UI"를 시각적으로 미리보기 위해 작성된 테스트/데모용 코드입니다.
       * 실제로는 useForm + FormProvider + Input.Root 구조를 사용해야 정상 동작합니다.
       *
       * @example
       * ✅ 실사용: <FormProvider><Input.Root name="email">...</Input.Root></FormProvider>
       * ❌ 여기처럼: <InputContext.Provider value={...}>는 테스트에서만 사용
       */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-size-15 font-semibold'>Text Input with Error</h2>

        <InputContext.Provider
          value={{
            id: 'input-error-preview',
            name: 'previewError',
            type: 'text',
            isError: true, // 에러 상태 강제 주입
            errors: {
              previewError: {
                message: '이메일 형식이 올바르지 않습니다.',
                type: 'manual',
              } satisfies FieldError,
            },
            register: {
              name: 'previewError',
              onBlur: () => {},
              onChange: () => {},
              ref: () => {},
            } as unknown as UseFormRegisterReturn,
            required: false,
            disabled: false,
            fileName: undefined,
            maxLength: undefined,
            currentLength: 0,
            fallbackMessage: '',
            isPasswordVisible: false,
            togglePasswordVisibility: () => {},
          }}
        >
          <div
            role='group'
            className='flex flex-col gap-10 rounded-lg border border-gray-300 px-20 py-15'
          >
            <Input.Label>Email</Input.Label>
            <Input.Field placeholder='Email을 입력하세요' />
            <Input.Helper />
          </div>
        </InputContext.Provider>
      </div>

      {/* Textarea 예시 */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-size-15 font-semibold'>Textarea</h2>
        <Input.Root
          id='textarea-example'
          name='comment'
          type='textarea'
          className={group}
          required
          maxLength={100}
        >
          <Input.Label>댓글</Input.Label>
          <Input.Field placeholder='댓글을 입력하세요' rows={4} />
          <Input.Helper />
        </Input.Root>
      </div>

      {/* 이미지 업로드 예시 */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-size-15 font-semibold'>File Input</h2>
        <Input.Root
          id='file-example'
          type='file'
          name='profileImage'
          className={group}
        >
          <Input.Label>이미지</Input.Label>
          <Input.Trigger
            triggerType='file-upload'
            className='relative flex h-120 w-120 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300'
          >
            {previewUrl && (
              <Image
                src={previewUrl}
                alt='Image preview'
                fill
                className='object-cover'
              />
            )}
          </Input.Trigger>
          <Input.Field accept='image/*' />
          <Input.Helper />
        </Input.Root>
      </div>

      {/* 비활성화된 입력 예시 */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-size-15 font-semibold'>Disabled Input</h2>
        <Input.Root
          id='disabled-example'
          type='text'
          name='disabledExample'
          className={group}
          disabled
        >
          <Input.Label>비활성화</Input.Label>
          <Input.Field placeholder='You cannot edit this' />
        </Input.Root>
      </div>

      {/* 검색 입력 예시 */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-size-15 font-semibold'>Search Input</h2>
        <Input.Root
          id='search-example'
          type='search'
          name='searchExample'
          className={group}
        >
          <Input.Label>검색</Input.Label>
          <Input.Field
            placeholder='비밀번호를 입력하세요'
            leftIcon={<Search size={24} />}
            className='pl-54'
          />
        </Input.Root>
      </div>

      {/* 숫자 입력 예시 */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-size-15 font-semibold'>Number Input</h2>
        <Input.Root
          id='number-example'
          type='number'
          name='numberExample'
          className={group}
        >
          <Input.Label>숫자(가격)</Input.Label>
          <Input.Field placeholder='가격을 입력하세요' />
        </Input.Root>
      </div>

      <Button
        type='submit'
        disabled={isSubmitting}
        className='font-size-16 px-50 py-30'
      >
        제출
      </Button>
    </form>
  );
}
