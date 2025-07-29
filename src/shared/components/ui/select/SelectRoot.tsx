import { ReactNode, useEffect, useState } from 'react';

import { cn } from '../../../libs/cn';
import { SelectContext } from './SelectContext';

/**
 * SelectBox 컴포넌트의 Props 타입 정의
 */
interface SelectProps {
  /** 현재 선택된 값 (제어 컴포넌트용) */
  value?: string;
  /** 초기 값 (비제어 컴포넌트용) */
  defaultValue?: string;
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
 * 제어 컴포넌트(value prop 사용)와 비제어 컴포넌트(defaultValue 사용)를 모두 지원합니다.
 *
 * @param value - 현재 선택된 값 (제어 컴포넌트). 외부 상태로 값을 관리합니다.
 * @param defaultValue - 초기 값 (비제어 컴포넌트). 내부 상태로 값을 관리합니다.
 * @param onValueChange - 값 변경 시 호출되는 콜백 함수
 * @param children - Select의 자식 컴포넌트들 (Select.Trigger, Select.Content 등)
 * @param className - 추가 CSS 클래스명
 * @param disabled - 전체 Select 비활성화 여부
 *
 * @example
 * // 제어 컴포넌트 사용법
 * ```tsx
 * import { useState } from 'react';
 * import Select from '@/shared/components/ui/select';
 *
 * const Example = () => {
 *   const [category, setCategory] = useState('travel');
 *
 *   return (
 *     <Select.Root value={category} onValueChange={setCategory}>
 *       <Select.Trigger>
 *         <Select.Value placeholder="카테고리를 선택하세요" />
 *       </Select.Trigger>
 *       <Select.Content>
 *         <Select.Item value="travel">여행</Select.Item>
 *         <Select.Item value="food">음식</Select.Item>
 *         <Select.Item value="culture">문화</Select.Item>
 *       </Select.Content>
 *     </Select.Root>
 *   );
 * };
 * ```
 *
 * @example
 * // 비제어 컴포넌트 사용법
 * ```tsx
 * import Select from '@/shared/components/ui/select';
 *
 * const Example = () => {
 *   return (
 *     <Select.Root defaultValue="travel" onValueChange={(value) => console.log(value)}>
 *       <Select.Trigger>
 *         <Select.Value placeholder="카테고리를 선택하세요" />
 *       </Select.Trigger>
 *       <Select.Content>
 *         <Select.Item value="travel">여행</Select.Item>
 *         <Select.Item value="food">음식</Select.Item>
 *         <Select.Item value="culture">문화</Select.Item>
 *       </Select.Content>
 *     </Select.Root>
 *   );
 * };
 * ```
 */
export default function SelectRoot({
  value,
  defaultValue,
  onValueChange,
  children,
  className,
  disabled,
}: SelectProps) {
  // 비제어 모드에서 사용할 내부 상태
  const [innerValue, setInnerValue] = useState(defaultValue ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);

  // 제어 모드인지 비제어 모드인지 확인
  const isControlled = value !== undefined;

  // 실제로 사용할 값 (제어 모드면 value, 비제어 모드면 innerValue)
  const currentValue = isControlled ? value : innerValue;

  // 값 변경 핸들러
  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInnerValue(newValue);
    }
    onValueChange?.(newValue);
  };

  // defaultValue가 변경될 때 비제어 모드에서만 반영
  useEffect(() => {
    if (!isControlled && defaultValue !== undefined) {
      setInnerValue(defaultValue);
    }
  }, [defaultValue, isControlled]);

  return (
    <SelectContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        isOpen,
        setIsOpen,
        disabled,
        focusedIndex,
        setFocusedIndex,
        options,
        setOptions,
      }}
    >
      <div className={cn('relative', className)}>{children}</div>
    </SelectContext.Provider>
  );
}
