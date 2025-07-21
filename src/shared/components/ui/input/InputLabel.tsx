'use client';

import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

import { useInputContext } from './InputContext';

/**
 * @interface LabelProps
 * @description
 * `Input.Label` 컴포넌트에 전달되는 props입니다.
 *
 * @property {ReactNode} children - 라벨에 표시할 텍스트나 요소입니다. (예: "이메일")
 * @property {string} [className] - 사용자 정의 CSS 클래스 이름으로, 라벨의 기본 스타일에 추가적으로 병합됩니다.
 */
interface LabelProps {
  children: ReactNode;
  className?: string;
}

/**
 * @component Label
 * @description
 * `Input.Root` 내부에서 사용되는 라벨 컴포넌트입니다.
 * `useInputContext` 훅을 통해 `Input.Root`에서 공유된 `id`와 `required` 정보를 자동으로 가져와 사용합니다.
 * 이를 기반으로 웹 접근성을 준수하고 일관된 스타일을 갖춘 `<label>` 요소를 렌더링합니다.
 *
 * - **`htmlFor` 속성**: 컨텍스트에서 전달받은 `id` (입력 요소의 ID)에 자동으로 연결되어, 라벨 클릭 시 해당 입력 필드에 포커스되도록 보장합니다.
 * - **필수 입력 표시**: `required` 속성(Context에서 가져옴)이 `true`인 경우, 라벨 텍스트 옆에 빨간 별표(`*`)를 추가로 표시하여 해당 입력 항목이 필수임을 시각적으로 명시합니다.
 *
 * @param {LabelProps} props - `Input.Label` 컴포넌트에 적용할 속성입니다.
 * @returns {JSX.Element} 렌더링된 `<label>` 요소입니다.
 *
 * @example
 * ```tsx
 * Input.Root의 id와 required prop에 따라 자동으로 라벨과 연결되고 필수 표시가 됩니다.
<<<<<<< HEAD
 * <Input.Root id="nickname" name="nickname" type="text" required>
=======
 * <Input.Root id="user-name" name="nickname" type="text" required>
>>>>>>> develop
 * <Input.Label>이름</Input.Label>
 * <Input.Field placeholder="사용자 이름을 입력하세요" />
 * </Input.Root>
 *
 * 기본적인 사용 예시
 * <Input.Root id="comment" name="comment" type="textarea">
 * <Input.Label className="font-bold">댓글 내용</Input.Label>
 * <Input.Field placeholder="댓글을 남겨주세요" />
 * </Input.Root>
 * ```
 */
export default function InputLabel({ children, className }: LabelProps) {
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
