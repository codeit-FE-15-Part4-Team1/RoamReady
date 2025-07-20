import { useContext } from 'react';

import { PopoverContext } from './PopoverRoot';

/**
 * Popover 컨텍스트를 사용하기 위한 커스텀 훅
 *
 * @description
 * - Popover 컴포넌트 내부에서 상태와 ref에 접근하기 위한 훅
 * - PopoverTrigger와 PopoverContent에서 공통으로 사용
 * - Popover 컴포넌트 외부에서 사용 시 에러 발생
 *
 * @hook
 * @example
 * ```tsx
 * function CustomTrigger() {
 *   const { isOpen, setIsOpen, triggerRef } = usePopover();
 *
 *   return (
 *     <button
 *       ref={triggerRef}
 *       onClick={() => setIsOpen(!isOpen)}
 *     >
 *       {isOpen ? '닫기' : '열기'}
 *     </button>
 *   );
 * }
 * ```
 *
 * @returns {PopoverContextType} Popover 컨텍스트 값
 * @throws {Error} Popover 컴포넌트 외부에서 사용 시 에러 발생
 */
export const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error(
      'PopoverTrigger/PopoverContent 컴포넌트는 Popover 내부에서 사용해야 합니다.',
    );
  }
  return context;
};
