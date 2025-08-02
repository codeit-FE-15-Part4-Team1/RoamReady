'use client';
import Image from 'next/image';
import { useEffect } from 'react';

import { PopoverOpenEffect } from '@/domain/Notification/components/PopoverOpenEffect';
import { useInfiniteNotifications } from '@/domain/Notification/hooks/useInfiniteNotifications';
import type { Notification } from '@/domain/Notification/types/type';
import Popover from '@/shared/components/ui/popover';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useRoamReadyStore } from '@/shared/store';

import NotificationCard from './NotificationCard';

/**
 * Notification 컴포넌트
 *
 * Header에서 알림 아이콘을 클릭했을 때 팝오버 형태로 알림 리스트를 보여주는 기능을 제공합니다.
 * 반응형 디자인을 적용하여 모바일에서는 중앙 아래, 데스크탑에서는 우측 아래에 팝오버가 표시됩니다.
 *
 * @component
 * @example
 * return (
 *   <Notification />
 * )
 */
export default function Notification() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteNotifications();

  const isNewNotification = useRoamReadyStore(
    (state) => state.isNewNotification,
  );

  const hasNewNotification = useRoamReadyStore((s) => s.hasNewNotification);
  const setHasNewNotification = useRoamReadyStore(
    (s) => s.setHasNewNotification,
  );

  useEffect(() => {
    if (!data) return;

    const ids = data.pages.flatMap((page) =>
      page.notifications.map((n) => n.id),
    );

    const result = isNewNotification(ids);
    if (hasNewNotification !== result) {
      setHasNewNotification(result);
    }
  }, [data, isNewNotification, hasNewNotification, setHasNewNotification]);

  useEffect(() => {
    if (!data) return;
    const ids = data.pages.flatMap((page) =>
      page.notifications.map((n) => n.id),
    );
    setHasNewNotification(isNewNotification(ids));
  }, [data, isNewNotification]);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Image
          src={hasNewNotification ? '/icons/bell-dot.svg' : '/icons/bell.svg'}
          alt='알림 아이콘'
          width={24}
          height={24}
        />
      </Popover.Trigger>
      <Popover.Content
        position={isMobile ? 'bottom-center' : 'bottom-end'}
        className='scrollbar-none max-h-320 rounded-3xl border-none p-0 shadow-[0_4px_20px_rgba(0,0,0,0.1)]'
      >
        <PopoverOpenEffect data={data} />
        <NotificationCard
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          notification={data}
        />
      </Popover.Content>
    </Popover.Root>
  );
}
