'use client';

import {
  ButtonHTMLAttributes,
  Children,
  cloneElement,
  isValidElement,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';

import { cn } from '@/shared/libs/cn';

import { LoadingSpinner } from '../loading-spinner';
import { useDialogContext } from './DialogRoot';

/**
 * Dialog Footer variant 타입
 * 각 variant에 따라 다른 스타일과 레이아웃이 적용됩니다.
 */
type DialogFooterVariant = 'complete' | 'cancel' | 'review';

/**
 * 버튼 onClick 핸들러 타입
 * 동기/비동기 모두 지원
 */
type ButtonClickHandler = (
  event: MouseEvent<HTMLButtonElement>,
) => void | Promise<void>;

/**
 * DialogFooter 컴포넌트의 Props 타입
 */
interface DialogFooterProps {
  /** Footer 내부에 렌더링될 자식 요소들  */
  children: ReactNode;
  /**
   * Footer의 variant 타입
   * 각 variant에 따라 적절한 마진과 레이아웃이 적용됩니다.
   *
   * - 'complete': 완료/확인 대화상자용 Footer
   * - 'cancel': 취소/확인 대화상자용 Footer
   * - 'review': 리뷰/평가 대화상자용 Footer
   */
  variant: DialogFooterVariant;
}

/**
 * variant별 Footer 스타일 매핑
 * 각 Dialog 타입에 맞는 적절한 상단 여백을 제공합니다.
 */
const FOOTER_VARIANT_STYLES: Record<DialogFooterVariant, string> = {
  complete: 'mt-20 md:mt-24',
  cancel: 'mt-20 md:mt-24 flex gap-12',
  review: 'mt-20 md:mt-24',
};

/**
 * Dialog Footer 컴포넌트
 *
 * Dialog 하단에 위치하여 액션 버튼들을 담는 컨테이너 역할을 합니다.
 * variant에 따라 적절한 스타일링과 레이아웃을 적용합니다.
 *
 * **주요 기능:**
 * - variant별 버튼 그룹 레이아웃 관리
 * - 반응형 디자인
 * - 자동 Promise 처리 (비동기 작업 지원)
 * - 로딩 상태 관리 및 에러 처리
 * - 성공시 자동 Dialog 닫기
 * - 로딩 중 스피너 표시
 *
 * **비동기 작업 처리:**
 * - 버튼 onClick이 Promise를 반환하면 자동으로 대기
 * - 로딩 중 버튼 비활성화 및 스피너 표시
 * - 성공시 자동으로 Dialog 닫기
 * - 실패시 에러 메시지 표시 및 Dialog 유지
 *
 * **variant별 특징:**
 * - `complete`: 단일 확인 버튼용 레이아웃
 * - `cancel`: 취소/확인 버튼 2개용 플렉스 레이아웃 (gap 포함)
 * - `review`: 리뷰 제출 버튼용 레이아웃
 *
 * **스타일 특징:**
 * - 상단 여백: 모바일 20px, 데스크톱 24px
 * - cancel variant: 버튼 간 12px 간격의 플렉스 레이아웃
 *
 * @param children - Footer 내부에 렌더링될 버튼들
 * @param variant - Footer variant 타입
 *
 * @example
 * ```tsx
 * // 완료 대화상자 Footer
 * <Dialog.Footer variant="complete">
 *   <button onClick={async () => await saveData()}>확인</button>
 * </Dialog.Footer>
 *
 * // 취소 확인 대화상자 Footer
 * <Dialog.Footer variant="cancel">
 *   <button onClick={() => console.log('취소')}>취소</button>
 *   <button onClick={async () => await deleteAccount()}>확인</button>
 * </Dialog.Footer>
 *
 * // 리뷰 대화상자 Footer
 * <Dialog.Footer variant="review">
 *   <button onClick={async () => await submitReview()}>리뷰 제출</button>
 * </Dialog.Footer>
 * ```
 */
export function DialogFooter({ children, variant }: DialogFooterProps) {
  const {
    close,
    loading,
    loadingButtonIndex,
    setLoading,
    setLoadingButtonIndex,
  } = useDialogContext();
  const footerClassName = cn(FOOTER_VARIANT_STYLES[variant]);

  /**
   * 버튼의 onClick 핸들러를 감싸서 Promise 처리 및 자동 Dialog 닫기
   * @param buttonIndex - 버튼의 인덱스
   * @param originalOnClick - 원래 onClick 핸들러
   * @returns 감싸진 onClick 핸들러
   */
  const wrapButtonClick = (
    buttonIndex: number,
    originalOnClick?: ButtonClickHandler,
  ): ButtonClickHandler => {
    return async (event: MouseEvent<HTMLButtonElement>) => {
      try {
        // originalOnClick이 있으면 실행
        if (originalOnClick) {
          setLoading(true);
          setLoadingButtonIndex(buttonIndex);

          // 원래 onClick 함수 실행
          const result = originalOnClick(event);

          // Promise인지 확인하고 대기
          if (result && typeof result.then === 'function') {
            await result;
          }
        }

        // 성공시 자동으로 Dialog 닫기 (핸들러가 없어도 닫힘)
        close();
      } catch (error: unknown) {
        // 실패시 에러 로깅, Dialog는 열어둠
        console.error('Dialog 작업 오류:', error);
      } finally {
        setLoading(false);
        setLoadingButtonIndex(-1);
      }
    };
  };

  /**
   * 버튼 콘텐츠를 로딩 상태에 따라 변경
   * @param originalContent - 원래 버튼 콘텐츠
   * @param buttonIndex - 버튼의 인덱스
   * @returns 변경된 콘텐츠 (해당 버튼 로딩 중일 때만 스피너)
   */
  const getButtonContent = (
    originalContent: ReactNode,
    buttonIndex: number,
  ): ReactNode => {
    const isThisButtonLoading = loading && loadingButtonIndex === buttonIndex;
    if (!isThisButtonLoading) return originalContent;

    // 해당 버튼이 로딩 중일 때만 스피너 표시
    return (
      <span className='flex items-center justify-center gap-2'>
        <LoadingSpinner />
        <span className='sr-only'>처리중...</span>
      </span>
    );
  };

  /**
   * children을 순회하면서 버튼 요소들의 onClick을 감싸서 Promise 처리
   */
  const enhancedChildren = Children.map(children, (child, index) => {
    if (!isValidElement(child)) {
      return child;
    }

    // ReactElement로 타입 캐스팅하여 props에 접근
    const element = child as ReactElement<
      ButtonHTMLAttributes<HTMLButtonElement>
    >;

    // button 요소이거나 onClick이 있는 요소만 처리
    if (element.type === 'button' || element.props.onClick) {
      const isDisabled = loading || element.props.disabled;

      return cloneElement(element, {
        onClick: wrapButtonClick(
          index,
          element.props.onClick as ButtonClickHandler,
        ),
        disabled: isDisabled,
        'aria-disabled': isDisabled,
        'aria-busy': loading && loadingButtonIndex === index,
        children: getButtonContent(element.props.children, index),
      });
    }

    return child;
  });

  return <div className={footerClassName}>{enhancedChildren}</div>;
}
