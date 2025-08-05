'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StorybookRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/storybook/index.html');
  }, []);
  return null;
}
