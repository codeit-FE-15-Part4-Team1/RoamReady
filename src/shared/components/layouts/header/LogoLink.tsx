import Link from 'next/link';

import Logo from '@/app/assets/logos/logo';
import { ROUTES } from '@/shared/constants/route';
import { cn } from '@/shared/libs/cn';

/**
 * Logo 컴포넌트 입니다.
 *
 * 메인 페이지로 이동하는 링크 역할을 하는 로고 컴포넌트입니다.
 * 기본 로고 경로(`/logos/logo-3-black.svg`)를 사용하거나, `src`를 통해 다른 이미지로 대체할 수 있습니다.
 * 또한 `className`을 통해 추가적인 스타일 커스터마이징이 가능합니다.
 *
 * @param {string} [props.className] - 추가적인 Tailwind CSS 클래스명
 * @param {string} [props.src] - 로고 이미지의 경로 (기본값: `/logos/logo-3-black.svg`)
 *
 * @example
 * ```tsx
 * <Logo />
 * <Logo src="/logos/logo-2-black.svg"/>
 * ```
 */
export default function LogoLink({ className }: { className?: string }) {
  return (
    <Link href={ROUTES.Main}>
      <Logo
        className={cn(
          'tablet:w-130 tablet:h-100 relative h-70 w-100 shrink-0',
          className,
        )}
      />
    </Link>
  );
}
