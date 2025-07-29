'use client';

import { useShallow } from 'zustand/shallow';

import type { BoundState } from '@/shared/store';
import { useRoamReadyStore } from '@/shared/store';

import AuthMenu from './AuthMenu';
import GuestMenu from './GuestMenu';
import LogoLink from './LogoLink';

export default function Header() {
  const { user } = useRoamReadyStore(
    useShallow((state: BoundState) => ({
      user: state.user,
    })),
  );

  return (
    <header className='border-b border-gray-50'>
      <div className='tablet:px-32 desktop:px-40 mx-auto flex w-full max-w-1200 items-center justify-between px-24'>
        <LogoLink />
        <nav>{user ? <AuthMenu /> : <GuestMenu />}</nav>
      </div>
    </header>
  );
}
