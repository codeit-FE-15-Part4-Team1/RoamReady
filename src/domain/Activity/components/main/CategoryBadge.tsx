import { Activity } from '@/domain/Activity/schemas/main/activity';

interface CategoryBadgeProps {
  activity: Activity;
}
export default function CategoryBadge({ activity }: CategoryBadgeProps) {
  const category = activity.category;

  return (
    <span className='font-size-14 rounded-3xl bg-gray-800/40 px-8 py-2 font-semibold text-white backdrop-blur-xs select-none'>
      {category}
    </span>
  );
}
