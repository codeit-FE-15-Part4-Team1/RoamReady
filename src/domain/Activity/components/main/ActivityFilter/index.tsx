import CategorySelect from '@/domain/Activity/components/main/ActivityFilter/CategorySelect';
import SortSelect from '@/domain/Activity/components/main/ActivityFilter/SortSelect';
import { GetActivitiesRequestQuery } from '@/domain/Activity/schemas/main';

type SortOption = NonNullable<GetActivitiesRequestQuery['sort']>;

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
      {/* 데스크톱: 기존 레이아웃 */}
      <div className='hidden items-center justify-between lg:flex'>
        <CategorySelect value={category} onValueChange={onCategoryChange} />
        <SortSelect value={sort} onValueChange={onSortChange} />
      </div>

      {/* 태블릿: Sort 고정, Category 스크롤 */}
      <div className='hidden items-center gap-16 md:flex lg:hidden'>
        <SortSelect value={sort} onValueChange={onSortChange} />
        <div className='scrollbar-none flex-1 overflow-x-auto'>
          <CategorySelect value={category} onValueChange={onCategoryChange} />
        </div>
      </div>

      {/* 모바일: 세로 배치 */}
      <div className='space-y-12 md:hidden'>
        <SortSelect value={sort} onValueChange={onSortChange} />
        <div className='scrollbar-none overflow-x-auto'>
          <CategorySelect value={category} onValueChange={onCategoryChange} />
        </div>
      </div>
    </section>
  );
}
