import { SortOption } from '@/domain/Activity/components/main/ActivitySection';
import CategorySelect from '@/domain/Activity/components/main/CategorySelect';
import SortSelect from '@/domain/Activity/components/main/SortSelect';
import { GetActivitiesRequestQuery } from '@/domain/Activity/schemas/main/activity';

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
