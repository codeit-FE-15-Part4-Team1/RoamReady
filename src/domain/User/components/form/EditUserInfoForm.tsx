'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import EditUserInfoFormField from '@/domain/User/components/form/EditUserInfoFormField';
import { useUserInfoMutation } from '@/domain/User/hooks/useUserInfoMutation';
import {
  userInfoFormSchema,
  UserInfoFormValues,
} from '@/domain/User/schemas/userInfoForm';
import Button from '@/shared/components/Button';
import { useRoamReadyStore } from '@/shared/store';

interface EditUserInfoFormProps {
  /**
   * 현재 선택된 프로필 이미지 URL
   * EditableAvatar에서 변경된 이미지 URL이 포함됩니다.
   */
  currentProfileImageUrl: string;
}

export default function EditUserInfoForm({
  currentProfileImageUrl,
}: EditUserInfoFormProps) {
  const { user } = useRoamReadyStore();
  const { mutate: updateUserInfo, isPending } = useUserInfoMutation(
    currentProfileImageUrl,
  );

  const methods = useForm<UserInfoFormValues>({
    resolver: zodResolver(userInfoFormSchema),
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  // 유저 정보가 로드된 후 폼 필드에 자동 입력
  useEffect(() => {
    if (user) {
      methods.reset({
        nickname: user.nickname ?? '',
        email: user.email ?? '',
        password: '',
        passwordConfirm: '',
      });
    }
  }, [user, methods]);

  /**
   * 폼 제출 시 호출되는 핸들러
   * 유효성 검사를 통과한 폼 데이터를 서버로 전송합니다.
   */
  const onSubmit = (data: UserInfoFormValues) => {
    if (!user) return;
    updateUserInfo(data);
  };

  return (
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
          disabled={isPending}
          className='font-size-14 mt-40 rounded-3xl py-12 font-semibold disabled:bg-neutral-400 disabled:text-neutral-200'
        >
          {isPending ? '수정 중...' : '회원정보 수정'}
        </Button>
      </form>
    </FormProvider>
  );
}
