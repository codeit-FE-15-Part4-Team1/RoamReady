'use client';

import { useShallow } from 'zustand/react/shallow';

import Container from '@/app/_components/Container';
import { BoundState, useRoamReadyStore } from '@/shared/store';

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
