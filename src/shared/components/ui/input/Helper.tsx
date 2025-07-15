'use client';

import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

import { useInputContext } from './context';

/**
 * @interface HelperProps
 * @description
 * `Input.Helper` 컴포넌트에 전달되는 props입니다.
 *
 * @property {ReactNode} children - 입력 필드 하단에 표시할 사용자 정의 메시지 내용입니다. (`react-hook-form`의 오류 메시지가 없을 경우 표시됩니다.)
 * @property {string} [className] - 사용자 정의 CSS 클래스 이름으로, 도움말 텍스트의 기본 스타일에 추가적으로 병합됩니다.
 */
interface HelperProps {
  children?: ReactNode;
  className?: string;
}

/**
 * @component Helper
 * @description
 * 입력 필드 하단에 안내 메시지나 유효성 검사 오류 메시지를 표시하는 컴포넌트입니다.
 * `useInputContext` 훅을 통해 `Input.Root`에서 공유된 `isError` 상태, 필드 `name`, `errors` 객체,
 * `type`, `maxLength`, `currentLength` 등의 정보를 자동으로 가져와 사용합니다.
 *
 * - **메시지 표시 우선순위**:
 * 1. `react-hook-form`의 `errors` 객체에 해당 필드(`name`)의 오류 메시지가 존재하면, 해당 메시지를 우선적으로 표시합니다.
 * 2. `errorMessage`가 없을 경우, `children` prop으로 전달된 사용자 정의 메시지를 표시합니다.
 * 이 방식을 통해 `Input.Helper`는 `react-hook-form`의 유효성 검사 결과와 유기적으로 연동됩니다.
 * - **색상 변경**: `isError` 상태(Context에서 가져옴)가 `true`인 경우, 메시지 텍스트는 빨간색(`text-red`)으로 표시되어 오류를 강조합니다.
 * - **문자 수 표시**:
 * `type`이 'textarea'이고 `maxLength`가 설정된 경우, 현재 입력된 문자 수(`currentLength`)와 최대 문자 수를 필드 오른쪽에 자동으로 계산하여 표시합니다. `currentLength`가 `maxLength`를 초과하면 빨간색으로 변경됩니다.
 *
 * 주로 유효성 검사 오류 메시지, 일반적인 도움말 문구, 또는 `textarea`의 문자 수 카운터 등 사용자에게 추가 정보를 전달할 때 사용됩니다.
 *
 * @param {HelperProps} props - `Input.Helper` 컴포넌트에 적용할 속성입니다.
 * @returns {JSX.Element} 조건에 따라 안내 메시지 또는 문자 수 카운터를 렌더링하는 요소입니다.
 *
 * @example
 * ```tsx
 * react-hook-form 유효성 검사 오류 메시지를 자동으로 표시 (children 없이 사용)
 * <Input.Root name="email" type="text">
 * <Input.Label>이메일</Input.Label>
 * <Input.Field placeholder="이메일을 입력하세요" />
 * <Input.Helper />
 * </Input.Root>
 *
 * 특정 안내 메시지를 표시 (children으로 전달)
 * <Input.Root name="password" type="password">
 * <Input.Label>비밀번호</Input.Label>
 * <Input.Field placeholder="비밀번호를 입력하세요" />
 * <Input.Helper>비밀번호는 8자 이상이어야 합니다.</Input.Helper>
 * </Input.Root>
 *
 * textarea의 문자 수 표시 예시
 * <Input.Root name="comment" type="textarea" maxLength={100}>
 * <Input.Label>댓글</Input.Label>
 * <Input.Field rows={4} />
 * <Input.Helper /> // children 없이 사용 시, 문자 수 카운터만 표시
 * </Input.Root>
 * ```
 */
export default function Helper({ children, className }: HelperProps) {
  const { isError, type, maxLength, currentLength, name, errors } =
    useInputContext();
  const isTextArea = type === 'textarea';
  const errorMessage = name && (errors?.[name]?.message as string | undefined);
  const messageToDisplay = errorMessage || children;
  return (
    <>
      {messageToDisplay && (
        <p
          className={cn(
            'font-size-16',
            isError ? 'text-red' : 'text-gray-800',
            className,
          )}
        >
          {messageToDisplay}
        </p>
      )}
      {isTextArea && maxLength !== undefined && (
        <p
          className={cn(
            'font-size-14 mt-5 flex w-full justify-end',
            currentLength !== undefined && currentLength > maxLength
              ? 'text-red'
              : 'text-gray-600',
          )}
        >
          {currentLength || 0}/{maxLength}
        </p>
      )}
    </>
  );
}
