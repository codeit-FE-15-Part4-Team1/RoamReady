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
      localStorage.setItem('readNotifications', JSON.stringify(currentIds));
      setHasNewNotification(false);
    }
  }, [isOpen, data]);

  return null;
}
