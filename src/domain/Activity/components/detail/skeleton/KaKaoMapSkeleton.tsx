import { cn } from '@/shared/libs/cn';

export default function KaKaoMapSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        'h-300 w-full animate-pulse rounded-3xl border-none bg-gray-100',
        className,
      )}
    />
  );
}
