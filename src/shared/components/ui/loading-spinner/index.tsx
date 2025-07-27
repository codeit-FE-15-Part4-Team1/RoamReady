import { cn } from '@/shared/libs/cn';

interface LoadingSpinnerProps {
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 로딩 스피너
 *
 * 반응형으로 크기가 조정됩니다
 * - 모바일: 14px
 * - 태블릿 이상: 16px
 *
 * 색상은 className prop을 통해 변경할 수 있습니다.
 * 예: text-blue-500, text-red-500 등 (text-* 클래스만 사용 가능)
 *
 * @param className - 추가 CSS 클래스
 */
export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-2 border-current border-r-transparent',
        'h-14 w-14 md:h-16 md:w-16',
        'motion-reduce:animate-none',
        className,
      )}
    >
      <span className='sr-only'>로딩중...</span>
    </div>
  );
}
