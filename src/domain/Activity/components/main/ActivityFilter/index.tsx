import CategorySelect from '@/domain/Activity/components/main/ActivityFilter/CategorySelect';
import SortSelect from '@/domain/Activity/components/main/ActivityFilter/SortSelect';
import { SortOption } from '@/domain/Activity/components/main/ActivitySection/ActivitySection';
import { GetActivitiesRequestQuery } from '@/domain/Activity/schemas/main';

interface ActivityFilterProps {
  category: GetActivitiesRequestQuery['category'];
  sort: SortOption;
  onCategoryChange: (category: GetActivitiesRequestQuery['category']) => void;
  onSortChange: (sort: SortOption) => void;
}

export default function ActivityFilter({
  category,
  sort,
  onCategoryChange,
  onSortChange,
}: ActivityFilterProps) {
  return (
    <section className='flex items-center justify-between py-8 pb-12'>
      <CategorySelect value={category} onValueChange={onCategoryChange} />
      <SortSelect value={sort} onValueChange={onSortChange} />
    </section>
  );
}
