'use client';

import { ReactNode } from 'react';
import { cn } from '@/shared/libs/cn';

/**
 * Dialog 푸터 변형 타입
 * 각 변형에 따라 다른 스타일과 레이아웃이 적용됩니다.
 */
type DialogFooterVariant = 'complete' | 'cancel' | 'review';

/**
 * DialogFooter 컴포넌트의 Props 타입
 */
interface DialogFooterProps {
  /** 푸터 내부에 렌더링될 자식 요소들 (주로 버튼들) */
  children: ReactNode;
  /**
   * 푸터의 변형 타입
   * 각 변형에 따라 적절한 마진과 레이아웃이 적용됩니다.
   *
   * - 'complete': 완료/확인 대화상자용 푸터
   * - 'cancel': 취소/확인 대화상자용 푸터
   * - 'review': 리뷰/평가 대화상자용 푸터
   */
  variant: DialogFooterVariant;
}

/**
 * 변형별 푸터 스타일 매핑
 * 각 Dialog 타입에 맞는 적절한 상단 여백을 제공합니다.
 */
const FOOTER_VARIANT_STYLES: Record<DialogFooterVariant, string> = {
  complete: 'mt-[20px] md:mt-[24px]',
  cancel: 'mt-[20px] md:mt-[24px] flex gap-[12px]',
  review: 'mt-[20px] md:mt-[24px]',
};

/**
 * Dialog 푸터 컴포넌트
 *
 * Dialog 하단에 위치하여 액션 버튼들을 담는 컨테이너 역할을 합니다.
 * variant에 따라 적절한 스타일링과 레이아웃을 적용합니다.
 *
 * **주요 기능:**
 * - 변형별 적응형 스타일링
 * - 반응형 디자인 지원 (모바일/데스크톱)
 * - 버튼 그룹 레이아웃 관리
 *
 * **변형별 특징:**
 * - `complete`: 단일 확인 버튼용 레이아웃
 * - `cancel`: 취소/확인 버튼 2개용 플렉스 레이아웃 (gap 포함)
 * - `review`: 리뷰 제출 버튼용 레이아웃
 *
 * **스타일 특징:**
 * - 상단 여백: 모바일 20px, 데스크톱 24px
 * - cancel 변형: 버튼 간 12px 간격의 플렉스 레이아웃
 *
 * @param props - DialogFooter 컴포넌트의 props
 * @param props.children - 푸터 내부에 렌더링될 버튼들
 * @param props.variant - 푸터 변형 타입
 *
 * @example
 * ```tsx
 * // 완료 대화상자 푸터
 * <Dialog.Footer variant="complete">
 *   <button onClick={handleConfirm}>확인</button>
 * </Dialog.Footer>
 *
 * // 취소 확인 대화상자 푸터
 * <Dialog.Footer variant="cancel">
 *   <button onClick={handleCancel}>취소</button>
 *   <button onClick={handleConfirm}>확인</button>
 * </Dialog.Footer>
 *
 * // 리뷰 대화상자 푸터
 * <Dialog.Footer variant="review">
 *   <button onClick={handleSubmit}>리뷰 제출</button>
 * </Dialog.Footer>
 * ```
 */
export function DialogFooter({ children, variant }: DialogFooterProps) {
  const footerClassName = cn(FOOTER_VARIANT_STYLES[variant]);

  return <div className={footerClassName}>{children}</div>;
}
