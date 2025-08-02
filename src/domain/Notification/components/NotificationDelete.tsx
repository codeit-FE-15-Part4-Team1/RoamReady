'use client';
import { X } from 'lucide-react';
import { MouseEvent } from 'react';

import { useDeleteNotification } from '@/domain/Notification/hooks/useDeleteNotification';
import { useRoamReadyStore } from '@/shared/store';

/**
 * NotificationDelete 컴포넌트
 *
 * 개별 알림 항목을 삭제하는 버튼 컴포넌트입니다.
 * 현재는 실제 삭제 기능 대신 `alert`로 대체되어 있으며,
 * 이후 API 연동을 통해 알림 삭제 기능이 구현될 예정입니다.
 *
 * @returns JSX.Element 삭제 버튼
 *
 * @example
 * <NotificationDelete />
 */
export default function NotificationDelete({ id }: { id: number }) {
  const { mutate: deleteNotification } = useDeleteNotification();
  const { removeReadId } = useRoamReadyStore();

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    console.log('삭제 버튼 클릭');
    e.preventDefault();
    e.stopPropagation();
    deleteNotification(id);

    removeReadId(id); // 알림 Id 제거
  };

  return (
    <button
      type='button'
      onClick={handleDelete}
      aria-label='알림 삭제'
      className='h-20 w-20 cursor-pointer text-gray-950'
    >
      <X className='h-13 w-13' />
    </button>
  );
}
