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
    <section className='py-8 pb-12'>
      {/* 태블릿 이상: 기존 레이아웃 */}
      <div className='desktop:flex hidden items-center justify-between'>
        <CategorySelect value={category} onValueChange={onCategoryChange} />
        <SortSelect value={sort} onValueChange={onSortChange} />
      </div>

      {/* 태블릿 이하: Sort 고정, Category 스크롤 */}
      <div className='desktop:hidden flex items-center gap-16'>
        <SortSelect value={sort} onValueChange={onSortChange} />
        <div className='scrollbar-none flex-1 overflow-x-auto'>
          <CategorySelect value={category} onValueChange={onCategoryChange} />
        </div>
      </div>
    </section>
  );
}
