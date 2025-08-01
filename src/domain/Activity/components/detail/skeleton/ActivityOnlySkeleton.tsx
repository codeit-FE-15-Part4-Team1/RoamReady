import ActivityDescriptionSkeleton from '@/domain/Activity/components/detail/skeleton/ActivityDescriptionSkeleton';
import ActivityImgSkeleton from '@/domain/Activity/components/detail/skeleton/ActivityImgSkeleton';
import KaKaoSkeleton from '@/domain/Activity/components/detail/skeleton/KaKaoSkeleton';

export default function ActivityOnlySkeleton() {
  return (
    <div className='flex flex-col gap-30'>
      <ActivityImgSkeleton />
      <ActivityDescriptionSkeleton />
      <KaKaoSkeleton />
    </div>
  );
}
