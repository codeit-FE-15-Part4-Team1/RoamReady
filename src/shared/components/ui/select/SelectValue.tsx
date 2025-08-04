import { cn } from '../../../libs/cn';
import { useSelect } from './SelectContext';

/**
 * 현재 선택된 값 또는 placeholder를 표시하는 컴포넌트
 *
 * @param placeholder - 값이 선택되지 않았을 때 표시할 텍스트
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * <SelectValue placeholder="카테고리를 선택하세요" />
 * ```
 */
export default function SelectValue({
  placeholder = '선택해주세요.',
  className,
  children,
}: {
  placeholder?: string;
  className?: string;
  children?: string;
}) {
  const { value } = useSelect();

  return (
    <span className={cn(value ? 'text-black' : 'text-gray-400', className)}>
      {children?.trim() ? children : value || placeholder}
    </span>
  );
}
