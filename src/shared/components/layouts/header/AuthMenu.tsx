import { useRouter } from 'next/navigation';

import { useSignoutMutation } from '@/domain/Auth/hooks/useSignoutMutation';
import Notification from '@/domain/Notification/components/Notification';
import Avatar from '@/shared/components/ui/avatar';
import Dropdown from '@/shared/components/ui/dropdown';
import { ROUTES } from '@/shared/constants/routes';
import { useRoamReadyStore } from '@/shared/store';

/**
 * AuthMenu 컴포넌트 입니다.
 *
 * 로그인된 사용자를 위한 메뉴 UI를 렌더링하는 컴포넌트입니다.
 * 알림 아이콘, 세로 구분선, 프로필 아바타, 유저 닉네임이 포함되어 있습니다.
 * (현재는 더미 데이터로 구성되어 있으며, 추후 유저 정보를 props로 받을 수 있도록 확장할 예정입니다.)
 *
 */

export default function AuthMenu() {
  const user = useRoamReadyStore((state) => state.user);
  const router = useRouter();
  // 새로 만든 useSignoutMutation 훅을 사용합니다.
  const { mutate: handleSignout, isPending } = useSignoutMutation();

  const onSignout = () => {
    if (isPending) return;
    handleSignout();
  };

  if (!user) {
    return null;
  }

  return (
    <div className='flex-center gap-20'>
      <Notification />
      <div className='flex-center gap-15'>
        {/* 세로 구분선 */}
        <div className='h-20 w-1 self-center bg-gray-100' />

        {/* 프로필 아바타*/}
        <Dropdown.Root>
          <Dropdown.Trigger>
            <div className='flex-center gap-15'>
              <Avatar profileImageUrl={user.profileImageUrl ?? ''} />
              {/* 유저 이름 */}
              <span className='tablet:inline font-size-14 hidden'>
                {user.nickname}
              </span>
            </div>
          </Dropdown.Trigger>
          <Dropdown.Menu menuClassName='top-40'>
            <Dropdown.Item onClick={onSignout}>로그아웃</Dropdown.Item>
            <Dropdown.Item onClick={() => router.push(ROUTES.MYPAGE.INFO)}>
              마이페이지
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Root>
      </div>
    </div>
  );
}
