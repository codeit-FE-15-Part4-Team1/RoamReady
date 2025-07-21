'use client';

import { Plus, X } from 'lucide-react';
import Image from 'next/image';

import Input from '@/shared/components/ui/input';
import { useImagePreview } from '@/shared/hooks/useImageMultiPreview';

export default function IntroImageInput() {
  const introPreview = useImagePreview();

  return (
    <div>
      <Input.Root
        id='intro'
        type='file'
        fileName={introPreview.files.map((file) => file.name).join(',')}
        handleFileChange={introPreview.handleFileChange}
        className='my-10'
      >
        <Input.Label className='font-size-16 font-bold'>
          소개 이미지 등록
        </Input.Label>

        <Input.Trigger triggerType='file-upload'>
          <div className='flex flex-wrap items-center gap-20'>
            <label
              htmlFor='intro'
              className='cursor-pointer border border-gray-500 p-30'
            >
              <Plus className='size-50' />
            </label>
            {introPreview.previewUrls.length > 0 &&
              introPreview.previewUrls.map((url, index) => (
                <div key={index} className='relative h-[20rem] w-[20rem]'>
                  <button
                    type='button'
                    className='absolute -top-5 -right-5 z-10 cursor-pointer rounded-full border bg-black p-5 text-white'
                  >
                    <X
                      className='size-20'
                      onClick={(e) => {
                        e.stopPropagation();
                        introPreview.removeImage(index);
                      }}
                    />
                  </button>
                  <Image
                    src={url}
                    alt='Image preview'
                    width={200}
                    height={200}
                    className='aspect-square rounded-3xl object-cover'
                  />
                </div>
              ))}
          </div>
        </Input.Trigger>
        <Input.Field accept='image/*' multiple />
      </Input.Root>
    </div>
  );
}
