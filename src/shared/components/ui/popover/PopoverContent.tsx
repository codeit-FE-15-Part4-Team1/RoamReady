'use client';
import {
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/libs/cn';

import { usePopover } from './PopoverContext';

/**
 * Popover 컨텐츠의 위치를 정의하는 타입
 *
 * @description 트리거 요소를 기준으로 12가지 방향으로 배치 가능
 * - bottom: 아래쪽 (start: 왼쪽 정렬, center: 중앙 정렬, end: 오른쪽 정렬)
 * - top: 위쪽 (start: 왼쪽 정렬, center: 중앙 정렬, end: 오른쪽 정렬)
 * - left: 왼쪽 (start: 위쪽 정렬, center: 중앙 정렬, end: 아래쪽 정렬)
 * - right: 오른쪽 (start: 위쪽 정렬, center: 중앙 정렬, end: 아래쪽 정렬)
 */
type PopoverPosition =
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'left-start'
  | 'left-center'
  | 'left-end'
  | 'right-start'
  | 'right-center'
  | 'right-end';

/**
 * PopoverContent 컴포넌트의 Props 인터페이스
 *
 * @interface PopoverContentProps
 * @extends {HTMLAttributes<HTMLDivElement>} HTML div 요소의 모든 속성을 상속
 */
interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Popover 내부에 표시될 컨텐츠 */
  children: ReactNode;
  /**
   * Popover가 표시될 위치
   * @default 'bottom-center'
   */
  position?: PopoverPosition;
  /**
   * 추가 CSS 클래스명 (기본 스타일과 병합됨)
   * @optional
   */
  className?: string;
  /**
   * 백드롭 표시 여부
   * @default false
   */
  withBackdrop?: boolean;
}

/**
 * Popover 컨텐츠 컴포넌트
 *
 * @description
 * - 트리거 요소 주변에 위치하는 오버레이 컨텐츠
 * - Portal을 사용하여 document.body에 직접 렌더링
 * - 12가지 방향으로 배치 가능
 * - ESC 키와 백드롭 클릭으로 닫기 지원
 * - 접근성(a11y) 속성 포함
 *
 * @component
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>클릭하세요</PopoverTrigger>
 *   <PopoverContent position="bottom-center">
 *     <p>Popover 내용</p>
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @param {PopoverContentProps} props - 컴포넌트 props
 * @returns {ReactPortal | null} Portal로 렌더링된 Popover 또는 null
 */
export default function PopoverContent({
  children,
  position = 'bottom-center',
  style,
  className,
  withBackdrop = false,
  ...props
}: PopoverContentProps) {
  const { isOpen, setIsOpen, triggerRef, popoverId } = usePopover();
  const contentRef = useRef<HTMLDivElement>(null); // PopoverContent 자신을 위한 ref
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });
  const [transform, setTransform] = useState('');
  const [mounted, setMounted] = useState(false);

  // SSR 대응
  useEffect(() => {
    setMounted(true);
  }, []);

  // 위치 계산 함수를 별도로 분리
  const calculatePosition = useCallback(() => {
    if (!mounted || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    //현대적인 방식과 구형 브라우저 모두 지원하기 위해서 사용
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    let newPosition = { x: 0, y: 0 };
    let newTransform = '';

    // position에 따른 위치 설정 scroll값을 추가하여 위치 고정 처리
    switch (position) {
      case 'bottom-start':
        newPosition = {
          y: rect.bottom + scrollY + 5,
          x: rect.left + scrollX,
        };
        newTransform = '';
        break;
      case 'bottom-center':
        newPosition = {
          y: rect.bottom + scrollY + 5,
          x: rect.left + scrollX + rect.width / 2,
        };
        newTransform = 'translateX(-50%)';
        break;
      case 'bottom-end':
        newPosition = {
          y: rect.bottom + scrollY + 5,
          x: rect.right + scrollX,
        };
        newTransform = 'translateX(-100%)';
        break;
      case 'top-start':
        newPosition = {
          y: rect.top + scrollY - 5,
          x: rect.left + scrollX,
        };
        newTransform = 'translateY(-100%)';
        break;
      case 'top-center':
        newPosition = {
          y: rect.top + scrollY - 5,
          x: rect.left + scrollX + rect.width / 2,
        };
        newTransform = 'translateX(-50%) translateY(-100%)';
        break;
      case 'top-end':
        newPosition = {
          y: rect.top + scrollY - 5,
          x: rect.right + scrollX,
        };
        newTransform = 'translateX(-100%) translateY(-100%)';
        break;
      case 'left-start':
        newPosition = {
          y: rect.top + scrollY,
          x: rect.left + scrollX - 5,
        };
        newTransform = 'translateX(-100%)';
        break;
      case 'left-center':
        newPosition = {
          y: rect.top + scrollY + rect.height / 2,
          x: rect.left + scrollX - 5,
        };
        newTransform = 'translateX(-100%) translateY(-50%)';
        break;
      case 'left-end':
        newPosition = {
          y: rect.bottom + scrollY,
          x: rect.left + scrollX - 5,
        };
        newTransform = 'translateX(-100%) translateY(-100%)';
        break;
      case 'right-start':
        newPosition = {
          y: rect.top + scrollY,
          x: rect.right + scrollX + 5,
        };
        newTransform = '';
        break;
      case 'right-center':
        newPosition = {
          y: rect.top + scrollY + rect.height / 2,
          x: rect.right + scrollX + 5,
        };
        newTransform = 'translateY(-50%)';
        break;
      case 'right-end':
        newPosition = {
          y: rect.bottom + scrollY,
          x: rect.right + scrollX + 5,
        };
        newTransform = 'translateY(-100%)';
        break;
    }

    setPos(newPosition);
    setTransform(newTransform);
  }, [position, triggerRef, mounted]);

  // 초기 위치 계산 - 깜빡임 방지
  useLayoutEffect(() => {
    if (isOpen && mounted) {
      calculatePosition();
    }
  }, [isOpen, calculatePosition, mounted]);

  // 스크롤 이벤트 등록 - 성능 최적화
  useEffect(() => {
    if (!isOpen || !mounted) return;

    const handleScroll = () => {
      calculatePosition();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isOpen, calculatePosition, mounted]);

  // [추가된 기능] 외부 클릭 및 ESC 키로 닫기 기능 통합
  useEffect(() => {
    if (!isOpen || !mounted) return;

    const handleInteractionOutside = (e: MouseEvent | KeyboardEvent) => {
      // ESC 키 처리
      if (e instanceof KeyboardEvent && e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      // 마우스 클릭 처리
      if (e instanceof MouseEvent) {
        // PopoverContent 내부나 Trigger를 클릭한 경우는 무시
        if (
          contentRef.current?.contains(e.target as Node) ||
          triggerRef.current?.contains(e.target as Node)
        ) {
          return;
        }
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleInteractionOutside);
    document.addEventListener('keydown', handleInteractionOutside);

    return () => {
      document.removeEventListener('mousedown', handleInteractionOutside);
      document.removeEventListener('keydown', handleInteractionOutside);
    };
  }, [isOpen, mounted, setIsOpen, triggerRef]);

  if (!isOpen || !mounted) return null;

  // Portal로 body에 직접 렌더링
  const popoverElement = (
    <>
      {withBackdrop && (
        <div
          className='fixed inset-0 z-60'
          onClick={() => setIsOpen(false)}
          role='presentation'
        />
      )}
      <div
        ref={contentRef}
        className={cn(
          'scrollbar-none absolute z-90 h-fit max-h-500 w-fit max-w-2xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-4 shadow-lg',
          className,
        )}
        id={`popover-content-${popoverId}`}
        role='dialog'
        aria-modal='true'
        aria-labelledby={triggerRef.current?.id || undefined}
        style={{
          top: pos.y,
          left: pos.x,
          transform: transform,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </>
  );

  return typeof document !== 'undefined'
    ? createPortal(popoverElement, document.body)
    : null;
}
