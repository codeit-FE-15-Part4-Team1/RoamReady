/**
 * Popover 컴포넌트 라이브러리
 *
 * @description
 * 트리거 요소 주변에 오버레이 컨텐츠를 표시하는 Popover 컴포넌트들을 제공합니다.
 *
 * @example
 * ```tsx
 * import { Popover, PopoverTrigger, PopoverContent } from '@/shared/components/ui/popover';
 *
 * function App() {
 *   return (
 *     <Popover>
 *       <PopoverTrigger>클릭하세요</PopoverTrigger>
 *       <PopoverContent position="bottom-center">
 *         <p>Popover 내용</p>
 *       </PopoverContent>
 *     </Popover>
 *   );
 * }
 * ```
 *
 * @module Popover
 */

/** Popover 루트 컴포넌트 - 상태와 컨텍스트를 제공 */
export { default as Popover } from './Popover';

/** Popover 컨텐츠 컴포넌트 - 실제 오버레이 컨텐츠를 렌더링 */
export { default as PopoverContent } from './PopoverContent';

/** Popover 트리거 컴포넌트 - Popover를 열고 닫는 버튼 */
export { default as PopoverTrigger } from './PopoverTrigger';

/** Popover 컨텍스트 사용 훅 - 커스텀 컴포넌트에서 Popover 상태에 접근 */
export { usePopover } from './usePopover';
