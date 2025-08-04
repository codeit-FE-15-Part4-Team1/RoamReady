'use client';

import { useQueryClient } from '@tanstack/react-query';
import { EllipsisVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import DeleteModalContent from '@/domain/Activity/components/detail/activity-summary/DeleteModalContent';
import { useDeleteMyActivity } from '@/domain/Activity/hooks/detail/useDeleteMyActivity';
import { activitiesKeys } from '@/domain/Activity/libs/main/queryKeys';
import Button from '@/shared/components/Button';
import { Dialog } from '@/shared/components/ui/dialog';
import Dropdown from '@/shared/components/ui/dropdown';
import { useRoamReadyStore } from '@/shared/store';

interface ActivityDropdownProps {
  id: number;
  ownerId: number;
}

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
export default function ActivityDropdown({
  id,
  ownerId,
}: ActivityDropdownProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 전역 상태에서 현재 로그인한 사용자 정보 가져오기
  const user = useRoamReadyStore((state) => state.user);

  // 삭제 확인 모달 열림 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  // 삭제 요청 API 훅
  const deleteActivity = useDeleteMyActivity();

  // 로그인하지 않았거나, 작성자가 아닌 경우 드롭다운 미표시
  if (!user || user.id !== ownerId) return null;

  // 수정하기 버튼 클릭 시 해당 체험의 수정 페이지로 이동
  const handleEdit = () => {
    router.push(`/mypage/experiences/edit/${id}`);
  };

  // '삭제하기' 클릭 시 삭제 API 호출 후 성공하면 체험 목록 페이지로 이동
  const handleDelete = async () => {
    try {
      await deleteActivity(id);
      queryClient.invalidateQueries({ queryKey: activitiesKeys.all });
      queryClient.invalidateQueries({ queryKey: ['carousel-activities'] });
      router.push('/activities');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* 드롭다운 메뉴 트리거 및 메뉴 */}
      <Dropdown.Root>
        <Dropdown.Trigger>
          <EllipsisVertical size={20} />
        </Dropdown.Trigger>
        <Dropdown.Menu menuClassName='top-30'>
          <Dropdown.Item onClick={handleEdit}>수정하기</Dropdown.Item>

          <Dropdown.Item onClick={() => setIsOpen(true)}>
            삭제하기
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Root>

      {/* 삭제 확인 모달 */}
      {isOpen && (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Content variant='cancel'>
            <DeleteModalContent />
            <Dialog.Footer variant='cancel'>
              <Button
                onClick={() => setIsOpen(false)}
                className='tablet:font-size-16 font-size-14 flex-1 rounded-[8px] border-gray-50 bg-white px-16 py-12 font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-gray-100 aria-disabled:opacity-50 aria-disabled:hover:bg-gray-100'
              >
                취소하기
              </Button>
              <Button
                onClick={handleDelete}
                className='bg-red hover:bg-red/60 disabled:hover:bg-red aria-disabled:hover:bg-red rounded-8 font-size-14 flex-1 border-none px-16 py-12 font-medium text-white transition-colors disabled:opacity-50 aria-disabled:opacity-50 md:text-[16px]'
              >
                삭제하기
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </>
  );
}
