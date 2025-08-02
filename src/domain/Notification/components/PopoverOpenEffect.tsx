'use client';

import { useEffect } from 'react';

import { useInfiniteNotifications } from '@/domain/Notification/hooks/useInfiniteNotifications';
import { usePopover } from '@/shared/components/ui/popover/PopoverContext';
import { useRoamReadyStore } from '@/shared/store';

/**
 * Popover가 열렸을 때 readNotifications를 localStorage에 저장
 */
export function PopoverOpenEffect({
  data,
}: {
  data: ReturnType<typeof useInfiniteNotifications>['data'];
}) {
  const { isOpen } = usePopover();
  const markAsRead = useRoamReadyStore((s) => s.markAsRead);
  const isNewNotification = useRoamReadyStore((s) => s.isNewNotification);
  const setHasNewNotification = useRoamReadyStore(
    (s) => s.setHasNewNotification,
  );

  useEffect(() => {
    if (isOpen && data) {
      const ids = data.pages.flatMap((page) =>
        page.notifications.map((n) => n.id),
      );
      if (isNewNotification(ids)) {
        markAsRead(ids);
        setHasNewNotification(false);
      }
    }
  }, [isOpen, data, isNewNotification, markAsRead, setHasNewNotification]);

  return null;
}
