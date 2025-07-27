import { Calendar, Timer, X } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

import { getTimeAgo } from '@/domain/Activity/utils/getTimeAgo';
import { usePopover } from '@/shared/components/ui/popover/PopoverContext';

import { NotificationResponse } from '../types/type';
import NotificationDelete from './NotificationDelete';

/**
 * CloseButton 컴포넌트
 *
 * 알림 팝오버를 닫는 X 버튼입니다.
 * 팝오버 컨텍스트에서 `setIsOpen(false)`를 호출해 팝오버를 닫습니다.
 *
 */
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

/**
 * NotificationCard 컴포넌트
 *
 * 알림 데이터를 받아 화면에 리스트 형태로 렌더링하는 UI 컴포넌트입니다.
 * 알림은 최신순으로 정렬되며, 상태(승인/거절), 제목, 일정, 생성 시각 등을 표시합니다.
 * 알림 클릭 시 "/mypage/reservations"로 이동합니다.
 *
 * @param {NotificationResponse} props.notification - 알림 데이터 (총 개수 및 리스트 포함)
 *
 * @example
 * <NotificationCard notification={notification} />
 */
export default function NotificationCard({
  notification,
}: {
  notification: NotificationResponse;
}) {
  const content = notification.notifications;

  /**
   * 알림 리스트를 updatedAt 기준 내림차순 정렬
   */
  const sortedContent = useMemo(
    () =>
      [...content].sort(
        (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
      ),
    [content],
  );

  return (
    <div className='h-fit w-230 rounded-4xl bg-white'>
      {/* 상단 고정 헤더 영역 */}
      <div className='sticky top-0 z-10 w-full border-b border-gray-50 bg-white p-10'>
        <div className='flex w-full justify-between'>
          <h1 className='font-size-16 font-bold'>
            알림 {notification.totalCount}개
          </h1>
          <CloseButton />
        </div>
      </div>

      {/* 알림 리스트 */}
      <ul>
        {sortedContent.map((item) => {
          const time = getTimeAgo(item.updatedAt);

          // 알림 내용에서 상태(거절/승인) 판별
          const isRejected = item.content.includes('거절');
          const status = isRejected ? '거절' : '승인';

          // 알림 내용에서 체험 제목과 일정 추출
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

                    {/* 알림 삭제 버튼 */}
                    <NotificationDelete />
                  </div>

                  {/* 일정 정보 */}
                  <div className='flex items-center gap-3'>
                    <Calendar className='h-10 w-10 text-gray-950' />
                    <p className='font-size-12 text-gray-950'>{schedule}</p>
                  </div>

                  {/* 생성 시각 */}
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
