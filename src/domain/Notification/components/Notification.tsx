import Image from 'next/image';

import Popover from '@/shared/components/ui/popover';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

import { notification } from '../mock/mock';
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

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Image src='/icons/bell.svg' alt='알림 아이콘' width={24} height={24} />
      </Popover.Trigger>
      <Popover.Content
        position={isMobile ? 'bottom-center' : 'bottom-end'}
        className='scrollbar-none max-h-320 rounded-3xl border-none p-0 shadow-[0_4px_20px_rgba(0,0,0,0.1)]'
      >
        <NotificationCard notification={notification} />
      </Popover.Content>
    </Popover.Root>
  );
}
