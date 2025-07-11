import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';

import { cn } from '@/shared/libs/cn';

import { useInputContext } from './context';

/**
 * @description
 * `<input>`과 `<textarea>`에서 공통으로 사용할 수 있는 기본 속성 타입입니다.
 * `onChange`는 제거되어 별도로 정의합니다.
 */
type BaseFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>;

/**
 * @interface FieldProps
 * @description
 * `Field` 컴포넌트에 전달되는 props입니다.
 *
 * @property {ReactNode} [leftIcon] - 입력창 왼쪽에 표시할 아이콘 요소
 * @property {ReactNode} [rightIcon] - 입력창 오른쪽에 표시할 아이콘 요소
 * @property {(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void} [onChange] - 값 변경 시 호출되는 핸들러
 */
interface FieldProps extends BaseFieldProps {
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/**
 * @component Field
 * @description
 * `<input>`, `<textarea>`, `<input type="file">`를 포함한 다양한 입력 타입을 지원하는 컴포넌트입니다.
 * `Input.Root` 내부에서 context를 통해 전달된 `id`, `type`, `required`, `disabled`, `isError` 등의 정보를 기반으로
 * 입력 UI를 렌더링하며, 아이콘 삽입 및 스타일 커스터마이징을 지원합니다.
 *
 * 타입에 따라 다음과 같이 렌더링됩니다:
 * - `text`, `password`, `email` 등: 기본 `<input>` 요소
 * - `textarea`: 크기 조절이 불가능한 `<textarea>` 요소
 * - `file`: 사용자 친화적인 `<label>` 기반 커스텀 파일 업로더 UI
 *
 * @param {FieldProps} props - 입력 필드에 적용할 속성
 * @param {ReactNode} [props.leftIcon] - 입력창 왼쪽에 표시할 아이콘 요소
 * @param {ReactNode} [props.rightIcon] - 입력창 오른쪽에 표시할 아이콘 요소
 * @param {(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void} [props.onChange] - 입력 값 변경 시 호출될 핸들러
 *
 * @returns {JSX.Element} 조건에 따라 알맞은 입력 컴포넌트를 렌더링합니다.
 *
 * @example
 * <Example>과 test/input에서 다양한 입력 필드 예시를 확인할 수 있습니다.
 */
function Field(props: FieldProps) {
  const {
    id,
    type,
    required,
    disabled,
    isError,
    fileName,
    handleFileChange,
    maxLength,
  } = useInputContext();
  const baseStyle = cn(
    'cursor-pointer font-size-16 w-full rounded border rounded-2xl px-20 py-16',
    isError ? 'border-red' : 'border-gray-100',
  );
  const {
    className,
    placeholder,
    leftIcon,
    rightIcon,
    onChange,
    value,
    ...rest
  } = props;

  if (type === 'textarea') {
    return (
      <textarea
        id={id}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        value={value}
        maxLength={maxLength}
        {...rest}
        className={cn(baseStyle, 'resize-none', className)}
      />
    );
  }

  if (type === 'file') {
    return (
      <label
        htmlFor={id}
        className={cn(
          baseStyle,
          'font-size-16',
          'flex items-center',
          !fileName ? 'text-gray-400' : 'text-gray-950',
          className,
        )}
      >
        <span>{fileName || placeholder || '파일을 선택하세요'}</span>

        <input
          id={id}
          type='file'
          required={required}
          disabled={disabled}
          onChange={handleFileChange}
          className='hidden'
          {...rest}
        />
      </label>
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
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        value={value}
        {...rest}
        className={cn(baseStyle, className)}
      />
      {rightIcon && (
        <div className='absolute top-1/2 right-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center'>
          {rightIcon}
        </div>
      )}
    </div>
  );
}

export default Field;
