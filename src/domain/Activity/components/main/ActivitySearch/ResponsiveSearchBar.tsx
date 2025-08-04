'use client';
import MobileActivitySearchBar from '@/domain/Activity/components/main/ActivitySearch/MobileActivitySearchBar';

import ActivitySearchBar from './ActivitySearchBar';

export default function ResponsiveSearchBar() {
  return (
    <>
      <div className='tablet:hidden w-full'>
        <MobileActivitySearchBar />
      </div>
      <div className='tablet:flex hidden'>
        <ActivitySearchBar />
      </div>
    </>
  );
}
