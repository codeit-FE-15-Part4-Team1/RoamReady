'use client';

import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// InputField를 import할 필요가 없습니다.
import Input from '@/shared/components/ui/input';

interface BannerImageInputProps {
  value?: FileList;
  onChange: (files: FileList | null) => void;
  name: string;
}

export default function BannerImageInput({
  value: files,
  onChange,
  name,
}: BannerImageInputProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (files && files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [files]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files);
  };

  const handleRemoveImage = () => {
    onChange(null);
  };

  return (
    <div>
      <Input.Root name={name} id={name} type='file'>
        <Input.Label>배너 이미지 등록 (1개)</Input.Label>
        <div className='flex flex-wrap items-center gap-20'>
          {!previewUrl && (
            <label
              htmlFor={name}
              className='flex h-[112px] w-[112px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300'
            >
              <Plus className='size-50' />
            </label>
          )}
          {isMounted && previewUrl && (
            <div className='relative h-[112px] w-[112px]'>
              <button
                type='button'
                onClick={handleRemoveImage}
                className='absolute -top-10 -right-10 z-10 rounded-full bg-black p-2 shadow-md'
              >
                <X className='size-16 text-white' />
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

      {/* ✨ [핵심] InputField 대신, onChange를 직접 제어할 수 있는 별도의 input 태그를 사용합니다. */}
      <input
        id={name}
        name={name}
        type='file'
        className='hidden'
        onChange={handleFileChange}
        accept='image/*'
      />
    </div>
  );
}
