'use client';

import { useEffect, useState } from 'react';

import Container from '@/app/_components/Container';
import type { User } from '@/shared/slices/userSlice';
import { useRoamReadyStore } from '@/shared/store';

import AuthMenu from './AuthMenu';
import GuestMenu from './GuestMenu';
import LogoLink from './LogoLink';

export default function Header() {
  const userFromStore = useRoamReadyStore((state) => state.user);
  const [user, setUser] = useState<User | null>(null);
  // const [isLogin] = useState(false);  이건 이제 안써도 될거 같은데 혹시 필요하면 얘기하세요. 필요하다면 zustand store에 별도로 isLogin 상태 추가해드릴게요.

  useEffect(() => {
    setUser(userFromStore);
  }, [userFromStore]);

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
