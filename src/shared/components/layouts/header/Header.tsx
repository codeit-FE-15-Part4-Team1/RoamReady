'use client';

import { useState } from 'react';

import Container from '@/app/_components/Container';

import AuthMenu from './AuthMenu';
import GuestMenu from './GuestMenu';
import LogoLink from './LogoLink';

export default function Header() {
  const [isLogin] = useState(false);

  return (
    <header className='border-b border-gray-50 bg-white/30 backdrop-blur-xl'>
      <Container>
        <div className='flex items-center justify-between'>
          <LogoLink />
          <div>{isLogin ? <AuthMenu /> : <GuestMenu />}</div>
        </div>
      </Container>
    </header>
  );
}
