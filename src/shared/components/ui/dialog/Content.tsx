'use client';

import { X } from 'lucide-react';
import { ReactNode, useEffect, useRef } from 'react';

import { cn } from '@/shared/libs/cn';
import { useDialogStore } from '@/shared/store/dialog.store';

import { DialogOverlay } from './Overlay';
import { DialogPortal } from './Portal';
import { useDialogContext } from './Root';

/**
 * Dialog 변형별 패딩 스타일 매핑
 * 각 Dialog 타입에 맞는 적절한 내부 여백을 제공합니다.
 */
const DIALOG_PADDING_CLASSNAME = {
  complete: 'px-[30px] py-[34px] md:px-[40px] md:py-[40px]',
  cancel: 'px-[30px] py-[30px]',
  review: 'px-[24px] py-[20px] md:px-[30px] md:py-[24px]',
};

/**
 * Dialog 변형 타입
 * Dialog의 용도에 따른 스타일 변형을 정의합니다.
 */
type DialogVariantsType = 'complete' | 'cancel' | 'review';

/**
 * DialogContent 컴포넌트의 Props 타입
 */
interface DialogContentProps {
  /**
   * Dialog의 변형 타입
   * 변형에 따라 다른 패딩과 스타일이 적용됩니다.
   *
   * - 'complete': 완료/성공 알림용 Dialog
   * - 'cancel': 취소 확인용 Dialog
   * - 'review': 리뷰/평가용 Dialog
   */
  variant: DialogVariantsType;

  /** Dialog 내부에 렌더링될 콘텐츠 */
  children: ReactNode;
}

/**
 * Dialog 콘텐츠 컴포넌트
 *
 * Dialog의 실제 콘텐츠를 렌더링하고 접근성과 사용성을 위한
 * 포커스 트랩, 키보드 탐색, 스타일링을 관리합니다.
 *
 * **주요 기능:**
 * - 🎯 **포커스 트랩**: 모달 외부로 Tab 이동 완전 차단
 * - ⌨️ **키보드 탐색**: Tab/Shift+Tab으로 모달 내부 순환
 * - 🔐 **접근성 강화**: inert 속성과 tabindex 조작으로 이중 보호
 * - 🖱️ **마우스 이벤트 차단**: focusin 이벤트로 외부 포커스 시도 차단
 * - 🎨 **변형별 스타일링**: complete, cancel, review 변형 지원
 * - ❌ **닫기 버튼**: review 변형에 X 버튼 자동 추가
 * - 🔄 **DOM 마운트 대기**: 안정적인 포커스 트랩을 위한 지연 로딩
 *
 * **포커스 트랩 동작:**
 * 1. 모달이 열리면 DOM 마운트를 기다림
 * 2. body 자식들에 inert 속성 적용 (브라우저 네이티브)
 * 3. 모든 외부 요소에 tabindex="-1" 설정 (호환성 보장)
 * 4. 모달 내 첫 번째 focusable 요소로 포커스 이동
 * 5. Tab/Shift+Tab 이벤트를 가로채서 모달 내부에서만 순환
 * 6. focusin 이벤트로 외부 포커스 시도를 실시간 차단
 * 7. 모달 닫힐 때 모든 설정을 원상복구
 *
 * **지원하는 키보드 단축키:**
 * - `Tab`: 다음 focusable 요소로 이동
 * - `Shift + Tab`: 이전 focusable 요소로 이동
 * - `Escape`: 모달 닫기
 *
 * @param props - DialogContent 컴포넌트의 props
 * @param props.variant - Dialog 변형 타입 (스타일 결정)
 * @param props.children - Dialog 내부에 렌더링될 콘텐츠
 *
 * @example
 * ```tsx
 * <Dialog.Content variant="complete">
 *   <div className="text-center">
 *     <h2>작업 완료!</h2>
 *     <p>성공적으로 저장되었습니다.</p>
 *     <Dialog.Footer variant="complete">
 *       <button onClick={handleClose}>확인</button>
 *     </Dialog.Footer>
 *   </div>
 * </Dialog.Content>
 * ```
 *
 * @example
 * ```tsx
 * <Dialog.Content variant="cancel">
 *   <div className="text-center">
 *     <h2>정말 삭제하시겠습니까?</h2>
 *     <p>이 작업은 되돌릴 수 없습니다.</p>
 *     <Dialog.Footer variant="cancel">
 *       <button onClick={handleCancel}>취소</button>
 *       <button onClick={handleConfirm}>삭제</button>
 *     </Dialog.Footer>
 *   </div>
 * </Dialog.Content>
 * ```
 *
 * @example
 * ```tsx
 * <Dialog.Content variant="review">
 *   <div>
 *     <h2>리뷰 작성</h2>
 *     <ReviewForm />
 *     <Dialog.Footer variant="review">
 *       <button onClick={handleSubmit}>제출</button>
 *     </Dialog.Footer>
 *   </div>
 * </Dialog.Content>
 * ```
 */
export function DialogContent({ variant, children }: DialogContentProps) {
  const { modalId } = useDialogContext();
  const { close, isOpen } = useDialogStore();
  const dialogRef = useRef<HTMLDivElement>(null);

  // 1. cleanup 함수 관리 개선
  const cleanupRef = useRef<(() => void) | null>(null);

  /**
   * 포커스 트랩 및 접근성 관리
   *
   * 모달이 열린 상태에서 포커스가 모달 외부로 나가지 않도록
   * 다층 보호 시스템을 구현합니다.
   *
   * **보호 계층:**
   * 1. **inert 속성**: 브라우저 네이티브 비활성화 (최신 브라우저)
   * 2. **tabindex 조작**: 모든 외부 요소를 비활성화 (호환성 보장)
   * 3. **키보드 이벤트 가로채기**: Tab 키를 완전히 제어
   * 4. **focusin 이벤트 차단**: 마우스 클릭 등으로 인한 포커스 이동 방지
   *
   * **DOM 마운트 대기 로직:**
   * dialogRef.current가 실제로 DOM에 마운트될 때까지 10ms마다
   * 재시도하여 안정적인 포커스 트랩을 보장합니다.
   *
   * **cleanup 처리:**
   * 컴포넌트 언마운트 시 모든 inert 속성과 tabindex를 원상복구하여
   * 메모리 누수와 의도치 않은 부작용을 방지합니다.
   */
  const isModalOpen = isOpen(modalId);
  useEffect(() => {
    // Dialog가 실제로 열려있는지 확인
    if (!isModalOpen) {
      return;
    }

    /**
     * DOM 마운트 대기 및 포커스 트랩 설정
     *
     * React의 렌더링 사이클과 Portal의 특성상 dialogRef.current가
     * 즉시 사용 가능하지 않을 수 있어 재귀적으로 대기합니다.
     */
    const waitForDialog = () => {
      const dialog = dialogRef.current;
      if (!dialog) {
        setTimeout(waitForDialog, 10); // 10ms 후 재시도
        return;
      }

      // 1. body의 직접 자식들을 inert로 만들기 (최신 브라우저 지원)
      const bodyChildren = Array.from(document.body.children);
      const elementsToMakeInert: Element[] = [];

      bodyChildren.forEach((child) => {
        if (!child.contains(dialog)) {
          try {
            (child as HTMLElement).inert = true;
          } catch {
            // inert 속성 미지원 브라우저에서는 무시
          }
          elementsToMakeInert.push(child);
        }
      });

      // 2. 모든 focusable 요소를 찾아서 tabindex 조작 (호환성 보장)
      const allFocusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
      );

      const elementsToDisable: Array<{
        element: Element;
        originalTabIndex: string | null;
      }> = [];

      allFocusableElements.forEach((element) => {
        if (!dialog.contains(element)) {
          const originalTabIndex = element.getAttribute('tabindex');
          elementsToDisable.push({ element, originalTabIndex });
          element.setAttribute('tabindex', '-1');
        }
      });

      // 3. 모달 내부의 첫 번째 focusable 요소로 포커스 이동
      const modalFocusableElements = dialog.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
      );
      const firstModalElement = modalFocusableElements[0] as HTMLElement;

      if (firstModalElement) {
        setTimeout(() => {
          firstModalElement.focus();
        }, 100);
      } else {
        setTimeout(() => {
          dialog.focus();
        }, 100);
      }

      /**
       * 키보드 이벤트 핸들러
       *
       * Tab과 Escape 키를 가로채서 모달 내부에서만 탐색이
       * 이루어지도록 제어합니다.
       */
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          close(modalId);
          return;
        }

        if (e.key === 'Tab') {
          e.preventDefault(); // 모든 Tab을 차단하고 수동 제어

          const currentModalFocusable = dialog.querySelectorAll(
            'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
          );

          if (currentModalFocusable.length === 0) {
            return;
          }

          const firstElement = currentModalFocusable[0] as HTMLElement;
          const lastElement = currentModalFocusable[
            currentModalFocusable.length - 1
          ] as HTMLElement;

          if (e.shiftKey) {
            // Shift + Tab: 역방향 탐색
            if (document.activeElement === firstElement) {
              lastElement.focus();
            } else {
              // 현재 요소의 이전 요소 찾기
              const currentIndex = Array.from(currentModalFocusable).indexOf(
                document.activeElement as Element,
              );
              if (currentIndex > 0) {
                (
                  currentModalFocusable[currentIndex - 1] as HTMLElement
                ).focus();
              } else {
                lastElement.focus();
              }
            }
          } else {
            // Tab: 정방향 탐색
            if (document.activeElement === lastElement) {
              firstElement.focus();
            } else {
              // 현재 요소의 다음 요소 찾기
              const currentIndex = Array.from(currentModalFocusable).indexOf(
                document.activeElement as Element,
              );
              if (
                currentIndex >= 0 &&
                currentIndex < currentModalFocusable.length - 1
              ) {
                (
                  currentModalFocusable[currentIndex + 1] as HTMLElement
                ).focus();
              } else {
                firstElement.focus();
              }
            }
          }
        }
      };

      /**
       * focusin 이벤트 핸들러
       *
       * 마우스 클릭이나 기타 방법으로 모달 외부 요소에
       * 포커스가 이동하려는 시도를 실시간으로 차단합니다.
       */
      const handleFocusIn = (e: FocusEvent) => {
        const target = e.target as Element;

        if (!dialog.contains(target)) {
          e.preventDefault();
          e.stopPropagation();

          const modalFocusable = dialog.querySelectorAll(
            'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
          );
          const firstElement = modalFocusable[0] as HTMLElement;
          if (firstElement) {
            firstElement.focus();
          } else {
            dialog.focus();
          }
        }
      };

      // 이벤트 리스너 등록 (capture phase에서 처리)
      document.addEventListener('keydown', handleKeyDown, true);
      document.addEventListener('focusin', handleFocusIn, true);

      /**
       * cleanup 함수를 전역 스코프에 저장
       *
       * useEffect의 cleanup 함수에서 참조할 수 있도록
       * window 객체에 임시 저장합니다.
       */
      cleanupRef.current = () => {
        // inert 속성 제거
        elementsToMakeInert.forEach((element) => {
          try {
            (element as HTMLElement).inert = false;
          } catch {
            // inert 해제 실패 무시
          }
        });

        // tabindex 복원
        elementsToDisable.forEach(({ element, originalTabIndex }) => {
          if (originalTabIndex === null) {
            element.removeAttribute('tabindex');
          } else {
            element.setAttribute('tabindex', originalTabIndex);
          }
        });

        // 이벤트 리스너 제거
        document.removeEventListener('keydown', handleKeyDown, true);
        document.removeEventListener('focusin', handleFocusIn, true);

        // cleanup 함수 제거
        cleanupRef.current = null;
      };
    };

    // DOM 마운트 대기 시작
    waitForDialog();

    return () => {
      // cleanup 함수가 있으면 실행
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [close, modalId, isModalOpen]);

  /**
   * Content 클릭 시 이벤트 전파 방지
   * Content 영역을 클릭했을 때 Overlay의 클릭 이벤트가 발생하지 않도록 합니다.
   */
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 3. 접근성 개선
  const handleCloseKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      close(modalId);
    }
  };

  return (
    <DialogPortal>
      {/* Portal wrapper가 전체 화면을 덮고 클릭을 감지 */}
      <DialogOverlay>
        <div
          ref={dialogRef}
          className={cn(
            'relative z-50 w-[320px] rounded-[20px] bg-white md:w-[400px]',
            DIALOG_PADDING_CLASSNAME[variant],
          )}
          tabIndex={-1}
          role='dialog'
          aria-modal='true'
          onClick={handleContentClick}
        >
          {/* review 변형에만 X 닫기 버튼 표시 */}
          {variant === 'review' && (
            <X
              className='absolute top-25 right-25 cursor-pointer text-gray-600 transition-colors hover:text-gray-900'
              onClick={() => close(modalId)}
              onKeyDown={handleCloseKeyDown}
              tabIndex={0}
              role='button'
              aria-label='모달 닫기'
            />
          )}
          {children}
        </div>
      </DialogOverlay>
    </DialogPortal>
  );
}
