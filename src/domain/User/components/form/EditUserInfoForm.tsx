'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import EditUserInfoFormField from '@/domain/User/components/form/EditUserInfoFormField';
import { useProfileImageMutation } from '@/domain/User/hooks/useProfileImageMutation';
import { useUserInfoMutation } from '@/domain/User/hooks/useUserInfoMutation';
import {
  userInfoFormSchema,
  UserInfoFormValues,
} from '@/domain/User/schemas/userInfoForm';
import Button from '@/shared/components/Button';
import { PROFILE_AVATAR_OPTIONS } from '@/shared/components/constants/image';
import Avatar from '@/shared/components/ui/avatar';
import { LoadingSpinner } from '@/shared/components/ui/loading-spinner';
import Popover from '@/shared/components/ui/popover';
import { usePopover } from '@/shared/components/ui/popover/PopoverContext';
import { useImageCompression } from '@/shared/hooks/useImageCompression';
import { useRoamReadyStore } from '@/shared/store';

export default function EditUserInfoForm() {
  const { user } = useRoamReadyStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 프로필 이미지 상태 관리
  const [profileImageUrl, setProfileImageUrl] = useState<string>(
    user?.profileImageUrl || '',
  );

  // 이미지 압축 커스텀 훅
  const { compressImage, isCompressing } = useImageCompression();

  // 이미지 업로드(Mutation) 커스텀 훅
  const { mutate: uploadImage, isPending: isImageUploading } =
    useProfileImageMutation({
      setProfileImageUrl,
      initialImageUrl: user?.profileImageUrl || '',
      onImageChange: (imageUrl: string) => setProfileImageUrl(imageUrl),
    });

  const { mutate: updateUserInfo, isPending: isFormSubmitting } =
    useUserInfoMutation(profileImageUrl);

  const methods = useForm<UserInfoFormValues>({
    resolver: zodResolver(userInfoFormSchema),
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  // 유저 정보가 로드된 후 폼 필드와 프로필 이미지 자동 설정
  useEffect(() => {
    if (user) {
      methods.reset({
        nickname: user.nickname ?? '',
        email: user.email ?? '',
        password: '',
        passwordConfirm: '',
      });
      setProfileImageUrl(user.profileImageUrl || '');
    }
  }, [user, methods]);

  /**
   * 파일 input의 변경 이벤트를 받아 이미지 처리 플로우 전체를 실행하는 핸들러
   * createObjectURL을 이용한 낙관적 업데이트 구현
   */
  const handleImageFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        // 1. createObjectURL을 이용한 즉시 프리뷰 (낙관적 업데이트)
        const previewUrl = URL.createObjectURL(file);
        setProfileImageUrl(previewUrl);

        // 2. 이미지 압축 실행
        const compressedFile = await compressImage(
          file,
          PROFILE_AVATAR_OPTIONS,
        );

        // 3. 압축된 파일을 서버에 업로드
        uploadImage(compressedFile);
      } catch (error) {
        // 에러 발생 시 이전 이미지로 롤백
        setProfileImageUrl(user?.profileImageUrl || '');
        console.error('이미지 처리 중 오류가 발생했습니다:', error);
        alert('이미지 처리 중 오류가 발생했습니다.');
      } finally {
        // input 값 초기화 (같은 파일 재선택 가능하게)
        e.target.value = '';
      }
    },
    [compressImage, uploadImage, user?.profileImageUrl],
  );

  /**
   * 파일 선택 대화상자 열기
   */
  const handleImageChange = () => {
    fileInputRef.current?.click();
  };

  /**
   * 프로필 이미지를 기본 이미지로 변경
   */
  const handleResetToDefault = () => {
    setProfileImageUrl('');
  };

  /**
   * 현재 이미지가 기본 이미지인지 판단
   */
  const isDefaultImage = !profileImageUrl || profileImageUrl.trim() === '';

  /**
   * 폼 제출 시 호출되는 핸들러
   * 유효성 검사를 통과한 폼 데이터를 서버로 전송합니다.
   */
  const onSubmit = (data: UserInfoFormValues) => {
    if (!user) return;
    updateUserInfo(data);
  };

  const isLoading = isCompressing || isImageUploading || isFormSubmitting;

  /**
   * Popover 내부 버튼 컴포넌트
   * usePopover 훅을 사용하여 Popover를 닫을 수 있습니다.
   */
  const PopoverButtons = () => {
    const { setIsOpen } = usePopover();

    const handleImageChangeWithClose = () => {
      handleImageChange();
      setIsOpen(false);
    };

    const handleResetToDefaultWithClose = () => {
      handleResetToDefault();
      setIsOpen(false);
    };

    return (
      <div className='w-120 space-y-1'>
        <button
          type='button'
          onClick={handleImageChangeWithClose}
          disabled={isCompressing || isImageUploading}
          className='font-size-14 hover:bg-brand-1 flex w-full items-center gap-3 rounded-xl p-8 text-left text-sm disabled:cursor-not-allowed disabled:opacity-50'
        >
          이미지 변경
        </button>

        {!isDefaultImage && (
          <>
            <div className='px-6'>
              <div className='h-1 w-full bg-neutral-200' />
            </div>
            <button
              type='button'
              onClick={handleResetToDefaultWithClose}
              disabled={isCompressing || isImageUploading}
              className='font-size-14 hover:bg-brand-1 flex w-full items-center gap-3 rounded-xl p-8 text-left text-sm disabled:cursor-not-allowed disabled:opacity-50'
            >
              기본 이미지로 변경
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className='flex flex-col gap-4'>
      {/* 프로필 이미지 섹션 */}
      <div className='tablet:py-16 desktop:py-24 relative mx-auto w-fit py-24'>
        <Popover.Root>
          <Popover.Trigger>
            <div className='relative'>
              <Avatar
                profileImageUrl={profileImageUrl}
                size='lg'
                isLoading={isCompressing || isImageUploading}
                clickable
              />
              <div className='flex-center bg-brand-1 absolute right-[5%] bottom-0 size-25 rounded-full shadow-lg'>
                <Pencil className='text-brand-2 size-15' />
              </div>
            </div>
          </Popover.Trigger>
          <Popover.Content position='bottom-end' className='ml-100'>
            <PopoverButtons />
          </Popover.Content>
        </Popover.Root>

        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={handleImageFileChange}
          className='hidden'
        />
      </div>

      {/* 사용자 정보 폼 섹션 */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='flex flex-col gap-4'
        >
          <EditUserInfoFormField name='nickname' label='닉네임' type='text' />
          <EditUserInfoFormField
            name='email'
            label='이메일'
            type='email'
            disabled
          />
          <EditUserInfoFormField
            name='password'
            label='비밀번호'
            type='password'
          />
          <EditUserInfoFormField
            name='passwordConfirm'
            label='비밀번호 확인'
            type='password'
          />
          <Button
            type='submit'
            variant='primary'
            size='large'
            disabled={isLoading}
            className='font-size-14 flex-center mt-40 rounded-3xl border-none py-12 font-semibold disabled:bg-neutral-200 disabled:text-neutral-400'
          >
            {isLoading ? <LoadingSpinner /> : '회원정보 수정'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
