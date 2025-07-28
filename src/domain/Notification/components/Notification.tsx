'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { PopoverOpenEffect } from '@/domain/Notification/components/PopoverOpenEffect';
import { useInfiniteNotifications } from '@/domain/Notification/hooks/useInfiniteNotifications';
import type { Notification } from '@/domain/Notification/types/type';
import Popover from '@/shared/components/ui/popover';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

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

  const [hasNewNotification, setHasNewNotification] = useState(false);
  const hasSavedOnce = useRef(false);

  // 알림 데이터 처음 받아왔을 때 localStorage에 저장 (최초 1회만)
  useEffect(() => {
    if (!data || hasSavedOnce.current) return;

    const allIds = data.pages.flatMap((page) =>
      page.notifications.map((n) => n.id),
    );
    localStorage.setItem('readNotifications', JSON.stringify(allIds));
    hasSavedOnce.current = true;
  }, [data]);

  // polling 될 때마다 localStorage와 비교해서 새로운 알림 여부 체크
  useEffect(() => {
    if (!data) return;

    const currentIds = data.pages.flatMap((page) =>
      page.notifications.map((n) => n.id),
    );

    const storedRaw = localStorage.getItem('readNotifications');
    const storedIds: number[] = storedRaw ? JSON.parse(storedRaw) : [];

    const newIds = currentIds.filter((id) => !storedIds.includes(id));
    setHasNewNotification(newIds.length > 0);
  }, [data]);

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
        <PopoverOpenEffect
          data={data}
          setHasNewNotification={setHasNewNotification}
        />
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
