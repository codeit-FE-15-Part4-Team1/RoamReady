'use client';

import { ReactNode, useId, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { cn } from '@/shared/libs/cn';

import { InputContext, InputContextProps } from './context';

/**
 * @interface RootProps
 * @description
 * `Input.Root` 컴포넌트에 전달되는 속성입니다.
 * 이 속성들은 `Input.Root`가 부모 컴포넌트로부터 직접적으로 받는 prop들을 정의합니다.
 *
 * @property {ReactNode} children - 하위에 위치할 입력 관련 컴포넌트들 (`Input.Label`, `Input.Field` 등)
 * @property {string} [className] - 외부에서 전달할 클래스 이름으로, 루트 `div`에 적용됩니다.
 * @property {string} name - **(필수)** `react-hook-form`에 등록될 필드의 이름입니다. 이 이름을 통해 폼 데이터와 유효성 검사 상태가 관리됩니다.
 * @property {HTMLInputTypeAttribute | 'textarea'} type - 입력 필드의 타입을 정의합니다 (예: 'text', 'password', 'file', 'textarea' 등).
 * @property {string} [id] - 연결될 입력 요소의 HTML `id` 속성입니다. 제공되지 않으면 `useId`로 자동 생성됩니다.
 * @property {boolean} [required] - 입력 필드의 필수 여부입니다.
 * @property {boolean} [disabled] - 입력 필드의 비활성화 여부입니다.
 * @property {number} [maxLength] - 텍스트 입력 필드(`textarea`)의 최대 문자 길이입니다.
 * @property {string} [fallbackMessage] - `type`이 'file'일 때 `Input.Trigger`에 표시될 기본 안내 메시지입니다.
 * @property {boolean} [initialPasswordVisible] - `type`이 'password'일 때 비밀번호 필드의 초기 가시성(보이기/숨기기)을 설정합니다. 기본값은 `false`입니다.
 *
 * ContextProps에서 제외되는 속성들:
 * 이 속성들은 `Input.Root`가 외부에서 `prop`으로 직접 받지 않으며, `react-hook-form`의 상태를 기반으로 **내부적으로 처리하거나 파생하여 `InputContext`를 통해 하위 컴포넌트에 제공**합니다.
 * - `isError`: `formState.errors` 객체를 기반으로 필드에 오류가 있는지 여부를 나타냅니다.
 * - `errors`: `react-hook-form`의 `formState.errors` 객체 전체로, 상세 오류 메시지에 접근할 때 사용됩니다.
 * - `register`: `react-hook-form`의 `register(name)` 호출 결과 객체로, 입력 요소에 필요한 속성(`name`, `onChange`, `onBlur`, `ref` 등)을 포함합니다.
 * - `currentLength`: `type`이 'textarea'일 때 `useWatch`를 통해 파생된 현재 입력된 문자열의 길이입니다.
 * - `fileName`: `type`이 'file'일 때 `useWatch`를 통해 파생된 선택된 파일의 이름입니다.
 */
interface RootProps
  extends Omit<
    InputContextProps,
    'isError' | 'errors' | 'register' | 'currentLength' | 'fileName'
  > {
  name: string;
  children: ReactNode;
  className?: string;
  initialPasswordVisible?: boolean;
}

/**
 * @component Root
 * @description
 * `Input` 컴포넌트 패밀리의 루트 역할을 하는 컨테이너 컴포넌트입니다.
 * 이 컴포넌트는 `react-hook-form`과 통합되어 특정 입력 필드(`name`으로 식별)의 폼 상태를 관리하고,
 * `InputContext`를 생성하여 `Label`, `Field`, `Trigger`, `Helper` 등 모든 자식 컴포넌트들이
 * 필요한 입력 상태(예: `id`, `type`, `register`, `currentLength` 등)를 공유하고 접근할 수 있도록 합니다.
 *
 * `Input.Root`는 `useFormContext`를 통해 `react-hook-form`의 `register`, `errors`, `control`을 가져오며,
 * 이를 기반으로 `isError`, `currentLength`, `fileName`과 같은 파생된 상태를 계산하여 Context에 제공합니다.
 *
 * 또한 시멘틱 마크업을 위해 `role="group"` 속성을 포함합니다.
 *
 * @param {RootProps} props - `Input.Root` 컴포넌트에 전달되는 속성입니다.
 * @returns {JSX.Element} Input 컴포넌트 패밀리의 최상위 컨테이너 요소.
 *
 * @example
 * ```tsx
 * 이메일 입력 필드의 예시 (useFormContext가 상위에서 제공되어야 함)
 * <Input.Root name="email" id="user-email" type="email" required>
 * <Input.Label>이메일 주소</Input.Label>
 * <Input.Field placeholder="name@example.com" />
 * <Input.Helper>올바른 이메일 형식을 입력해주세요.</Input.Helper>
 * </Input.Root>
 *
 * 비밀번호 입력 필드의 예시
 * <Input.Root name="password" id="user-password" type="password" >
 * <Input.Label>비밀번호</Input.Label>
 * <Input.Field placeholder="비밀번호를 입력하세요" rightIcon={<Input.Trigger triggerType="password-toggle" />} />
 * <Input.Helper /> // react-hook-form 에러 메시지가 있다면 자동으로 표시
 * </Input.Root>
 * ```
 */
export default function Root({
  children,
  id,
  name,
  type,
  required,
  disabled,
  className = '',
  maxLength,
  fallbackMessage,
}: RootProps) {
  const uniqueId = useId();
  const finalId = id || uniqueId;

  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const watchedValue = useWatch({ control, name });
  const currentLength =
    type === 'textarea' && watchedValue ? String(watchedValue).length : 0;

  const isError = !!errors[name];

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const fileName =
    type === 'file' && watchedValue && watchedValue[0] instanceof File
      ? watchedValue[0].name
      : undefined;

  return (
    <InputContext.Provider
      value={{
        id: finalId,
        name,
        type,
        required,
        disabled,
        isError,
        errors,
        register: register(name),
        fileName,
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
