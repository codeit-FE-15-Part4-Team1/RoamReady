'use client';

import { useState } from 'react';

import GestMenu from './GuestMenu';
import AuthMenu from './AuthMenu';
import Logo from '../ui/Logo';

export default function Header() {
  const [isLogin] = useState(true);

  return (
    <header className='border-b border-gray-50'>
      <div className='tablet:px-32 desktop:px-40 desktop:text-40 text-14 mx-auto flex w-full max-w-1200 items-center justify-between px-24'>
        <Logo />
        <div>{isLogin ? <AuthMenu /> : <GestMenu />}</div>
      </div>
    </header>
  );
}
