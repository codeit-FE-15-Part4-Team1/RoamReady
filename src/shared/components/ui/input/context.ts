'use client';

import {
  ChangeEvent,
  createContext,
  HTMLInputTypeAttribute,
  useContext,
} from 'react';

/**
 * @interface InputContextProps
 * @description
 * `InputContext`를 통해 하위 컴포넌트들에게 전달되는 입력 상태 정보입니다.
 *
 * @property {string} id - 연결될 입력 요소의 ID
 * @property {HTMLInputTypeAttribute | 'textarea'} type - 입력 필드 타입 (예: 'text', 'password', 'file', 'textarea' 등)
 * @property {boolean} [required] - 필수 입력 여부
 * @property {boolean} [disabled] - 비활성화 여부
 * @property {boolean} [isError] - 에러 상태 여부
 * @property {string} [fileName] - 업로드된 파일 이름 (type이 'file'일 때 사용)
 * @property {(e: ChangeEvent<HTMLInputElement>) => void} [handleFileChange] - 파일 업로드용 이벤트 핸들러
 * @property {number} [maxLength] - 입력 필드의 최대 길이 (textarea에 사용)
 * @property {number} [currentLength] - 현재 입력된 문자열의 길이 (textarea에 사용)
 * @property {string} [fallbackMessage] - 파일 업로드 `Trigger`에 표시할 기본 안내 메시지 (ex. '이미지를 업로드하세요')
 * @property {boolean} isPasswordVisible - 비밀번호 가시성 상태
 * @property {() => void} togglePasswordVisibility - 비밀번호 가시성을 토글하는 함수
 */
export interface InputContextProps {
  id: string;
  type: HTMLInputTypeAttribute | 'textarea';
  required?: boolean;
  disabled?: boolean;
  isError?: boolean;
  fileName?: string;
  handleFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
