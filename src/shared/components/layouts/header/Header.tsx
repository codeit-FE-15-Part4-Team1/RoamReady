'use client';

import { useEffect, useState } from 'react';

import type { User } from '@/shared/slices/userSlice';
import { useRoamReadyStore } from '@/shared/store';

import AuthMenu from './AuthMenu';
import GuestMenu from './GuestMenu';
import LogoLink from './LogoLink';

export default function Header() {
  const userFromStore = useRoamReadyStore((state) => state.user);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(userFromStore);
  }, [userFromStore]);

  return (
    <header className='border-b border-gray-50'>
      <div className='tablet:px-32 desktop:px-40 mx-auto flex w-full max-w-1200 items-center justify-between px-24'>
        <LogoLink />
        <nav>{user ? <AuthMenu user={user} /> : <GuestMenu />}</nav>
      </div>
    </header>
  );
}
