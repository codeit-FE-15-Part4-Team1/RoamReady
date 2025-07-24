'use client';

import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Input from '@/shared/components/ui/input';

// Controller로부터 받을 props 타입을 정의합니다.
interface IntroImageInputProps {
  value?: FileList;
  onChange: (files: FileList | null) => void;
  name: string;
}

export default function IntroImageInput({
  value: files,
  onChange,
  name,
}: IntroImageInputProps) {
  const {
    formState: { errors },
  } = useFormContext();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // RHF 상태(files)가 변경될 때마다 미리보기 URL을 업데이트합니다.
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

  // DataTransfer 객체를 사용해 FileList를 쉽게 조작하는 헬퍼 함수
  const createNewFileList = (
    currentFiles: FileList | undefined,
    filesToAdd: File[],
    filesToRemove?: number[],
  ) => {
    const dataTransfer = new DataTransfer();
    const existingFiles = currentFiles ? Array.from(currentFiles) : [];
    const allFiles = [...existingFiles, ...filesToAdd];
    const finalFiles = filesToRemove
      ? allFiles.filter((_, i) => !filesToRemove.includes(i))
      : allFiles;
    finalFiles.forEach((file) => dataTransfer.items.add(file));
    return dataTransfer.files;
  };

  // 파일 선택 시 실행되는 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const updatedFileList = createNewFileList(files, newFiles);
    onChange(updatedFileList); // RHF 상태 업데이트
  };

  // 이미지 제거 시 실행되는 핸들러
  const removeImage = (indexToRemove: number) => {
    const updatedFileList = createNewFileList(files, [], [indexToRemove]);
    onChange(updatedFileList.length > 0 ? updatedFileList : null); // RHF 상태 업데이트
  };

  // Zod 스키마에 정의된 에러 메시지를 가져옵니다. (subImages 필드)
  const errorMessage = errors.subImages?.message;

  return (
    <div>
      <Input.Root name={name} id='intro' type='file' className='my-10'>
        <Input.Label className='font-size-16 font-bold'>
          소개 이미지 등록
        </Input.Label>
        <div className='flex flex-wrap items-center gap-20'>
          <label
            htmlFor='intro'
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
        {/* 실제 파일 입력을 담당하는 숨겨진 input */}
        <input
          id='intro'
          type='file'
          multiple
          accept='image/*'
          onChange={handleFileChange}
          className='hidden'
          name={name}
        />
      </Input.Root>
      {errorMessage && (
        <p className='font-size-12 mt-4 text-red-500'>{String(errorMessage)}</p>
      )}
    </div>
  );
}
