import { Calendar, Timer, X } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

import { getTimeAgo } from '@/domain/Activity/utils/getTimeAgo';
import { usePopover } from '@/shared/components/ui/popover/PopoverContext';

import { NotificationResponse } from '../types/type';
import NotificationDelete from './NotificationDelete';

const CloseButton = () => {
  const { setIsOpen } = usePopover();

  return (
    <button
      className='h-24 w-24'
      type='button'
      onClick={() => setIsOpen(false)}
    >
      <X className='h-18 w-18 cursor-pointer' />
    </button>
  );
};
export default function NotificationCard({
  notification,
}: {
  notification: NotificationResponse;
}) {
  const content = notification.notifications;

  const sortedContent = useMemo(
    () =>
      [...content].sort(
        (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
      ),
    [content],
  );

  return (
    <div className='h-fit w-230 rounded-4xl bg-white'>
      <div className='sticky top-0 z-10 w-full border-b border-gray-50 bg-white p-10'>
        <div className='flex w-full justify-between'>
          <h1 className='font-size-16 font-bold'>
            알림 {notification.totalCount}개
          </h1>
          <CloseButton />
        </div>
      </div>

      <ul>
        {sortedContent.map((item) => {
          const time = getTimeAgo(item.updatedAt);

          // 상태와 투어 정보 추출
          const isRejected = item.content.includes('거절');
          const status = isRejected ? '거절' : '승인';

          const titleMatch = item.content.match(
            /(.+)\((\d{4}-\d{2}-\d{2} \d{2}:\d{2}~\d{2}:\d{2})\)/,
          );
          const title = titleMatch?.[1] ?? '알 수 없음';
          const schedule = titleMatch?.[2] ?? '';

          return (
            <li
              key={item.id}
              className={`cursor-pointer p-3 ${
                isRejected
                  ? 'text-red hover:bg-red-50'
                  : 'text-brand-2 hover:bg-brand-1'
              }`}
            >
              <Link href='/mypage/reservations'>
                <div className='space-y-5 p-7'>
                  <div className='flex justify-between'>
                    <h2 className='font-size-14 flex gap-5 font-bold'>
                      [{status}] <span className='text-gray-950'>{title}</span>
                    </h2>

                    <NotificationDelete />
                  </div>

                  <div className='flex items-center gap-3'>
                    <Calendar className='h-10 w-10 text-gray-950' />
                    <p className='font-size-12 text-gray-950'>{schedule}</p>
                  </div>

                  <div className='flex items-center gap-3'>
                    <Timer className='h-10 w-10 text-gray-400' />
                    <span className='text-size-12 mt-1 block text-gray-400'>
                      {time}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
