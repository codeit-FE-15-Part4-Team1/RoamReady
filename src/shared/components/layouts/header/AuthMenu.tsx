import Bell from '@/shared/components/icons/bell';

/**
 * AuthMenu 컴포넌트 입니다.
 *
 * 로그인된 사용자를 위한 메뉴 UI를 렌더링하는 컴포넌트입니다.
 * 알림 아이콘, 세로 구분선, 프로필 아바타, 유저 닉네임이 포함되어 있습니다.
 * (현재는 더미 데이터로 구성되어 있으며, 추후 유저 정보를 props로 받을 수 있도록 확장할 예정입니다.)
 *
 */
export default function AuthMenu() {
  return (
    <div className='flex items-center justify-center gap-20'>
      <Bell />
      <div className='flex items-center justify-center gap-15'>
        {/* 세로 구분선 */}
        <div className='h-20 w-1 self-center bg-gray-100' />

        {/* 프로필 아바타*/}
        <div className='h-30 w-30 rounded-full bg-black' />

        {/* 유저 이름 */}
        <span className='font-size-14'>닉네임</span>
      </div>
    </div>
  );
}
