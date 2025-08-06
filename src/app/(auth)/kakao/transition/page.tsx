'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const KakaoTransition = dynamic(
  () => import('@/domain/Auth/components/KakaoTransition'),
  { ssr: false }, // 클라이언트 전용 렌더링
);

export default function Page() {
  return (
    <Suspense fallback={null}>
      <KakaoTransition />
    </Suspense>
  );
}
