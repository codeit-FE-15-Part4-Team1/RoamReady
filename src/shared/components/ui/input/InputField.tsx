'use client';

import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';

import { cn } from '@/shared/libs/cn';

import { useInputContext } from './InputContext';

/**
 * @description
 * `<input>`과 `<textarea>`에서 공통으로 사용할 수 있는 기본 HTML 속성 타입입니다.
 * `react-hook-form`의 `register` 함수가 `onChange`, `name`, `ref`, `value` 속성을 관리하므로,
 * 이 속성들은 `BaseFieldProps`에서 제외됩니다.
 */
type BaseFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'name' | 'ref' | 'value'
> &
  Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onChange' | 'name' | 'ref' | 'value'
  >;

/**
 * @interface FieldProps
 * @description
 * `Input.Field` 컴포넌트에 전달되는 props입니다.
 *
 * @property {ReactNode} [leftIcon] - 입력창 왼쪽에 표시할 아이콘 요소입니다.
 * @property {ReactNode} [rightIcon] - 입력창 오른쪽에 표시할 아이콘 요소입니다.
 * (참고: `register` 및 `onChange`는 `InputContext`를 통해 `Input.Root`에서 제공되므로 직접적인 prop이 아닙니다.)
 */
interface FieldProps extends BaseFieldProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/**
 * @component Field
 * @description
 * `<input>`, `<textarea>`, `<input type="file">`를 포함한 다양한 입력 타입을 지원하는 핵심 필드 컴포넌트입니다.
 * `Input.Root` 내부에서 사용되며, `useInputContext` 훅을 통해 `Input.Root`에서 제공하는
 * `id`, `type`, `required`, `disabled`, `isError`, `maxLength`, `isPasswordVisible`,
 * 그리고 `react-hook-form`의 `register` 객체 등의 정보를 자동으로 가져와 사용합니다.
 *
 * `register` 객체를 내부 `<input>`/`<textarea>` 요소에 스프레드(`{...register}`)함으로써,
 * `react-hook-form`이 필드의 값, 유효성 검사, 변경 이벤트(`onChange`), 포커스(`onBlur`), 참조(`ref`) 등을 자동으로 관리합니다.
 *
 * 타입에 따라 다음과 같이 렌더링됩니다:
 * - `text`, `password`, `email` 등: 표준 `<input>` 요소
 * - `textarea`: 크기 조절이 불가능한 `<textarea>` 요소
 * - `file`: 숨겨진 `<input type="file">` 요소 (대체 UI는 `Input.Trigger`가 제공)
 *
 * @param {FieldProps} props - 입력 필드에 적용할 속성입니다.
 * @returns {JSX.Element} 조건에 따라 알맞은 HTML 입력 요소를 렌더링합니다.
 *
 * @example
 * ```tsx
 * Input.Root 내부에서 Input.Field 사용 (register 등은 Context에서 자동 연결)
 * <Input.Root name="userEmail" id="email-field" type="email" required>
 * <Input.Label>이메일</Input.Label>
 * <Input.Field placeholder="이메일 주소를 입력하세요" />
 * <Input.Helper />
 * </Input.Root>
 *
 * 비밀번호 필드와 오른쪽 아이콘 (트리거) 예시
 * <Input.Root name="userPassword" id="password-field" type="password">
 * <Input.Label>비밀번호</Input.Label>
 * <Input.Field
 * placeholder="비밀번호를 입력해주세요"
 * rightIcon={<Input.Trigger triggerType="password-toggle" />}
 * />
 * <Input.Helper />
 * </Input.Root>
 * ```
 */
export default function InputField(props: FieldProps) {
  const {
    id,
    type,
    required,
    disabled,
    isError,
    maxLength,
    isPasswordVisible,
    register,
  } = useInputContext();

  const { className, placeholder, leftIcon, rightIcon, ...rest } = props;

  const baseStyle = cn(
    'font-size-16 w-full border rounded-2xl px-20 py-17.5',
    isError ? 'border-red' : 'border-gray-100',
    disabled ? 'cursor-not-allowed' : 'cursor-text',
  );

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  if (type === 'textarea') {
    return (
      <textarea
        id={id}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        className={cn(baseStyle, 'resize-none', className)}
        {...rest}
        {...register}
      />
    );
  }

  if (type === 'file') {
    return (
      <input
        id={id}
        type='file'
        required={required}
        disabled={disabled}
        className='hidden'
        {...rest}
        {...register}
      />
    );
  }

  return (
    <div className='relative flex w-full items-center'>
      {leftIcon && (
        <div className='absolute top-1/2 left-10 flex translate-x-1/2 -translate-y-1/2 items-center justify-center'>
          {leftIcon}
        </div>
      )}
      <input
        id={id}
        type={inputType}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={cn(baseStyle, className)}
        {...rest}
        {...register}
      />
      {rightIcon && (
        <div className='absolute top-1/2 right-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center'>
          {rightIcon}
        </div>
      )}
    </div>
  );
}
