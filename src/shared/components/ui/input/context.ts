'use client';

import { createContext, HTMLInputTypeAttribute, useContext } from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

/**
 * @interface InputContextProps
 * @description
 * `InputContext`를 통해 하위 컴포넌트들에게 전달되는 입력 상태 정보입니다.
 * 이 속성들은 주로 `Input.Root` 컴포넌트에서 `react-hook-form`의 상태를 기반으로 파생되거나 직접 제공됩니다.
 *
 * @property {string} id - 연결될 입력 요소의 HTML `id` 속성입니다. (`Input.Root`에서 고유하게 생성되거나 prop으로 전달받음)
 * @property {HTMLInputTypeAttribute | 'textarea'} type - 입력 필드의 타입입니다 (예: 'text', 'password', 'file', 'textarea' 등). (`Input.Root`의 prop으로 전달받음)
 * @property {boolean} [required] - 입력 필드의 필수 여부입니다. (`Input.Root`의 prop으로 전달받음)
 * @property {boolean} [disabled] - 입력 필드의 비활성화 여부입니다. (`Input.Root`의 prop으로 전달받음)
 * @property {boolean} [isError] - 입력 필드의 에러 상태 여부입니다. (`Input.Root`에서 `errors` 객체를 기반으로 파생됨)
 * @property {string} [name] - `react-hook-form`에 등록된 필드의 이름입니다. (`Input.Root`의 prop으로 필수로 전달받음)
 * @property {FieldErrors} [errors] - `react-hook-form`의 `formState.errors` 객체입니다. (`Input.Root`에서 `useFormContext`를 통해 제공)
 * @property {UseFormRegisterReturn} [register] - `react-hook-form`의 `register(name)` 호출 결과 객체입니다. (`Input.Root`에서 `useFormContext`를 통해 생성하여 제공)
 * @property {string} [fileName] - `type`이 'file'일 때 선택된 파일의 이름입니다. (`Input.Root`에서 `useWatch`를 통해 파생됨)
 * @property {number} [maxLength] - 입력 필드의 최대 길이(문자 수)입니다. (`Input.Root`의 prop으로 전달받음)
 * @property {number} [currentLength] - 현재 입력된 문자열의 길이입니다. (`Input.Root`에서 `useWatch`를 통해 파생됨)
 * @property {string} [fallbackMessage] - 파일 업로드 `Trigger`에 표시할 기본 안내 메시지입니다. (`Input.Root`의 prop으로 전달받음)
 * @property {boolean} isPasswordVisible - 비밀번호 입력 필드의 가시성 상태입니다. (`Input.Root`에서 관리하는 내부 상태)
 * @property {() => void} togglePasswordVisibility - 비밀번호 가시성을 토글하는 함수입니다. (`Input.Root`에서 관리하는 내부 함수)
 */
export interface InputContextProps {
  id: string;
  type: HTMLInputTypeAttribute | 'textarea';
  required?: boolean;
  disabled?: boolean;
  isError?: boolean;
  name?: string;
  errors?: FieldErrors;
  register?: UseFormRegisterReturn;
  fileName?: string;
  maxLength?: number;
  currentLength?: number;
  fallbackMessage?: string;
  isPasswordVisible?: boolean;
  togglePasswordVisibility?: () => void;
}

/**
 * @description
 * `Input` 컴포넌트 패밀리에서 공통 입력 상태를 공유하기 위한 React Context 객체입니다.
 * 반드시 `<Input.Root>`를 통해 설정된 context 내부에서만 사용되어야 합니다.
 */
export const InputContext = createContext<InputContextProps | null>(null);

/**
 * @function useInputContext
 * @description
 * `InputContext`의 값을 가져오는 커스텀 훅입니다.
 * 이 훅은 `<Input.Root>` 내부에서만 호출되어야 하며,
 * 외부에서 사용할 경우 명시적인 에러를 throw합니다.
 *
 * @throws {Error} InputContext가 null인 경우 에러 발생
 * @returns {InputContextProps} context로부터 전달된 입력 필드의 상태 값들
 *
 * @example
 * ```tsx
 * Input.Root의 자식 컴포넌트 내부에서 사용
 * const { id, type, required, isError, isPasswordVisible, togglePasswordVisibility } = useInputContext();
 * ```
 */
export const useInputContext = () => {
  const context = useContext(InputContext);
  if (!context)
    throw new Error(
      'Input 컴포넌트는 반드시 <Input.Root> 안에서 사용되어야 합니다.',
    );
  return context;
};
