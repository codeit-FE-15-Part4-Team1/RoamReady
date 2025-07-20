'use client';

import { motion } from 'motion/react';

import { useBottomSheet } from './BottomSheetContext';

/**
 * BottomSheet 뒤의 어두운 배경 오버레이 및 인터랙션 처리
 *
 * **애니메이션:**
 * - 등장: opacity 0 → 1로 페이드 인
 * - 퇴장: opacity 1 → 0로 페이드 아웃
 * - spring 애니메이션으로 자연스러운 전환 (stiffness: 500, damping: 50)
 *
 * **사용자 인터랙션:**
 * - 오버레이 클릭 시 BottomSheet 닫기
 * - 터치/마우스 이벤트 모두 대응
 *
 * **레이어링:**
 * - z-index: 40 (BottomSheet 컨텐츠의 z-50보다 낮음)
 * - fixed inset-0으로 화면 전체 덮기
 * - bg-black/60으로 60% 투명도의 검은 오버레이
 */
export function BottomSheetOverlay() {
  const { onOpenChange } = useBottomSheet();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 50,
        duration: 0.2,
      }}
      className='fixed inset-0 z-40 bg-black/60'
      onClick={() => onOpenChange(false)}
    />
  );
}
