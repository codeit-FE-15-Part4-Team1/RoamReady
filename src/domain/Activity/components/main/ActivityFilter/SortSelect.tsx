'use client';

import { GetActivitiesRequestQuery } from '@/domain/Activity/schemas/main';
import Select from '@/shared/components/ui/select';

type sortOption = NonNullable<GetActivitiesRequestQuery['sort']>;

const sortOptions: sortOption[] = [
  'latest',
  'most_reviewed',
  'price_asc',
  'price_desc',
];

const labels: Record<sortOption, string> = {
  latest: '최신순',
  most_reviewed: '리뷰 많은 순',
  price_asc: '가격 낮은 순',
  price_desc: '가격 높은 순',
};

interface SortSelectProps {
  value?: sortOption;
  onValueChange: (sort: sortOption) => void;
}

export default function SortSelect({
  value = 'latest',
  onValueChange,
}: SortSelectProps) {
  const handleValueChange = (sortValue: string) => {
    onValueChange(sortValue as sortOption);
  };

  // TODO: Value에 값 반영되는 거 물어볼 것

  return (
    <Select.Root value={value} onValueChange={handleValueChange}>
      <Select.Trigger className='font-size-15 w-180 cursor-pointer rounded-full border border-gray-100 bg-white px-12 py-4 text-gray-800 transition duration-100 hover:border-gray-800 active:scale-90'>
        <Select.Value placeholder='정렬 기준 선택' />
      </Select.Trigger>
      <Select.Content className='font-size-15'>
        {sortOptions.map((option) => (
          <Select.Item key={option} value={option}>
            {labels[option]}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
