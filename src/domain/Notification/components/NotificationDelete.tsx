import { X } from 'lucide-react';

/**
 * NotificationDelete 컴포넌트
 *
 * 개별 알림 항목을 삭제하는 버튼 컴포넌트입니다.
 * 현재는 실제 삭제 기능 대신 `alert`로 대체되어 있으며,
 * 이후 API 연동을 통해 알림 삭제 기능이 구현될 예정입니다.
 *
 * @returns JSX.Element 삭제 버튼
 *
 * @example
 * <NotificationDelete />
 */
export default function NotificationDelete() {
  return (
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
