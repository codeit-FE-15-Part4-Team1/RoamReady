import { LoaderCircle } from 'lucide-react';
import { cloneElement, isValidElement, MouseEvent, ReactElement } from 'react';

import { cn } from '../libs/cn';

/**
 * Button 컴포넌트의 스타일 시스템
 * @description 다양한 버튼 variant, size, 상태별 스타일을 정의
 */
const buttonVariants = {
  /** 모든 버튼에 공통으로 적용되는 기본 스타일 */
  base: 'w-fit h-fit border rounded-2xl flex items-center justify-center cursor-pointer',

  /** 버튼 스타일 variant */
  variants: {
    /** 기본 스타일 - 흰색 배경, 검은 테두리 */
    default: 'bg-white text-black border border-black hover:bg-gray-50',
    /** 윤곽선 스타일 - 투명 배경, 두꺼운 테두리, 호버 효과 */
    outline:
      'bg-transparent text-gray-200 border-1 border-gray-200 hover:bg-gray-50',
    /** 고스트 스타일 - 회색 배경, 호버 시 진한 회색 */
    ghost: 'bg-gray-100 text-black hover:bg-gray-200',
    /** 주요 스타일 - 브랜드 컬러 배경, 흰색 텍스트 */
    primary: 'bg-brand-2 text-white hover:bg-brand-2/80',
  },

  /** 버튼 크기 variant */
  sizes: {
    /** 작은 크기 - 콘텐츠에 맞춤, 작은 패딩 */
    small: 'w-fit h-fit px-10 py-5',
    /** 중간 크기 - 고정 너비/높이, 일반적인 버튼 크기 */
    medium: 'w-120 h-40',
    /** 큰 크기 - 전체 너비, 큰 높이 */
    large: 'w-full h-40',
  },

  /** 선택된 상태 스타일 - 브랜드 컬러 텍스트와 테두리 */
  selected: 'text-brand-2 border border-brand-2',

  /** 비활성화 상태 스타일 - 회색 배경, 커서 변경, 호버 효과 제거 */
  disabled:
    'bg-gray-400 text-white border border-gray-400 cursor-not-allowed hover:bg-gray-400',

  /** 로딩 상태 스타일 - 투명도 감소, 커서 변경, 호버 효과 제거 */
  loading: 'opacity-70 cursor-not-allowed relative pointer-events-none',
};

/**
 * 버튼 클래스를 조합하여 반환하는 함수
 * @param variant - 버튼 스타일 타입 (default | outline | ghost | primary)
 * @param size - 버튼 크기 (small | medium | large)
 * @param selected - 선택 상태 여부
 * @param disabled - 비활성화 상태 여부
 * @param loading - 로딩 상태 여부
 * @returns 조합된 CSS 클래스 문자열
 *
 * @example
 * ```typescript
 * getButtonClasses('primary', 'large', false, false, true)
 * // returns: 'w-fit h-fit border rounded-2xl flex items-center justify-center w-full h-40 text-lg bg-brand-2 text-white opacity-70 cursor-not-allowed hover:opacity-70 relative overflow-hidden'
 * ```
 */
function getButtonClasses(
  variant: keyof typeof buttonVariants.variants = 'default',
  size: keyof typeof buttonVariants.sizes = 'medium',
  selected: boolean = false,
  disabled: boolean = false,
  loading: boolean = false,
) {
  // disabled가 loading보다 우선순위가 높음
  if (disabled) {
    return cn(
      buttonVariants.base,
      buttonVariants.sizes[size],
      buttonVariants.disabled,
    );
  }
  if (loading) {
    return cn(
      buttonVariants.base,
      buttonVariants.sizes[size],
      buttonVariants.variants[variant],
      buttonVariants.loading,
    );
  }
  if (selected) {
    return cn(
      buttonVariants.base,
      buttonVariants.sizes[size],
      buttonVariants.selected,
    );
  }
  return cn(
    buttonVariants.base,
    buttonVariants.sizes[size],
    buttonVariants.variants[variant],
  );
}

/**
 * Button 컴포넌트의 Props 타입 정의
 * @interface ButtonProps
 * @extends React.ComponentProps<'button'>
 */
interface ButtonProps extends React.ComponentProps<'button'> {
  /**
   * 자식 요소로 렌더링할지 여부 (Slot 패턴)
   * @default false
   * @example
   * ```tsx
   * <Button asChild>
   *   <Link href="/somewhere">링크 버튼</Link>
   * </Button>
   * ```
   */
  asChild?: boolean;

  /**
   * 버튼 스타일 variant
   * @default 'default'
   */
  variant?: keyof typeof buttonVariants.variants;

  /**
   * 버튼 크기
   * @default 'medium'
   */
  size?: keyof typeof buttonVariants.sizes;

  /**
   * 선택 상태 여부 (토글 버튼 등에서 사용)
   * @default false
   */
  selected?: boolean;

  /**
   * 로딩 상태 여부
   * @default false
   */
  loading?: boolean;
}

/**
 * 재사용 가능한 Button 컴포넌트
 *
 * @description
 * 다양한 스타일과 크기를 지원하는 범용 버튼 컴포넌트입니다.
 * Slot 패턴(asChild)을 통해 다른 컴포넌트와 조합할 수 있습니다.
 *
 * @param props - ButtonProps
 * @returns JSX.Element
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <Button>클릭하세요</Button>
 *
 * // 다양한 스타일과 크기
 * <Button variant="primary" size="large">주요 버튼</Button>
 * <Button variant="outline" size="small">작은 윤곽선 버튼</Button>
 *
 * // 선택 상태
 * <Button selected={true}>선택된 버튼</Button>
 *
 * // 비활성화
 * <Button disabled>비활성화된 버튼</Button>
 *
 * // 로딩 상태
 * <Button loading>로딩 중...</Button>
 *
 * // Link와 조합 (asChild 패턴)
 * <Button asChild variant="primary">
 *   <Link href="/dashboard">대시보드로 이동</Link>
 * </Button>
 *
 * // asChild + disabled 조합 (Radix UI 방식)
 * <Button asChild disabled>
 *   <Link href="/dashboard" aria-disabled="true">비활성화된 링크</Link>
 * </Button>
 *
 * // asChild + loading 조합
 * <Button asChild loading>
 *   <Link href="/dashboard" aria-busy="true">로딩 중인 링크</Link>
 * </Button>
 *
 * // 아이콘과 함께 사용
 * <Button variant="primary">
 *   <Icon className="w-4 h-4 mr-2" />
 *   다운로드
 * </Button>
 *
 * // 전체 너비
 * <Button className="w-full">전체 너비 버튼</Button>
 * ```
 */
export default function Button({
  asChild = false,
  variant = 'default',
  size = 'small',
  selected = false,
  loading = false,
  children,
  className,
  ...props
}: ButtonProps) {
  // asChild 속성이 존재하고 자식 요소가 유효한 react 요소인지 확인
  if (asChild && isValidElement(children)) {
    // Slot 패턴: React 타입 시스템 한계로 인한 최소한의 타입 단언 (any가 lint 규칙으로 불가능)
    const child = children as ReactElement<{
      className?: string;
      onClick?: (e: MouseEvent) => void;
      [key: string]: unknown; // lint에서 any를 금지하고 있어서 유연한 처리를 위해해
    }>;

    return cloneElement(child, {
      ...props,
      // disabled 또는 loading 상태 자동 처리
      onClick: (e: MouseEvent) => {
        // disabled 또는 loading 상태일 때 클릭 이벤트 차단
        if (props.disabled || loading) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        // disabled도 loading도 아닐 때만 기존 onClick 실행
        child.props.onClick?.(e);
      },
      className: cn(
        getButtonClasses(variant, size, selected, props.disabled, loading), // 버튼 클래스 반환 함수
        className, // 추가 클래스 속성
        child.props.className, // 자식 요소의 클래스 속성
      ),
    });
  }

  return (
    <button
      {...props}
      className={cn(
        getButtonClasses(variant, size, selected, props.disabled, loading),
        className,
      )}
      aria-busy={loading}
    >
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <LoaderCircle className='size-10 animate-spin' />
        </div>
      )}
      <span className={loading ? 'invisible' : 'visible'}>{children}</span>
    </button>
  );
}
