'use client';

import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Input from '@/shared/components/ui/input';

interface IntroImageInputProps {
  value?: FileList | string[] | null;
  onChange: (files: FileList | string[] | null) => void;
  name: string;
  existingImageUrls?: string[];
  onRemoveExistingImage?: (url: string) => void;
}

export default function IntroImageInput({
  value,
  onChange,
  name,
  existingImageUrls = [],
  onRemoveExistingImage = () => {},
}: IntroImageInputProps) {
  const [newFilePreviewUrls, setNewFilePreviewUrls] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const MAX_IMAGES = 4;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (value instanceof FileList && value.length > 0) {
      // 새로운 파일이 들어온 경우 (FileList)
      const objectUrls = Array.from(value).map((file) =>
        URL.createObjectURL(file),
      );
      setNewFilePreviewUrls(objectUrls);
      return () => {
        objectUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else if (Array.isArray(value) && value.length > 0) {
      // 기존 이미지 URL 배열인 경우
      setNewFilePreviewUrls([]); // 새 파일 미리보기는 없음
    } else {
      // FileList가 없으면 미리보기 URL 초기화
      setNewFilePreviewUrls([]);
    }
  }, [value]);

  // existingImageUrls 변경 감지
  useEffect(() => {}, [existingImageUrls]);

  const createNewFileList = (
    currentFiles: FileList | undefined | null,
    filesToAdd: File[],
    indexToRemove?: number,
  ) => {
    const dataTransfer = new DataTransfer();
    let existing = currentFiles ? Array.from(currentFiles) : [];
    if (indexToRemove !== undefined) {
      existing = existing.filter((_, i) => i !== indexToRemove);
    }
    const finalFiles = [...existing, ...filesToAdd];
    finalFiles.forEach((file) => dataTransfer.items.add(file));
    return dataTransfer.files;
  };

  const getCurrentImageCount = () => {
    const existingCount = existingImageUrls.length;
    const newFileCount = value instanceof FileList ? value.length : 0;
    return existingCount + newFileCount;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const addedFiles = Array.from(e.target.files);

    // 현재 이미지 개수 확인
    const currentCount = getCurrentImageCount();
    const availableSlots = MAX_IMAGES - currentCount;

    if (availableSlots <= 0) {
      alert(`최대 ${MAX_IMAGES}개까지만 등록할 수 있습니다.`);
      e.target.value = ''; // input 초기화
      return;
    }

    // 추가하려는 파일이 남은 슬롯보다 많으면 제한
    const filesToAdd = addedFiles.slice(0, availableSlots);

    if (addedFiles.length > availableSlots) {
      alert(
        `최대 ${MAX_IMAGES}개까지만 등록할 수 있습니다. ${filesToAdd.length}개만 추가됩니다.`,
      );
    }

    // 현재 value가 FileList인 경우 기존 파일과 합침
    if (value instanceof FileList) {
      const updatedFileList = createNewFileList(value, addedFiles);
      onChange(updatedFileList.length > 0 ? updatedFileList : null);
    } else {
      // 새로운 파일만 추가
      const updatedFileList = createNewFileList(null, addedFiles);
      onChange(updatedFileList.length > 0 ? updatedFileList : null);
    }
  };

  const handleRemoveNewFile = (indexToRemove: number) => {
    if (value instanceof FileList) {
      const updatedFileList = createNewFileList(value, [], indexToRemove);
      onChange(updatedFileList.length > 0 ? updatedFileList : null);
    }
  };

  // 🚨 수정된 부분: 기존 이미지는 항상 표시하고, 새 파일도 함께 표시
  const displayExistingImages = existingImageUrls;
  const displayNewFileImages = newFilePreviewUrls;
  const currentImageCount = getCurrentImageCount();
  const canAddMore = currentImageCount < MAX_IMAGES;

  return (
    <div>
      <Input.Root name={name} id={name} type='file'>
        <Input.Label className='font-bold'>소개 이미지 등록</Input.Label>
        <div className='flex flex-wrap items-center gap-20'>
          <label
            htmlFor={name}
            className='flex h-[112px] w-[112px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300'
          >
            {canAddMore && <Plus className='size-50' />}
            {currentImageCount} / {MAX_IMAGES}
          </label>

          {/* 기존 이미지 표시 - 항상 표시 */}
          {isMounted &&
            displayExistingImages.map((url) => (
              <div
                key={`existing-${url}`}
                className='relative h-[112px] w-[112px]'
              >
                <button
                  type='button'
                  onClick={() => onRemoveExistingImage(url)}
                  className='absolute -top-10 -right-10 z-10 rounded-full bg-black p-2 shadow-md'
                >
                  <X className='size-16 text-white' />
                </button>
                <Image
                  src={url}
                  alt='기존 소개 이미지'
                  fill
                  className='rounded-lg object-cover'
                />
              </div>
            ))}

          {/* 새 파일 미리보기 표시 */}
          {isMounted &&
            displayNewFileImages.map((url, index) => (
              <div key={`new-${url}`} className='relative h-[112px] w-[112px]'>
                <button
                  type='button'
                  onClick={() => handleRemoveNewFile(index)}
                  className='absolute -top-10 -right-10 z-10 rounded-full bg-black p-2 shadow-md'
                >
                  <X className='size-16 cursor-pointer text-white' />
                </button>
                <Image
                  src={url}
                  alt={`새 소개 이미지 ${index + 1}`}
                  fill
                  className='rounded-lg object-cover'
                />
              </div>
            ))}
        </div>
        <Input.Helper />
      </Input.Root>

      <input
        id={name}
        name={name}
        type='file'
        className='hidden'
        onChange={handleFileChange}
        accept='image/*'
        multiple
      />
    </div>
  );
}
