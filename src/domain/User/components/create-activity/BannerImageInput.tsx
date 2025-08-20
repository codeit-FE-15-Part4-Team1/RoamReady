'use client';

import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import Input from '@/shared/components/ui/input';

// ✨ Props 타입을 FileList | string | null로 수정
interface BannerImageInputProps {
  value?: FileList | string | null;
  onChange: (files: FileList | string | null) => void;
  name: string;
  existingImageUrl?: string;
  onRemoveExistingImage?: () => void;
}

export default function BannerImageInput({
  value,
  onChange,
  name,
  existingImageUrl,
  onRemoveExistingImage = () => {},
}: BannerImageInputProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (value instanceof FileList && value.length > 0) {
      // 새로운 파일이 들어온 경우 (FileList)
      const file = value[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof value === 'string') {
      // 기존 이미지 URL이 RHF의 값으로 들어온 경우 (string)
      setPreviewUrl(value);
    } else if (existingImageUrl) {
      // RHF 값은 없지만 표시해야 할 기존 이미지가 있는 경우 (초기 로드)
      setPreviewUrl(existingImageUrl);
    } else {
      // 모든 값이 없는 경우
      setPreviewUrl(null);
    }
  }, [value, existingImageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      // React Hook Form이 요구하는 FileList 형식을 그대로 전달
      onChange(selectedFiles);
    } else {
      onChange(null);
    }
  };

  const handleRemoveImage = () => {
    // null을 전달하여 RHF의 필드 값을 비움
    onChange(null);
    onRemoveExistingImage();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Input.Root name={name} id={name} type='file'>
      <Input.Label className='font-bold'>배너 이미지 등록</Input.Label>
      <div className='flex flex-wrap items-center gap-20'>
        {isMounted && (
          <label className='flex h-[112px] w-[112px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300'>
            <Plus className='size-50' />
            <input
              ref={inputRef}
              id={name}
              name={name}
              type='file'
              className='hidden'
              onChange={handleFileChange}
              accept='image/*'
            />
          </label>
        )}
        {isMounted && previewUrl && (
          <div className='relative h-[112px] w-[112px]'>
            <button
              type='button'
              onClick={handleRemoveImage}
              className='absolute -top-10 -right-10 z-10 rounded-full bg-black p-2 shadow-md'
            >
              <X className='size-16 cursor-pointer text-white' />
            </button>
            <Image
              src={previewUrl}
              alt='배너 이미지 미리보기'
              fill
              className='rounded-lg object-cover'
            />
          </div>
        )}
      </div>
      <Input.Helper />
    </Input.Root>
  );
}
