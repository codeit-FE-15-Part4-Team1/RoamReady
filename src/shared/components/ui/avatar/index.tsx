import Image from 'next/image';

import LogoSymbol from '@/shared/assets/logos/logo-symbol';
import { cn } from '@/shared/libs/cn';
/**
 * Avatar 컴포넌트의 props
 */

/**
 * 표시할 프로필 이미지의 URL.
 * 빈 문자열을 전달하면 기본 로고가 표시됩니다.
 */
interface AvatarProps {
  /**
   * 아바타 크기 프리셋. (기본값: 'sm')
   * - `sm`: 30px
   * - `lg`: 70px (태블릿), 120px (데스크탑)
   */
  profileImageUrl: string;
  /**
   * 로딩 상태 여부.
   * true일 경우 로딩 UI(어두운 오버레이)가 표시됩니다.
   */
  size?: 'sm' | 'lg';
  isLoading?: boolean;
}

/**
 * `size` prop에 따라 CSS 클래스와 `next/image`의 `sizes` prop을 매핑하는 객체입니다.
 */
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
 * 사용자 프로필 아바타를 표시하는 컴포넌트
 *
 * 이미지 URL 유무에 따라 사용자 지정 이미지 또는 기본 로고를 렌더링하며,
 * 로딩 상태를 시각적으로 표현할 수 있습니다.
 *
 * @param profileImageUrl - 표시할 이미지 URL. Falsy 값일 경우 기본 로고가 표시됩니다.
 * @param size - 아바타 크기 프리셋 ('sm' 또는 'lg').
 * @param isLoading - 로딩 상태 여부.
 *
 * @example
 * <Avatar profileImageUrl={user.image} size="lg" isLoading={isUploading} />
 */
export default function Avatar({
  profileImageUrl,
  size = 'sm',
  isLoading = false,
}: AvatarProps) {
  // profileImageUrl이 빈 문자열('')이면 기본 이미지를 표시합니다.
  const isDefaultImage = !profileImageUrl;

  // size prop에 따라 해당되는 스타일 클래스와 sizes 속성을 가져옵니다.
  const { className, sizes } = avatarSizeStyles[size];

  // 기본 이미지를 표시해야 할 경우
  if (isDefaultImage) {
    return (
      <div className={cn('bg-brand-2 relative rounded-full', className)}>
        <div className='flex h-full w-full items-center justify-center p-4'>
          {/* 기본 유령 심볼 로고 렌더링 */}
          <LogoSymbol className='-rotate-30 text-white' />
        </div>
        {isLoading && (
          <div className='absolute inset-0 rounded-full bg-black/30 transition-opacity' />
        )}
      </div>
    );
  }

  // 사용자 지정 이미지를 표시해야 할 경우
  return (
    // 부모 div: next/image의 fill prop을 위해 상대 위치(relative)를 설정하고,
    // 자식 이미지가 부모를 벗어나지 않도록 overflow-hidden 및 반응형 크기 클래스를 적용합니다.
    <div className={cn('relative overflow-hidden rounded-full', className)}>
      <Image
        src={profileImageUrl}
        // `fill` prop: 부모 요소의 크기를 꽉 채우도록 설정. width/height prop과 함께 사용할 수 없음.
        alt='유저 프로필 이미지'
        // `sizes` prop: 브라우저에게 화면 크기별 이미지 너비를 알려주어, 최적의 이미지를 다운로드하도록 유도 (성능 최적화)
        fill
        // `object-cover`: 이미지 비율을 유지하면서 부모 요소를 가득 채움. 이미지가 잘릴 수 있음.
        sizes={sizes}
        className='object-cover'
        draggable='false'
      />
      {isLoading && (
        <div className='absolute inset-0 rounded-full bg-black/30 transition-opacity' />
      )}
    </div>
  );
}
