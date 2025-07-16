import PopoverContent from './PopoverContent';
import PopoverRoot from './PopoverRoot';
import PopoverTrigger from './PopoverTrigger';

/**
 * Popover 컴포넌트 시스템
 *
 * @description
 * 트리거 요소 주변에 떠있는 오버레이 컨텐츠를 표시하는 컴포넌트 시스템입니다.
 *
 * **주요 특징:**
 * - 12가지 방향 위치 지원 (top, bottom, left, right × start, center, end)
 * - Portal을 통한 body 레벨 렌더링으로 z-index 문제 해결
 * - ESC 키와 백드롭 클릭으로 닫기 지원
 * - 접근성(a11y) 속성 포함
 * - 스크롤 환경에서 정확한 위치 계산
 * - max-height 제한으로 긴 컨텐츠 스크롤 지원
 *
 * **컴포넌트 구성:**
 * - `Popover.Root`: Context Provider, 상태 관리
 * - `Popover.Trigger`: 클릭 시 Popover를 열고 닫는 트리거 버튼
 * - `Popover.Content`: 실제 표시되는 오버레이 컨텐츠
 *
 * @component
 * @example
 * ```tsx
 * // 기본 사용법
 * <Popover.Root>
 *   <Popover.Trigger className="px-4 py-2 bg-blue-500 text-white rounded">
 *     클릭하세요
 *   </Popover.Trigger>
 *   <Popover.Content position="bottom-center">
 *     <p>안녕하세요! 저는 Popover입니다.</p>
 *   </Popover.Content>
 * </Popover.Root>
 * ```
 *
 * @example
 * ```tsx
 * // 복잡한 컨텐츠와 다양한 위치
 * <Popover.Root>
 *   <Popover.Trigger>메뉴</Popover.Trigger>
 *   <Popover.Content position="right-start">
 *     <div className="w-48 space-y-2">
 *       <button className="w-full text-left px-3 py-2 hover:bg-gray-100">
 *         프로필 보기
 *       </button>
 *       <button className="w-full text-left px-3 py-2 hover:bg-gray-100">
 *         설정
 *       </button>
 *       <hr />
 *       <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100">
 *         로그아웃
 *       </button>
 *     </div>
 *   </Popover.Content>
 * </Popover.Root>
 * ```
 *
 * @example
 * ```tsx
 * // 폼이 포함된 Popover
 * <Popover.Root>
 *   <Popover.Trigger>사용자 추가</Popover.Trigger>
 *   <Popover.Content position="bottom-center">
 *     <form className="w-64 space-y-4">
 *       <h3 className="font-semibold">새 사용자</h3>
 *       <input type="text" placeholder="이름" className="w-full px-3 py-2 border rounded" />
 *       <input type="email" placeholder="이메일" className="w-full px-3 py-2 border rounded" />
 *       <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded">
 *         저장
 *       </button>
 *     </form>
 *   </Popover.Content>
 * </Popover.Root>
 * ```
 *
 * **Position 옵션:**
 * - `bottom-start`: 아래쪽, 왼쪽 정렬
 * - `bottom-center`: 아래쪽, 중앙 정렬 (기본값)
 * - `bottom-end`: 아래쪽, 오른쪽 정렬
 * - `top-start`: 위쪽, 왼쪽 정렬
 * - `top-center`: 위쪽, 중앙 정렬
 * - `top-end`: 위쪽, 오른쪽 정렬
 * - `left-start`: 왼쪽, 위쪽 정렬
 * - `left-center`: 왼쪽, 중앙 정렬
 * - `left-end`: 왼쪽, 아래쪽 정렬
 * - `right-start`: 오른쪽, 위쪽 정렬
 * - `right-center`: 오른쪽, 중앙 정렬
 * - `right-end`: 오른쪽, 아래쪽 정렬
 *
 * **접근성 지원:**
 * - `aria-expanded`: 트리거의 확장 상태
 * - `aria-haspopup`: 팝업 존재 표시
 * - `aria-controls`: 제어 대상 지정
 * - `role="dialog"`: 다이얼로그 역할
 * - `aria-modal`: 모달 상태
 * - ESC 키로 닫기
 *
 * @version 1.0.0
 * @author RoamReady Team
 */

const Popover = {
  /** Popover의 루트 컴포넌트 (Context Provider) */
  Root: PopoverRoot,
  /** Popover 내용을 표시하는 컴포넌트 */
  Content: PopoverContent,
  /** Popover를 트리거하는 버튼 컴포넌트 */
  Trigger: PopoverTrigger,
};

export default Popover;
