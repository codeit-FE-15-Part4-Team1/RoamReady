'use client';

import {
  cloneElement,
  isValidElement,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  useCallback,
} from 'react';

import { cn } from '@/shared/libs/cn';

import { useDialogContext } from './Root';

/**
 * DialogTrigger 컴포넌트의 Props 타입
 */
interface DialogTriggerProps {
  /** 트리거로 사용될 자식 요소 (버튼, 링크, 카드 등) */
  children: ReactNode;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 클래스 이름 */
  className?: string;
}

/**
 * 클릭 가능한 요소의 기본 props 타입
 */
interface ClickableElementProps {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
  role?: string;
  tabIndex?: number;
  'aria-label'?: string;
  'aria-haspopup'?: string;
  'aria-expanded'?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Dialog 트리거 컴포넌트
 *
 * Dialog를 열기 위한 트리거 역할을 하는 컴포넌트입니다.
 * 클릭 시 해당 Dialog를 열도록 하는 이벤트 핸들러를 자동으로 연결합니다.
 * 자식 요소는 키보드 접근이 가능한 요소(button, a 등)를 사용하는 것을 권장합니다.
 *
 * **주요 기능:**
 * - 자동 상태 관리 (컨텍스트에서 가져옴)
 * - 클릭 이벤트 자동 연결
 * - 기존 이벤트 핸들러 보존 및 합성
 * - 임의의 자식 요소를 트리거로 사용 가능
 * - Context API를 통한 상태 관리
 * - 성능 최적화된 이벤트 핸들러
 *
 * **접근성 고려사항:**
 * - aria-haspopup="dialog" 자동 추가
 * - aria-expanded로 dialog 상태 표시
 * - 기존 ARIA 속성 보존
 * - 키보드 접근이 가능한 요소(button, a 등)를 children으로 사용하는 것을 권장합니다
 *
 * @param props - DialogTrigger 컴포넌트의 props
 * @param props.children - 트리거로 사용될 자식 요소
 * @param props.disabled - 비활성화 여부 (선택사항)
 *
 * @example
 * ```tsx
 * <Dialog.Root>
 *   <Dialog.Trigger>
 *     <button className="btn-primary">
 *       설정 열기
 *     </button>
 *   </Dialog.Trigger>
 *    ...
 * </Dialog.Root>
 * ```
 *
 * @example
 * ```tsx
 * // 복잡한 트리거 요소도 가능
 * <Dialog.Trigger>
 *   <div className="card clickable">
 *     <img src="profile.jpg" alt="프로필" />
 *     <span>프로필 편집</span>
 *   </div>
 * </Dialog.Trigger>
 * ```
 */
export function DialogTrigger({
  children,
  disabled = false,
  className,
}: DialogTriggerProps) {
  const { open, isOpen } = useDialogContext();

  /**
   * 트리거 클릭 핸들러
   * 컨텍스트에서 가져온 open 함수를 사용하여 Dialog를 엽니다.
   * 기존 onClick 핸들러가 있다면 함께 실행합니다.
   */
  const handleClick = useCallback(
    (originalHandler?: (event: MouseEvent<HTMLElement>) => void) =>
      (event: MouseEvent<HTMLElement>) => {
        if (disabled) return;

        // 기존 핸들러가 있다면 먼저 실행
        originalHandler?.(event);

        // event가 취소되지 않았다면 dialog 열기
        if (!event.defaultPrevented) {
          open();
        }
      },
    [open, disabled],
  );

  /**
   * 키보드 이벤트 핸들러
   * 접근성을 위해 Enter 키와 Space 키로 Dialog 열기 기능 제공
   * 기존 onKeyDown 핸들러가 있다면 함께 실행합니다.
   */
  const handleKeyDown = useCallback(
    (originalHandler?: (event: KeyboardEvent<HTMLElement>) => void) =>
      (event: KeyboardEvent<HTMLElement>) => {
        if (disabled) return;

        // 기존 핸들러가 있다면 먼저 실행
        originalHandler?.(event);

        // event가 취소되지 않았고 적절한 키가 눌렸다면 dialog 열기
        if (
          !event.defaultPrevented &&
          (event.key === 'Enter' || event.key === ' ')
        ) {
          event.preventDefault();
          open();
        }
      },
    [open, disabled],
  );

  // React 요소인 경우 props를 복제하여 이벤트 핸들러 추가
  if (isValidElement(children)) {
    const element = children as ReactElement<ClickableElementProps>;
    const existingOnClick = element.props.onClick;
    const existingOnKeyDown = element.props.onKeyDown;
    const existingRole = element.props.role;
    const existingAriaLabel = element.props['aria-label'];

    return cloneElement(element, {
      onClick: handleClick(existingOnClick),
      onKeyDown: handleKeyDown(existingOnKeyDown),
      role: existingRole || 'button',
      tabIndex: element.props.tabIndex ?? 0,
      'aria-label': existingAriaLabel || 'Dialog 열기',
      'aria-haspopup': 'dialog',
      'aria-expanded': isOpen,
      disabled: disabled || element.props.disabled,
    });
  }

  // React 요소가 아닌 경우 button으로 래핑
  return (
    <button
      onClick={handleClick()}
      onKeyDown={handleKeyDown()}
      role='button'
      tabIndex={disabled ? -1 : 0}
      aria-label='Dialog 열기'
      aria-haspopup='dialog'
      aria-expanded={isOpen}
      aria-disabled={disabled}
      className={cn(disabled && 'cursor-not-allowed opacity-60', className)}
    >
      {children}
    </button>
  );
}
