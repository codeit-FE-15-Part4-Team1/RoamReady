'use client';

import { EllipsisVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Dropdown from '@/shared/components/ui/dropdown';

export default function ActivityDropdown({ id }: { id: number }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/mypage/experiences/edit/${id}`);
  };

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <EllipsisVertical size={20} />
      </Dropdown.Trigger>
      <Dropdown.Menu menuClassName='top-30'>
        <Dropdown.Item onClick={handleEdit}>수정하기</Dropdown.Item>
        <Dropdown.Item onClick={() => alert('삭제하기')}>
          삭제하기
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Root>
  );
}
