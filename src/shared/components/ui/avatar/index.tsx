import Image from 'next/image';

import LogoSymbol from '@/shared/assets/logos/logo-symbol';
import { cn } from '@/shared/libs/cn';

interface AvatarProps {
  profileImageUrl: string;
  size?: 'sm' | 'lg';
  isLoading?: boolean;
}

// `size`에 따라 다른 스타일 선언 객체
const avatarSizeStyles = {
  sm: {
    className: 'size-30',
    sizes: '30px',
  },
  lg: {
    className: 'size-70 desktop:size-120',
    sizes: '(min-width: 1024px) 120px, 70px',
  },
};

/**
 * 사용자 프로필 아바타를 컴포넌트입니다.
 * `profileImageUrl` 유무에 따라 유저 지정 이미지 또는 기본 로고를 렌더링합니다.
 *
 * @param profileImageUrl - 표시할 이미지의 URL. 빈 문자열("")을 전달하면 기본 로고가 나타납니다.
 * @param size - 아바타의 크기를 지정합니다. 헤더에 사용되는 사이즈는 `sm`이고, 마이페이지에서 사용되는 사이즈는 `lg`입니다. (기본 값 : `sm` )
 */

export default function Avatar({
  profileImageUrl,
  size = 'sm',
  isLoading,
}: AvatarProps) {
  // `profileImageUrl`가 빈 문자열('')이면 기본 이미지를 반환하기 위한 값
  const isDefaultImage = !profileImageUrl;
  // `size` prop에 따른 `avatarSizeStyles` 객체 구조 분해
  const { className, sizes } = avatarSizeStyles[size];

  return isDefaultImage ? (
    <div className={cn('bg-brand-2 relative rounded-full', className)}>
      <div className='flex h-full w-full items-center justify-center p-4'>
        <LogoSymbol className='-rotate-30 text-white' />
      </div>
      {/* 기본 로고일 때도 로딩 오버레이 추가 */}
      {isLoading && (
        <div className='absolute inset-0 rounded-full bg-black/70' />
      )}
    </div>
  ) : (
    // 유저 이미지 아바타
    <div className={cn('relative overflow-hidden rounded-full', className)}>
      <Image
        src={profileImageUrl}
        alt='유저 프로필 이미지'
        fill
        sizes={sizes}
        className='object-cover'
        draggable='false'
      />
      {/* 👇 isLoading일 때만 렌더링되는 검은색 오버레이 div */}
      {isLoading && (
        <div className='absolute inset-0 rounded-full bg-black/70' />
      )}
    </div>
  );
}
