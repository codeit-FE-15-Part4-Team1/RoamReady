'use client';

import { Plus } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

import { useInputContext } from './InputContext';

interface TriggerProps {
  children?: ReactNode;
  className?: string;
  triggerType?: 'password-toggle' | 'file-upload' | 'other';
}

/**
 * @component Trigger
 * @description
 * `Input.Root` 내에서 특정 입력 타입에 대한 사용자 정의 트리거 버튼을 렌더링합니다.
 * 지원하는 트리거 타입:
 * - `type="password-toggle"`: 비밀번호 필드의 가시성(보이기/숨기기)을 토글하는 눈 아이콘 버튼을 제공합니다.
 * (이 트리거는 `Input.Root`의 `type`이 'password'일 때만 유효하게 동작합니다.)
 * - `type="file-upload"`: 숨겨진 `<input type="file">`을 클릭하도록 연결되어 파일 업로드 UI를 제공합니다.
 * (이 트리거는 `Input.Root`의 `type`이 'file'일 때만 유효하게 동작합니다.)
 * - `type="other"`: 그 외의 범용적인 트리거 버튼. `children`으로 전달된 내용을 렌더링합니다.
 *
 * `children`을 통해 커스텀 트리거 UI를 정의하거나, 특정 타입(`file-upload`의 경우)은 기본 UI를 렌더링합니다.
 * 접근성을 고려해 `<button>` 태그를 사용하며, 기본 키보드 이벤트(Enter, Space)를 지원합니다.
 *
 * @param {TriggerProps} props - 트리거 버튼에 적용할 속성
 * @param {ReactNode} [props.children] - 트리거로 표시될 사용자 정의 UI 요소. (`file-upload` 타입은 기본 UI 제공)
 * @param {string} [props.className] - 외부에서 전달할 클래스 이름
 * @param {'password-toggle' | 'file-upload' | 'other'} [props.type] - 트리거의 목적을 정의하는 타입. 기본값은 'other'.
 *
 * @returns {JSX.Element | null} 조건에 따라 알맞은 트리거 버튼 요소를 렌더링하거나, 유효하지 않은 경우 `null`을 반환합니다.
 */
export default function InputTrigger({
  children,
  className,
  triggerType = 'other',
  ...props
}: TriggerProps) {
  const {
    id,
    type: contextType,
    disabled,
    fileName,
    fallbackMessage,
    isPasswordVisible,
    togglePasswordVisibility,
  } = useInputContext();

  if (triggerType === 'password-toggle' && contextType === 'password') {
    return (
      <button
        type='button'
        aria-label={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
        aria-controls={id}
        onClick={togglePasswordVisibility}
        disabled={disabled}
        className={cn(
          'absolute inset-y-0 right-0 flex cursor-pointer items-center',
          className,
        )}
        {...props}
      >
        {isPasswordVisible ? (
          <Eye className='h-24 w-24 text-gray-500' />
        ) : (
          <EyeOff className='h-24 w-24 text-gray-500' />
        )}
      </button>
    );
  }

  if (triggerType === 'file-upload' && contextType === 'file') {
    const handleClick = () => {
      if (disabled) return;
      const fileInput = document.getElementById(id) as HTMLInputElement | null;
      if (fileInput) {
        fileInput.click();
      }
    };

    return (
      <button
        type='button'
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        disabled={disabled}
        className={cn(
          'cursor-pointer',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
        {...props}
      >
        {children ?? (
          <div className='flex h-full flex-col items-center justify-center gap-4 text-gray-400'>
            <Plus size={24} />
            <span className='font-size-12 mt-10'>
              {fileName ?? fallbackMessage ?? ''}
            </span>
          </div>
        )}
      </button>
    );
  }

  if (triggerType === 'other') {
    return (
      <button
        type='button'
        disabled={disabled}
        className={cn(
          'absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  }

  return null;
}
