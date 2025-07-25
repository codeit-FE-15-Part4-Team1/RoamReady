import Link from 'next/link';

import Logo from '@/shared/assets/logos/Logo';
import { ROUTES } from '@/shared/constants/routes';
import { cn } from '@/shared/libs/cn';

/**
 * LogoLink 컴포넌트 입니다.
 *
 * 메인 페이지로 이동하는 링크 역할을 하는 로고 컴포넌트입니다.
 * `className`을 통해 추가적인 스타일 커스터마이징이 가능합니다.
 *
 * @param {string} [props.className] - 추가적인 Tailwind CSS 클래스명
 *
 * @example
 * ```tsx
 * <LogoLink />
+ * <LogoLink className="custom-class" />
 * ```
 */
export default function LogoLink({ className }: { className?: string }) {
  return (
    <Link href={ROUTES.MAIN}>
      <Logo
        className={cn(
          'tablet:w-130 tablet:h-100 relative h-70 w-100 shrink-0',
          className,
        )}
      />
    </Link>
  );
}
