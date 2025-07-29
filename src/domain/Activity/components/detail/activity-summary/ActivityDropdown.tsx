'use client';

import { EllipsisVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Dropdown from '@/shared/components/ui/dropdown';

/**
 * ActivityDropdown
 * 본인이 작성한 체험에서 보이는 옵션 드롭다운 메뉴로, 페험 수정 및 삭제 기능을 제공합니다.
 *
 * @param id - 현재 체험(액티비티)의 고유 ID로, 수정 페이지 이동 시 사용됩니다.
 * @returns 수정 및 삭제 버튼이 포함된 드롭다운 UI 컴포넌트
 *
 * @example
 * <ActivityDropdown id={3} />
 */
export default function ActivityDropdown({ id }: { id: number }) {
  const router = useRouter();

  // 수정하기 버튼 클릭 시 해당 체험의 수정 페이지로 이동
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

        {/* Todo: 삭제하기 클릭시 삭제 모달 렌더링 및 삭제 API 연동 */}
        <Dropdown.Item onClick={() => alert('삭제하기')}>
          삭제하기
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Root>
  );
}
