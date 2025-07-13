'use client';

import { ReactNode, useId, useState } from 'react';

import { cn } from '@/shared/libs/cn';

import { InputContext, InputContextProps } from './context';

/**
 * @interface RootProps
 * @description
 * `Input.Root` 컴포넌트에 전달되는 속성입니다.
 *
 * `InputContext`를 통해 자식 컴포넌트들과 공유될 입력 상태(`id`, `type`, `required`, `disabled`, `isError`, `isPasswordVisible`, `togglePasswordVisibility` 등)를 포함하며,
 * 추가적으로 외부 스타일을 위한 `className`과 자식 노드를 받을 수 있는 `children` 속성을 정의합니다.
 *
 * @property {ReactNode} children - 하위에 위치할 입력 관련 컴포넌트들
 * @property {string} [className] - 외부에서 전달할 클래스 이름
 * @property {boolean} [initialPasswordVisible] - 비밀번호 입력 필드의 초기 가시성 설정
 */
interface RootProps extends InputContextProps {
  children: ReactNode;
  className?: string;
  initialPasswordVisible?: boolean;
}

/**
 * @component Root
 * @description
 * `Input` 컴포넌트 패밀리의 루트 역할을 하는 컨테이너 컴포넌트입니다.
 * 내부에서 `InputContext`를 생성하여 자식 컴포넌트인 `Label`, `Field`, `Trigger`, `Helper` 등이
 * 동일한 입력 상태(`id`, `type`, `required`, `disabled`, `isError`, `isPasswordVisible`, `togglePasswordVisibility` 등)를 공유할 수 있도록 합니다.
 *
 * 또한 시멘틱 마크업을 위해 `role="group"` 속성을 포함합니다.
 *
 * @param {ReactNode} children - 하위에 위치할 입력 관련 컴포넌트들
 * @param {string} id - 연결될 입력 요소의 ID
 * @param {string} type - 입력 요소의 타입 (예: 'text', 'textarea', 'file', 'password' 등)
 * @param {boolean} [required] - 필수 입력 여부
 * @param {boolean} [disabled] - 비활성화 여부
 * @param {boolean} [isError] - 에러 상태 여부
 * @param {string} [className] - 사용자 정의 클래스 이름
 *
 * @example
 * ```tsx
 * <Input.Root id="email" type="text" isError>
 *   <Input.Label>Email</Input.Label>
 *   <Input.Field placeholder="이메일을 입력하세요" />
 *   <Input.Helper>이메일 형식이 올바르지 않습니다.</Input.Helper>
 * </Input.Root>
 * ```
 */
export default function Root({
  children,
  id,
  type,
  required,
  disabled,
  isError,
  className = '',
  fileName,
  handleFileChange,
  maxLength,
  currentLength,
  fallbackMessage,
  initialPasswordVisible = false,
}: RootProps) {
  const uniqueId = useId();
  const finalId = id || uniqueId;

  const [isPasswordVisible, setIsPasswordVisible] = useState(
    initialPasswordVisible,
  );

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <InputContext.Provider
      value={{
        id: finalId,
        type,
        required,
        disabled,
        isError,
        fileName,
        handleFileChange,
        maxLength,
        currentLength,
        fallbackMessage,
        isPasswordVisible,
        togglePasswordVisibility,
      }}
    >
      <div role='group' className={cn('flex flex-col gap-10', className)}>
        {children}
      </div>
    </InputContext.Provider>
  );
}
