'use client';

import { createContext, useContext } from 'react';

interface ExperienceCardContextValue {
  variant?: 'reservation' | 'experience';
}

export const ExperienceCardContext =
  createContext<ExperienceCardContextValue | null>(null);

export const useExperienceCardContext = () => {
  const context = useContext(ExperienceCardContext);
  if (!context) {
    throw new Error(
      'ExperienceCard 컴포넌트는 ExperienceCard.Root 안에서 사용되어야 합니다.',
    );
  }
  return context;
};
