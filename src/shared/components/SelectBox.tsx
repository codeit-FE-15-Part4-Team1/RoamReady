import { ChevronDownIcon } from 'lucide-react';
import { createContext, useContext, useState } from 'react';

import { cn } from '../libs/cn';

/**
 * SelectBox 컴포넌트의 Context 타입 정의
 */

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  disabled?: boolean;
}

/**
 * SelectBox 컴포넌트의 Props 타입 정의
 */
interface SelectBoxProps {
  /** 현재 선택된 값 */
  value?: string;
  /** 값이 변경될 때 호출되는 콜백 함수 */
  onValueChange?: (value: string) => void;
  /** SelectBox의 자식 컴포넌트들 */
  children: React.ReactNode;
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 전체 SelectBox 비활성화 여부 */
  disabled?: boolean;
}

// 컨텍스트 생성
const SelectContext = createContext<SelectContextValue | null>(null);

// 컨텍스트 사용
const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within SelectBox');
  }
  return context;
};

/**
 * SelectBox의 트리거 버튼 컴포넌트
 * 클릭하면 드롭다운이 열리거나 닫힙니다.
 *
 * @param children - 트리거 내부에 표시될 내용 (보통 SelectValue)
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * <SelectBox.Trigger>
 *   <SelectBox.Value placeholder="선택하세요" />
 * </SelectBox.Trigger>
 * ```
 */
const SelectTrigger = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { isOpen, setIsOpen, disabled } = useSelectContext();
  return (
    <button
      disabled={disabled}
      className={cn(
        'border-black-100 flex w-full cursor-pointer items-center justify-between rounded-2xl border-2 border-black px-24 py-12 text-gray-400 transition-colors',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      onClick={() => !disabled && setIsOpen(!isOpen)}
    >
      {children}
      <ChevronDownIcon
        className={cn(
          'size-20 text-black transition-transform duration-200',
          isOpen && 'rotate-180',
        )}
      />
    </button>
  );
};

/**
 * 현재 선택된 값 또는 placeholder를 표시하는 컴포넌트
 *
 * @param placeholder - 값이 선택되지 않았을 때 표시할 텍스트
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * <SelectBox.Value placeholder="카테고리를 선택하세요" />
 * ```
 */
const SelectValue = ({
  placeholder = '선택해주세요.',
  className,
}: {
  placeholder?: string;
  className?: string;
}) => {
  const { value } = useSelectContext();
  return (
    <span className={cn(value ? 'text-black' : 'text-gray-400', className)}>
      {value || placeholder}
    </span>
  );
};

/**
 * 드롭다운 컨텐츠 컨테이너 컴포넌트
 * SelectItem들을 포함하며, 백드롭 클릭 시 드롭다운이 닫힙니다.
 *
 * @param children - 드롭다운 내부에 표시될 SelectItem들
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * <SelectBox.Content>
 *   <SelectBox.Item value="option1">옵션 1</SelectBox.Item>
 *   <SelectBox.Item value="option2">옵션 2</SelectBox.Item>
 * </SelectBox.Content>
 * ```
 */
const SelectContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { isOpen, setIsOpen } = useSelectContext();

  return (
    <>
      {/* 백드롭 */}
      {isOpen && (
        <div
          className='fixed inset-0 z-10'
          onClick={() => setIsOpen(false)}
          role='presentation'
        />
      )}
      {/* 드롭다운 */}
      <div
        className={cn(
          'absolute top-full right-0 left-0 z-20 mt-1 rounded border bg-white shadow-lg transition-all duration-300',
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0',
          className,
        )}
      >
        {children}
      </div>
    </>
  );
};

/**
 * 개별 선택 옵션 컴포넌트
 * 클릭 시 해당 값으로 선택되고 드롭다운이 닫힙니다.
 *
 * @param value - 선택 시 설정될 값
 * @param children - 옵션에 표시될 내용
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * <SelectBox.Item value="travel">🧳 여행</SelectBox.Item>
 * <SelectBox.Item value="food">🍽️ 음식</SelectBox.Item>
 * ```
 */
const SelectItem = ({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const { onValueChange, setIsOpen, disabled } = useSelectContext();

  const handleClick = () => {
    if (disabled) return;
    onValueChange?.(value);
    setIsOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'h-fit w-full cursor-pointer px-24 py-12 text-left transition-colors hover:bg-gray-100',
        disabled && 'cursor-not-allowed opacity-50 hover:bg-transparent',
        className,
      )}
    >
      {children}
    </button>
  );
};

/**
 * shadcn 스타일의 합성 컴포넌트 패턴을 사용한 SelectBox
 * 드롭다운 선택 UI를 제공하며, Context API를 통해 상태를 관리합니다.
 *
 * @param value - 현재 선택된 값
 * @param onValueChange - 값 변경 시 호출되는 콜백 함수
 * @param children - SelectBox의 자식 컴포넌트들 (Trigger, Content 등)
 * @param className - 추가 CSS 클래스명
 * @param disabled - 전체 SelectBox 비활성화 여부
 *
 * @example
 * // 기본 사용법
 * ```tsx
 * const [category, setCategory] = useState('');
 *
 * <SelectBox value={category} onValueChange={setCategory}>
 *   <SelectBox.Trigger>
 *     <SelectBox.Value placeholder="카테고리를 선택하세요" />
 *   </SelectBox.Trigger>
 *   <SelectBox.Content>
 *     <SelectBox.Item value="travel">여행</SelectBox.Item>
 *     <SelectBox.Item value="food">음식</SelectBox.Item>
 *     <SelectBox.Item value="culture">문화</SelectBox.Item>
 *   </SelectBox.Content>
 * </SelectBox>
 * ```
 */
export default function SelectBox({
  value,
  onValueChange,
  children,
  className,
  disabled,
}: SelectBoxProps) {
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

/**
 * 합성 컴포넌트 패턴을 위한 서브 컴포넌트들을 메인 컴포넌트에 연결
 * 이를 통해 SelectBox.Trigger, SelectBox.Value 등의 사용이 가능해집니다.
 */
SelectBox.Trigger = SelectTrigger;
SelectBox.Value = SelectValue;
SelectBox.Content = SelectContent;
SelectBox.Item = SelectItem;
