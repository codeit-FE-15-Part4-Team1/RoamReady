'use client';

import { useEffect } from 'react';

import { useInfiniteNotifications } from '@/domain/Notification/hooks/useInfiniteNotifications';
import { usePopover } from '@/shared/components/ui/popover/PopoverContext';

/**
 * Popover가 열렸을 때 readNotifications를 localStorage에 저장
 */
export function PopoverOpenEffect({
  data,
  setHasNewNotification,
}: {
  data: ReturnType<typeof useInfiniteNotifications>['data'];
  setHasNewNotification: (val: boolean) => void;
}) {
  const { isOpen } = usePopover();

  useEffect(() => {
    if (isOpen && data) {
      const currentIds = data.pages.flatMap((page) =>
        page.notifications.map((n) => n.id),
      );

      try {
        const storedIds = localStorage.getItem('readNotifications');
        const existingIds = storedIds ? JSON.parse(storedIds) : [];

        // 새로운 ID가 있는 경우에만 업데이트
        const hasNewIds = currentIds.some((id) => !existingIds.includes(id));
        if (hasNewIds) {
          const mergedIds = [...new Set([...existingIds, ...currentIds])];
          localStorage.setItem('readNotifications', JSON.stringify(mergedIds));
          setHasNewNotification(false);
        }
      } catch (error) {
        console.warn('localStorage 업데이트 실패:', error);
      }
    }
  }, [isOpen, data, setHasNewNotification]);

  return null;
}
