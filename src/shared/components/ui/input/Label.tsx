'use client';

import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

import { useInputContext } from './context';

/**
 * @interface LabelProps
 * @description
 * `Input.Label` 컴포넌트에 전달되는 props입니다.
 *
 * @property {ReactNode} children - 라벨에 표시할 텍스트나 요소
 * @property {string} [className] - 사용자 정의 클래스 이름 (기본 스타일에 추가적으로 병합됨)
 */
interface LabelProps {
  children: ReactNode;
  className?: string;
}

/**
 * @component Label
 * @description
 * `Input.Root` 내부에서 사용되는 라벨 컴포넌트로, `useInputContext`를 통해 공유된 `id`와 `required` 정보를 기반으로
 * 접근성과 일관된 스타일을 갖춘 `<label>` 요소를 렌더링합니다.
 *
 * - `htmlFor` 속성은 컨텍스트에서 전달받은 `id`에 자동으로 연결되어 입력 요소와의 연결을 보장합니다.
 * - `required`가 true인 경우, 라벨 옆에 빨간 별표(`*`)를 추가로 표시하여 필수 입력 항목임을 명시합니다.
 *
 * @param {ReactNode} children - 라벨에 표시할 텍스트나 요소
 * @param {string} [className] - 사용자 정의 클래스 이름
 *
 * @example
 * ```tsx
 * <Input.Root id="name" type="text" required>
 *   <Input.Label>이름</Input.Label>
 *   <Input.Field placeholder="이름을 입력하세요" />
 * </Input.Root>
 * ```
 */
export default function Label({ children, className }: LabelProps) {
  const { id, required } = useInputContext();

  return (
    <label
      htmlFor={id}
      className={cn('font-size-16', 'text-gray-950', className)}
    >
      {children}
      {required && <span className='text-red ml-5'>*</span>}
    </label>
  );
}
