'use client';

import Select from '@/shared/components/ui/select';

import type { Activity } from '../../types/reservation';

export default function ReservationSelect({
  activities,
  selectedId,
  onSelect,
}: {
  activities: Activity[];
  selectedId: number;
  onSelect: (id: number) => void;
}) {
  // 빈 배열이거나 selectedId가 0인 경우 처리
  if (!activities || activities.length === 0) {
    return (
      <div className='text-sm text-gray-500'>사용 가능한 체험이 없습니다.</div>
    );
  }

  const selectedActivity = activities.find(
    (activity) => activity.id === selectedId,
  );

  const handleValueChange = (title: string) => {
    const selected = activities.find((activity) => activity.title === title);
    if (selected) {
      onSelect(selected.id); // id를 외부로 넘김
    }
  };

  return (
    <Select.Root
      value={selectedActivity?.title ?? ''}
      onValueChange={handleValueChange}
    >
      <Select.Trigger>
        <Select.Value placeholder='체험을 선택해주세요' />
      </Select.Trigger>
      <Select.Content>
        {activities.map((activity) => (
          <Select.Item
            key={activity.id}
            value={activity.title}
            // 접근성을 위한 추가 속성
            aria-label={`체험 ${activity.title} 선택`}
          >
            {activity.title}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
