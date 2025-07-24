import { X } from 'lucide-react';

export default function NotificationDelete() {
  return (
    // Todo: 알림 삭제 API 연동
    <button
      type='button'
      onClick={(e) => {
        e.preventDefault(); // 기본 동작 방지
        e.stopPropagation(); // 이벤트 버블링 방지
        alert('알림 삭제');
      }}
      className='h-20 w-20 cursor-pointer text-gray-950'
    >
      <X className='h-13 w-13' />
    </button>
  );
}
