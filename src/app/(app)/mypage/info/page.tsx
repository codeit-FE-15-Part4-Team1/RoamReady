'use client';

import { useEffect, useState } from 'react';

import EditUserInfoForm from '@/domain/User/components/form/EditUserInfoForm';
import EditableAvatar from '@/domain/User/components/ui/EditableAvatar';
import { useRoamReadyStore } from '@/shared/store';

/**
 * 사용자 정보 수정 페이지 컴포넌트
 *
 * 프로필 이미지 수정과 사용자 정보(닉네임, 비밀번호) 수정 기능을 제공합니다.
 * EditableAvatar와 EditUserInfoForm 컴포넌트 간의 프로필 이미지 상태를 동기화합니다.
 */
export default function MyInfoPage() {
  const { user } = useRoamReadyStore();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(
    user?.profileImageUrl || null,
  );

  // user 상태가 변경될 때 프로필 이미지 URL 동기화
  useEffect(() => {
    if (user) {
      setProfileImageUrl(user.profileImageUrl);
    }
  }, [user?.profileImageUrl]);

  /**
   * 아바타 이미지 변경 시 호출되는 핸들러
   * EditableAvatar에서 이미지가 변경될 때 상태를 동기화합니다.
   */
  const handleImageChange = (imageUrl: string) => {
    setProfileImageUrl(imageUrl);
  };

  return (
    <div>
      <h1 className='font-size-18 font-bold text-neutral-900'>내 정보</h1>
      <p className='font-size-16 text-neutral-700'>
        이미지와 닉네임, 비밀번호를 수정할 수 있습니다.
      </p>
      <EditableAvatar
        initialImageUrl={user?.profileImageUrl || ''}
        onImageChange={handleImageChange}
        className='tablet:py-16 desktop:py-24 mx-auto py-24'
      />
      <EditUserInfoForm currentProfileImageUrl={profileImageUrl || ''} />
    </div>
  );
}
