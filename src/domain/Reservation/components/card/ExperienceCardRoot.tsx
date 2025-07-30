'use client';

import { ReactNode } from 'react';

import { ExperienceCardContext } from './ExperienceCardContext';

interface ExperienceCardRootProps {
  children: ReactNode;
  variant?: 'reservation' | 'experience';
}

/**
 * ExperienceCard의 루트 컴포넌트
 * 카드의 전체 래퍼와 Context를 제공합니다.
 */
export default function ExperienceCardRoot({
  children,
  variant = 'reservation',
}: ExperienceCardRootProps) {
  return (
    <ExperienceCardContext.Provider value={{ variant }}>
      {children}
    </ExperienceCardContext.Provider>
  );
}
