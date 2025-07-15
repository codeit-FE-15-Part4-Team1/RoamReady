import { ReactNode, useEffect } from 'react';

import { cn } from '../../../libs/cn';
import { useSelect } from './SelectContext';

/**
 * 드롭다운 컨텐츠 컨테이너 컴포넌트
 * SelectItem들을 포함하며, 백드롭 클릭 시 드롭다운이 닫힙니다.
 *
 * @param children - 드롭다운 내부에 표시될 SelectItem들
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * <SelectContent>
 *   <SelectItem value="option1">옵션 1</SelectItem>
 *   <SelectItem value="option2">옵션 2</SelectItem>
 * </SelectContent>
 * ```
 */
export default function SelectContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { isOpen, setIsOpen, setFocusedIndex } = useSelect();

  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(0); // 첫 번째 옵션을 기본으로 선택
    } else {
      setFocusedIndex(-1);
    }
  }, [isOpen, setFocusedIndex]);

  return (
    <>
      {/* 백드롭 */}
      {isOpen && (
        <div
          className='fixed inset-0 z-90'
          onClick={() => setIsOpen(false)}
          role='presentation'
          aria-hidden='true'
        />
      )}
      {/* 드롭다운 */}
      {isOpen && (
        <div
          role='listbox'
          className={cn(
            'absolute top-full right-0 left-0 z-100 mt-1 max-h-[30rem] overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300',
            className,
          )}
        >
          {children}
        </div>
      )}
    </>
  );
}
