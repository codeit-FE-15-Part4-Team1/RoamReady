'use client';

import { GetActivitiesRequestQuery } from '@/domain/Activity/schemas/main';
import { cn } from '@/shared/libs/cn';

const categories: NonNullable<GetActivitiesRequestQuery['category']>[] = [
  '문화 · 예술',
  '식음료',
  '스포츠',
  '투어',
  '관광',
  '웰빙',
];

interface CategorySelectProps {
  value?: GetActivitiesRequestQuery['category'] | null;
  onValueChange: (
    category: GetActivitiesRequestQuery['category'] | undefined,
  ) => void;
}

interface CategoryButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function CategoryButton({ label, isSelected, onClick }: CategoryButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'font-size-15 shrink-0 cursor-pointer rounded-full border border-gray-100 bg-white px-12 py-6 whitespace-nowrap text-gray-800 transition duration-100 hover:border-gray-800 active:scale-90',
        isSelected ? 'ring-2 ring-gray-800' : 'ring-0',
      )}
    >
      {label}
    </button>
  );
}

export default function CategorySelect({
  value,
  onValueChange,
}: CategorySelectProps) {
  return (
    <div className='desktop:px-0 flex min-w-fit gap-8 px-4 py-12'>
      <CategoryButton
        label='전체'
        isSelected={value === undefined || value === null}
        onClick={() => onValueChange(undefined)}
      />
      {categories.map((cat) => (
        <CategoryButton
          key={cat}
          label={cat}
          isSelected={value === cat}
          onClick={() => onValueChange(cat)}
        />
      ))}
    </div>
  );
}
