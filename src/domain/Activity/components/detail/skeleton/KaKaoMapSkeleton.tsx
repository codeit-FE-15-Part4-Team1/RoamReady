import { cn } from '@/shared/libs/cn';

export default function KaKaoMapSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        'tablet:h-450 bg-brand-1 h-250 w-full animate-pulse rounded-3xl border-none',
        className,
      )}
    />
  );
}
