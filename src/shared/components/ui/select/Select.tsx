import { ReactNode, useState } from 'react';

import { cn } from '../../../libs/cn';
import { SelectContext } from './useSelect';

/**
 * SelectBox 컴포넌트의 Props 타입 정의
 */
interface SelectProps {
  /** 현재 선택된 값 */
  value?: string;
  /** 값이 변경될 때 호출되는 콜백 함수 */
  onValueChange?: (value: string) => void;
  /** SelectBox의 자식 컴포넌트들 */
  children: ReactNode;
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 전체 SelectBox 비활성화 여부 */
  disabled?: boolean;
}

/**
 * shadcn 스타일의 Select 컴포넌트
 * 드롭다운 선택 UI를 제공하며, Context API를 통해 상태를 관리합니다.
 *
 * @param value - 현재 선택된 값
 * @param onValueChange - 값 변경 시 호출되는 콜백 함수
 * @param children - Select의 자식 컴포넌트들 (SelectTrigger, SelectContent 등)
 * @param className - 추가 CSS 클래스명
 * @param disabled - 전체 Select 비활성화 여부
 *
 * @example
 * // 기본 사용법
 * ```tsx
 * import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/components/ui/select';
 *
 * const [category, setCategory] = useState('');
 *
 * <Select value={category} onValueChange={setCategory}>
 *   <SelectTrigger>
 *     <SelectValue placeholder="카테고리를 선택하세요" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="travel">여행</SelectItem>
 *     <SelectItem value="food">음식</SelectItem>
 *     <SelectItem value="culture">문화</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
export default function Select({
  value,
  onValueChange,
  children,
  className,
  disabled,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange,
        isOpen,
        setIsOpen,
        disabled,
      }}
    >
      <div className={cn('relative', className)}>{children}</div>
    </SelectContext.Provider>
  );
}
