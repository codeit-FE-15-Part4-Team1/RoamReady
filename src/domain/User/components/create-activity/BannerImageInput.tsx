'use client';

import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

import Input from '@/shared/components/ui/input';
import { useImagePreview } from '@/shared/hooks/useImagePreview';

export default function BannerImageInput() {
  const { control } = useFormContext(); // RHF context 사용
  const { previewUrl } = useImagePreview('bannerImage', control); // 필드 이름과 control 전달

  return (
    <div>
      <Input.Root
        id='banner'
        name='bannerImage'
        type='file'
        // fileName={bannerPreview.files.map((file) => file.name).join(',')}
        // handleFileChange={bannerPreview.handleFileChange}
        className='my-10'
      >
        <Input.Label className='font-size-16 font-bold'>
          배너 이미지 등록
        </Input.Label>

        <Input.Trigger triggerType='file-upload'>
          <div className='flex flex-wrap items-center gap-20'>
            <label
              htmlFor='banner'
              className='cursor-pointer border border-gray-500 p-30'
            >
              <Plus className='size-50' />
            </label>
            {previewUrl && (
              <div className='relative h-[20rem] w-[20rem]'>
                <button
                  type='button'
                  className='absolute -top-5 -right-5 z-10 cursor-pointer rounded-full border bg-black p-5 text-white'
                  // removeImage 기능 제거됨. 로직을 따로 구현하거나 필요 없으면 생략
                >
                  <X className='size-20' />
                </button>
                <Image
                  src={previewUrl}
                  alt='Image preview'
                  width={200}
                  height={200}
                  className='aspect-square rounded-3xl object-cover'
                />
              </div>
            )}
          </div>
        </Input.Trigger>
        <Input.Field accept='image/*' multiple />
      </Input.Root>
    </div>
  );
}
