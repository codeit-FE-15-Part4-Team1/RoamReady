'use client';

import { useState } from 'react';

import AuthMenu from './AuthMenu';
import GuestMenu from './GuestMenu';
import LogoLink from './LogoLink';

export default function Header() {
  const [isLogin] = useState(false);

  return (
    <header className='border-b border-gray-50'>
      <div className='tablet:px-32 desktop:px-40 mx-auto flex w-full max-w-1200 items-center justify-between px-24'>
        <LogoLink />
        <div>{isLogin ? <AuthMenu /> : <GuestMenu />}</div>
      </div>
    </header>
  );
}
