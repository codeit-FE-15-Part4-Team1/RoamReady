import Image from 'next/image';

import Popover from '@/shared/components/ui/popover';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

import { notification } from '../mock/mock';
import NotificationCard from './NotificationCard';

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
