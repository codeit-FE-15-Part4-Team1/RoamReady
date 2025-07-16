'use client';

import { AnimatePresence, motion } from 'motion/react';
import {
  Children,
  isValidElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { useScrollLock } from '@/shared/hooks/useScrollLock';

import { useBottomSheet } from './BottomSheetContext';
import { BottomSheetOverlay } from './BottomSheetOverlay';
import { BottomSheetPortal } from './BottomSheetPortal';

// 다중 스텝 슬라이드 애니메이션 variants
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

interface BottomSheetContentProps {
  /** 렌더링할 자식 컴포넌트들 */
  children: ReactNode;
  /** 다중 스텝 모드 활성화 (Step 컴포넌트들을 개별 스텝으로 처리) */
  hasMultiStep?: boolean;
}

/**
 * BottomSheet의 메인 컨텐츠 렌더링 및 인터랙션 처리
 *
 * **렌더링 모드:**
 * - `hasMultiStep=false`: `children`을 직접 렌더링
 * - `hasMultiStep=true`: `children`을 배열로 변환 후 `currentStep` 인덱스로 선택
 *
 * **드래그 인터랙션:**
 * - Y축 드래그로 닫기 지원 (30px 이상 또는 200px/s 이상 속도)
 * - dragConstraints로 드래그 범위 제한
 * - dragElastic으로 경계에서 탄성 효과
 *
 * **애니메이션:**
 * - 슬라이드 업/다운: `spring` 애니메이션으로 부드러운 등장/퇴장
 * - 스텝 전환: 좌우 슬라이드 + 페이드로 방향성 표현
 * - `direction` 계산으로 전진/후진 애니메이션 구분
 */
export function BottomSheetContent({
  children,
  hasMultiStep = false,
}: BottomSheetContentProps) {
  const { isOpen, currentStep, setTotalSteps, onOpenChange } = useBottomSheet();

  // BottomSheet의 열림 상태(`isOpen`)에 따라 스크롤 락을 적용합니다.
  useScrollLock(isOpen);

  // 유효한 자식 컴포넌트들만 필터링 (useMemo로 최적화)
  const childrenArray = useMemo(
    () => Children.toArray(children).filter(isValidElement),
    [children],
  );

  const stepCount = hasMultiStep ? childrenArray.length : 0;
  const prevStepRef = useRef(currentStep);
  // 스텝 이동 방향 계산 (애니메이션 방향 결정용)
  const direction = currentStep > prevStepRef.current ? 1 : -1;

  // Content 마운트 시 총 스텝 수를 Root에 알림
  useEffect(() => {
    setTotalSteps(stepCount);
  }, [stepCount, setTotalSteps]);

  // 스텝 변경 시 이전 스텝 레퍼런스 업데이트
  useEffect(() => {
    prevStepRef.current = currentStep;
  }, [currentStep]);

  return (
    <BottomSheetPortal>
      <AnimatePresence mode='wait'>
        {isOpen && (
          <>
            <BottomSheetOverlay />
            <div className='fixed right-0 bottom-0 left-0 z-50 flex justify-center'>
              <motion.div
                drag='y'
                onDragEnd={(_event, info) => {
                  // 드래그 거리나 속도 기준으로 닫기 판단
                  if (info.offset.y > 30 || info.velocity.y > 200) {
                    onOpenChange(false);
                  }
                }}
                dragConstraints={{ top: 0, bottom: 0.8 }}
                dragElastic={{ top: 0, bottom: 0.8 }}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 30,
                }}
                className='tablet:px-30 flex min-w-full flex-col overflow-hidden rounded-t-3xl bg-white p-24 shadow-lg'
              >
                {/* 드래그 핸들 */}
                <div className='mx-auto mb-30 h-2 w-50 shrink-0 rounded-full bg-gray-200' />
                {hasMultiStep ? (
                  // 다중 스텝: 현재 스텝만 렌더링 + 슬라이드 애니메이션
                  <AnimatePresence
                    initial={false}
                    custom={direction}
                    mode='popLayout'
                  >
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={variants}
                      initial='enter'
                      animate='center'
                      exit='exit'
                      transition={{
                        x: { type: 'spring', stiffness: 150, damping: 20 },
                      }}
                    >
                      {childrenArray[currentStep]}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  // 단일 모드: children 직접 렌더링
                  children
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </BottomSheetPortal>
  );
}
