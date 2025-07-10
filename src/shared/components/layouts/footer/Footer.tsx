import Image from 'next/image';
import { Github } from 'lucide-react';
import GitHubLogo from '../../../../../public/icons/github-logo';

export default function Footer() {
  return (
    <footer className='align-center desktop:px-150 tablet:px-50 flex h-auto w-full flex-col justify-center border-t border-gray-50 px-30 py-30'>
      <div className='flex justify-between'>
        <div className='flex flex-col gap-10'>
          <Image
            src='/logos/logo-2-black.svg'
            alt='RoamReady 로고'
            width={70}
            height={70}
          />
          <div className='flex flex-col gap-3'>
            <span className='text-gray-800'>
              Start your journey with RoamReady
            </span>
            <span className='text-gray-300'>©2025.07</span>
          </div>
        </div>
        <div className='flex flex-col items-end gap-10'>
          <a
            aria-label='GitHub repository'
            href='https://github.com/codeit-FE-15-Part4-Team1/RoamReady'
            rel='noopener noreferrer'
            target='_blank'
          >
            <GitHubLogo />
          </a>
          <p>김서연 | 박재현 | 송시은 | 유용민</p>
        </div>
      </div>
    </footer>
  );
}
