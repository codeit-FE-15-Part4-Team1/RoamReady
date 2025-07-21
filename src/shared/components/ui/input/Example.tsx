'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { useImagePreview } from '@/shared/hooks/useImageMultiPreview';
import { cn } from '@/shared/libs/cn';

import Input from '.';

/**
 * @component Example
 * @description
 * `Input` 컴포넌트의 다양한 사용 예시를 보여주는 데모용 UI입니다.
 * 텍스트, 비밀번호, 텍스트에리어, 숫자, 파일 업로드, 에러 상태, 검색, 비활성화 등의
 * 다양한 입력 필드를 실제로 어떻게 구성하고 사용하는지를 시각적으로 확인할 수 있습니다.
 *
 * 미리보기 기능을 위해 `useImagePreview` 훅을 활용하여 이미지 파일 업로드 시
 * 업로드된 파일의 브라우저 URL을 생성하고 즉시 미리보기를 제공합니다.
 *
 * @see src/app/test/input
 *
 */
export default function Example() {
  const [textValue, setTextValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const { files, previewUrls, handleFileChange } = useImagePreview();
  const group = 'rounded-lg border border-gray-300 px-20 py-15';

  return (
    <div className='flex flex-col gap-40 p-30'>
      <h1 className='font-size-20 font-bold'>Input Component Examples</h1>

      {/* 텍스트 입력 예시 */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-size-15 font-semibold'>Text Input</h2>
        <Input.Root id='text-example' type='text' className={group}>
          <Input.Label>이름</Input.Label>
          <Input.Field
            placeholder='이름을 입력하세요'
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <Input.Helper>안내 메시지</Input.Helper>
        </Input.Root>
      </div>

      {/* 텍스트 입력 예시(half width) */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-size-15 font-semibold'>Text Input (Half Width)</h2>
        <Input.Root
          id='text-example-half'
          type='text'
          className={cn('w-1/2', group)}
        >
          <Input.Label>이름</Input.Label>
          <Input.Field
            placeholder='이름을 입력하세요'
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
        </Input.Root>
      </div>

      {/* 비밀번호 입력 예시 */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-size-15 font-semibold'>Password Input</h2>
        <Input.Root id='password' type='password'>
          <Input.Label>비밀번호</Input.Label>
          <Input.Field
            placeholder='비밀번호를 입력해주세요'
            rightIcon={<Input.Trigger triggerType='password-toggle' />}
          />
        </Input.Root>
      </div>

      {/* 에러 상태의 텍스트 입력 예시 */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-size-15 font-semibold'>Text Input with Error</h2>
        <Input.Root id='error-example' type='text' className={group} isError>
          <Input.Label>Email</Input.Label>
          <Input.Field placeholder='Email을 입력하세요' />
          <Input.Helper>유효하지 않은 이메일입니다.</Input.Helper>
        </Input.Root>
      </div>

      {/* Textarea 예시 */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-size-15 font-semibold'>Textarea</h2>
        <Input.Root
          id='textarea-example'
          type='textarea'
          className={group}
          required
          maxLength={100}
          currentLength={textareaValue.length}
        >
          <Input.Label>댓글</Input.Label>
          <Input.Field
            placeholder='댓글을 입력하세요'
            rows={4}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
          <Input.Helper />
        </Input.Root>
      </div>

      {/* 이미지 업로드 예시 */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-size-15 font-semibold'>File Input</h2>
        <Input.Root
          id='file-example'
          type='file'
          fileName={files.map((file) => file.name).join(',')}
          className={group}
          handleFileChange={handleFileChange}
          // fallbackMessage='이미지를 업로드하세요'
        >
          <Input.Label>이미지</Input.Label>
          <Input.Trigger
            triggerType='file-upload'
            className='relative flex h-120 w-120 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300'
          >
            {previewUrls.length > 0 && (
              <Image
                src={previewUrls[0]}
                alt='Image preview'
                fill
                className='object-cover'
              />
            )}
          </Input.Trigger>
          <Input.Field accept='image/*' />
        </Input.Root>
      </div>

      {/* 비활성화된 입력 예시 */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-size-15 font-semibold'>Disabled Input</h2>
        <Input.Root
          id='disabled-example'
          type='text'
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
        <Input.Root id='search-example' type='search' className={group}>
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
        <Input.Root id='number-example' type='number' className={group}>
          <Input.Label>숫자(가격)</Input.Label>
          <Input.Field placeholder='가격을 입력하세요' />
        </Input.Root>
      </div>
    </div>
  );
}
