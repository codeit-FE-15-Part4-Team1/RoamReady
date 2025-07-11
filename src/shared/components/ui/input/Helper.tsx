import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

import { useInputContext } from './context';

/**
 * @interface HelperProps
 * @description
 * `Input.Helper` 컴포넌트에 전달되는 props입니다.
 *
 * @property {ReactNode} children - 표시할 메시지 내용
 * @property {string} [className] - 사용자 정의 클래스 이름 (선택)
 */
interface HelperProps {
  children?: ReactNode;
  className?: string;
}

/**
 * @component Helper
 * @description
 * 입력 필드 하단에 안내 메시지를 표시하는 컴포넌트입니다.
 * `useInputContext`를 통해 `isError` 상태를 받아와,
 * 에러 상태일 경우 빨간색(`text-red`), 아닐 경우 회색(`text-gray-800`)으로 메시지를 렌더링합니다.
 *
 * - **안내 메시지**: `children` prop으로 전달된 메시지를 표시합니다.
 * - **문자 수 표시**:
 * `Input.Root`를 통해 `maxLength`와 `currentLength`가 제공되고
 * `type`이 'textarea'인 경우, 현재 입력된 문자 수와 최대 문자 수를 자동으로 계산하여 필드 오른쪽에 표시합니다.
 *
 * 주로 유효성 검사 메시지, 도움말 문구,  문자 수 카운터 등 사용자에게 추가 정보를 전달할 때 사용됩니다.
 *
 * @param {ReactNode} children - 표시할 메시지 내용
 * @param {string} [className] - 사용자 정의 클래스 이름
 *
 * @returns {JSX.Element} 조건에 따라 안내 메시지 또는 문자 수 카운터를 렌더링합니다.
 *
 * @example
 * ```tsx
 * <Input.Root id="email" type="text" isError>
 *   <Input.Label>이메일</Input.Label>
 *   <Input.Field placeholder="이메일을 입력하세요" />
 *   <Input.Helper>이메일 형식이 올바르지 않습니다.</Input.Message>
 * </Input.Root>
 * ```
 */
function Helper({ children, className }: HelperProps) {
  const { isError, type, maxLength, currentLength } = useInputContext();
  const isTextArea = type === 'textarea';
  return (
    <>
      {children && (
        <p
          className={cn(
            'font-size-16',
            isError ? 'text-red' : 'text-gray-800',
            className,
          )}
        >
          {children}
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

export default Helper;
