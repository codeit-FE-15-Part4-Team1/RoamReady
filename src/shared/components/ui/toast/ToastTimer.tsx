import { useEffect, useState } from 'react';

import { cn } from '@/shared/libs/cn';

/**
 * @description 토스트 자동 제거 타이머에 필요한 props입니다.
 *
 * - `duration`: 토스트가 유지될 시간 (밀리초 단위)
 * - `isVisible` : 토스트가 현재 보이는지 여부 (사라지는 애니메이션 중인지)
 * - `color`: 진행 바(progress bar)에 적용할 색상 (토스트 유형에 따라 달라짐)
 */
export interface ToastTimerProps {
  duration: number;
  isVisible: boolean;
  color: string;
}

/**
 * @description
 * 토스트 알림 하단에 표시되는 진행 바(progress bar) UI 컴포넌트입니다.
 *
 * @feature
 * - 주어진 `duration` 동안 진행률을 100%에서 0%로 시각적으로 감소시킵니다.
 * - 부모 컴포넌트의 `isVisible` 상태가 `true`일 때 애니메이션이 시작됩니다.
 * - `requestAnimationFrame`을 사용하여 브라우저 렌더링에 최적화된 부드러운 애니메이션을 제공합니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {number} props.duration - 진행 바가 100%에서 0%까지 감소하는 총시간 (밀리초)
 * @param {boolean} props.isVisible - 토스트가 화면에 보이는지 여부. `true`일 때 타이머 애니메이션이 시작됩니다.
 * @param {string} props.color - 진행 바에 적용할 Tailwind CSS 배경색 클래스 (예: 'bg-green-500')
 */
const ToastTimer = ({ duration, isVisible, color }: ToastTimerProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    let frameId: number;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      const nextProgress = (remaining / duration) * 100;

      setProgress(nextProgress);

      if (remaining > 0) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isVisible, duration]);

  return (
    <div className='absolute bottom-0 left-0 h-3 w-full bg-gray-300'>
      <div className={cn('h-full', color)} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ToastTimer;
