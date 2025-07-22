'use client';

import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Input from '@/shared/components/ui/input';

// 1. Controller로부터 받을 props 타입을 정의합니다.
//    - value: RHF가 관리하는 현재 파일 목록 (FileList)
//    - onChange: 파일 목록이 변경될 때 RHF 상태를 업데이트하는 함수
interface BannerImageInputProps {
  value?: FileList;
  onChange: (files: FileList | null) => void;
  // fieldState.error를 전달받기 위한 prop도 추가할 수 있습니다.
}

export default function BannerImageInput({
  value: files,
  onChange,
}: BannerImageInputProps) {
  const {
    formState: { errors },
  } = useFormContext();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // 2. RHF 상태(files)가 변경될 때마다 미리보기 URL을 업데이트합니다.
  useEffect(() => {
    if (files && files.length > 0) {
      const objectUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setPreviewUrls(objectUrls);

      // 컴포넌트가 언마운트되거나 파일이 변경되면 기존 URL을 해제하여 메모리 누수를 방지합니다.
      return () => {
        objectUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setPreviewUrls([]);
    }
  }, [files]);

  // 3. DataTransfer 객체를 사용해 FileList를 쉽게 조작하는 헬퍼 함수
  const createNewFileList = (
    currentFiles: FileList | undefined,
    filesToAdd: File[],
    filesToRemove?: number[],
  ) => {
    const dataTransfer = new DataTransfer();
    const existingFiles = currentFiles ? Array.from(currentFiles) : [];

    // 파일 추가
    const allFiles = [...existingFiles, ...filesToAdd];

    // 파일 제거
    const finalFiles = filesToRemove
      ? allFiles.filter((_, i) => !filesToRemove.includes(i))
      : allFiles;

    finalFiles.forEach((file) => dataTransfer.items.add(file));
    return dataTransfer.files;
  };

  // 4. 파일 선택 시 실행되는 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const updatedFileList = createNewFileList(files, newFiles);
    onChange(updatedFileList); // RHF 상태 업데이트
  };

  // 5. 이미지 제거 시 실행되는 핸들러
  const removeImage = (indexToRemove: number) => {
    const updatedFileList = createNewFileList(files, [], [indexToRemove]);
    onChange(updatedFileList.length > 0 ? updatedFileList : null); // RHF 상태 업데이트
  };

  // Zod 스키마에 정의된 에러 메시지를 가져옵니다.
  const errorMessage = errors.bannerImages?.message;

  return (
    <div>
      <Input.Root name='bannerImages' id='banner' type='file' className='my-10'>
        <Input.Label className='font-size-16 font-bold'>
          배너 이미지 등록
        </Input.Label>
        <div className='flex flex-wrap items-center gap-20'>
          <label
            htmlFor='banner'
            className='flex h-[112px] w-[112px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300'
          >
            <Plus className='size-50' />
          </label>
          {previewUrls.map((url, index) => (
            <div key={url} className='relative h-[112px] w-[112px]'>
              <button
                type='button'
                onClick={() => removeImage(index)}
                className='absolute -top-10 -right-10 z-10 rounded-full bg-black p-2 shadow-md'
              >
                <X className='size-16 text-white' />
              </button>
              <Image
                src={url}
                alt={`미리보기 ${index + 1}`}
                fill
                className='rounded-lg object-cover'
              />
            </div>
          ))}
        </div>
        {/* 실제 파일 입력을 담당하는 숨겨진 input. 자체 onChange 핸들러를 사용합니다. */}
        <input
          id='banner'
          type='file'
          multiple
          accept='image/*'
          onChange={handleFileChange}
          className='hidden'
        />
      </Input.Root>
      {errorMessage && (
        <p className='font-size-12 mt-4 text-red-500'>{String(errorMessage)}</p>
      )}
    </div>
  );
}
