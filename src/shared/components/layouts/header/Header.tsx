'use client';

import Container from '@/app/_components/Container';
import type { User } from '@/domain/Auth/schemas/response';

import AuthMenu from './AuthMenu';
import GuestMenu from './GuestMenu';
import LogoLink from './LogoLink';

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  //! Header.tsx: 이제 user를 prop으로 받으므로, 내부에서 useUser 훅을 호출할 필요가 없습니다.
  // 서버에서 받은 user 객체의 존재 여부로 로그인 상태를 바로 렌더링할 수 있습니다.
  // const { user } = useRoamReadyStore(
  //   useShallow((state: BoundState) => ({
  //     user: state.user,
  //   })),
  // );

  return (
    <header className='sticky top-0 z-40 border-b border-gray-50 bg-white/90 backdrop-blur-xs'>
      <Container>
        <div className='flex items-center justify-between'>
          <LogoLink />
          <nav>{user ? <AuthMenu user={user} /> : <GuestMenu />}</nav>
        </div>
      </Container>
    </header>
  );
}
