/**
 * @fileoverview Dialog 컴포넌트
 *
 * React Context API를 사용하여 상태를 관리하고, 포커스 트랩, 스크롤 관리 등의 기능을 제공합니다.
 */

import { DialogContent } from './Content';
import { DialogFooter } from './Footer';
import { DialogRoot } from './Root';
import { DialogTrigger } from './Trigger';

/**
 * Dialog 컴포넌트
 *
 * **주요 기능:**
 * - 🔒 **포커스 트랩**: Tab 키를 통한 Dialog 외부 접근 완전 차단
 * - 📜 **스크롤 관리**: Dialog 열리면 배경 스크롤 방지 및 위치 보존
 * - 🌐 **접근성**: ARIA 속성, 스크린 리더 지원
 * - 📱 **반응형**: 모바일/데스크톱 대응
 * - 🎨 **variant**: complete, cancel, review 변형 지원 (기본값: complete)
 * - 🔄 **캡슐화**: 외부 상태 관리 없이 컴포넌트 내부에서 상태 캡슐화
 *
 * **2025. 07. 12 주요 변경사항:**
 * - Zustand 전역 상태 관리 → Context API 기반 로컬 상태 관리로 변경
 * - Dialog 내부 상태 완전 캡슐화, 외부에서 상태 관리 불필요
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * function Component() {
 *   return (
 *     <Dialog.Root>
 *       <Dialog.Trigger>
 *         <button>설정 열기</button>
 *       </Dialog.Trigger>
 *
 *       <Dialog.Content variant="complete">
 *         <CompleteDialogContent />
 *         <Dialog.Footer variant="complete">
 *           <Button>확인</Button>
 *         </Dialog.Footer>
 *       </Dialog.Content>
 *     </Dialog.Root>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // 페이지 로드 시 Dialog 열기
 * <Dialog.Root defaultOpen={true}>
 *   <Dialog.Trigger>
 *     <button>Dialog 열기</button>
 *   </Dialog.Trigger>
 *
 *   <Dialog.Content variant="review">
 *     <ProfileEditor />
 *   </Dialog.Content>
 * </Dialog.Root>
 * ```
 */
export const Dialog = {
  /**
   * Dialog 루트 컴포넌트
   * Dialog 시스템의 컨텍스트를 제공하고 상태를 관리합니다.
   *
   * @see {@link DialogRoot}
   */
  Root: DialogRoot,

  /**
   * Dialog 트리거 컴포넌트
   * 클릭 시 Dialog를 여는 트리거 역할을 합니다.
   *
   * @see {@link DialogTrigger}
   */
  Trigger: DialogTrigger,

  /**
   * Dialog 콘텐츠 컴포넌트
   * 실제 모달 콘텐츠를 렌더링하고 포커스 트랩을 관리합니다.
   *
   * @see {@link DialogContent}
   */
  Content: DialogContent,

  /**
   * Dialog 푸터 컴포넌트
   * 액션 버튼들을 담는 푸터 영역을 제공합니다.
   *
   * @see {@link DialogFooter}
   */
  Footer: DialogFooter,
};
