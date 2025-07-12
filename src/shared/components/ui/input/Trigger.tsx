import { Plus } from 'lucide-react';
import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

import { useInputContext } from './context';

interface TriggerProps {
  children?: ReactNode;
  className?: string;
}

/**
 * @component Trigger
 * @description
 * `type="file"`인 `Input.Field`에 대한 사용자 정의 트리거 버튼입니다.
 * 이 버튼은 숨겨진 `<input type="file">`을 클릭하도록 연결되어 있으며,
 * `children`을 통해 커스텀 트리거 UI를 정의하거나, 제공되지 않을 경우 기본 UI(아이콘 + fallbackText)를 렌더링합니다.
 * 접근성을 고려해 `<button>` 태그를 사용하며, 기본 키보드 이벤트(Enter, Space)를 지원합니다.
 *
 * @param {TriggerProps} props - 트리거 버튼에 적용할 속성
 * @param {ReactNode} [props.children] - 트리거로 표시될 사용자 정의 UI 요소. 제공되지 않으면 기본 UI가 렌더링됩니다.
 * @param {string} [props.className] - 외부에서 전달할 클래스 이름
 * @param {string} [props.fallbackText] - `children`이 없고 미리보기 이미지가 없을 때 표시할 기본 텍스트.
 *
 * @returns {JSX.Element} 파일 업로드 트리거 역할을 하는 버튼 요소
 */
export default function Trigger({ children, className }: TriggerProps) {
  const { id, type, disabled, fileName, fallbackMessage } = useInputContext();

  if (type !== 'file') {
    console.warn(`<Input.Trigger>는 type="file"인 경우에만 사용하세요.`);
    return null;
  }

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
          handleClick();
        }
      }}
      className={cn(
        'cursor-pointer',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
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
