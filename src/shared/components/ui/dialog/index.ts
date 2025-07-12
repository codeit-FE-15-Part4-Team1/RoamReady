/**
 * @fileoverview Dialog 컴포넌트 시스템
 *
 * 접근성과 UX를 고려한 모달 Dialog 컴포넌트 시스템입니다.
 * React Portal, 포커스 트랩, 스크롤 관리 등의 기능을 제공합니다.
 *
 * @author RoamReady Team
 * @version 1.0.0
 */

import { DialogContent } from './Content';
import { DialogFooter } from './Footer';
import { DialogRoot, useDialogActions } from './Root';
import { DialogTrigger } from './Trigger';

/**
 * Dialog 컴포넌트 시스템
 *
 * 접근성과 사용성을 고려한 모달 Dialog 구현체입니다.
 * Compound Component 패턴을 사용하여 선언적이고 직관적인 API를 제공합니다.
 *
 * **주요 기능:**
 * - 🎯 **자동 ID 관리**: useId()를 통한 고유 ID 자동 생성
 * - 🔒 **포커스 트랩**: Tab 키를 통한 모달 외부 접근 완전 차단
 * - 📜 **스크롤 관리**: 모달 열림 시 배경 스크롤 방지 및 위치 보존
 * - ⌨️ **키보드 지원**: ESC 키 닫기, Tab/Shift+Tab 순환 탐색
 * - 🌐 **접근성**: ARIA 속성, 스크린 리더 지원
 * - 📱 **반응형**: 모바일/데스크톱 대응
 * - 🎨 **다양한 변형**: complete, cancel, review 변형 지원
 *
 * @example
 * ```tsx
 * // 기본 사용법 (자동 ID 생성)
 * function MyComponent() {
 *   return (
 *     <Dialog.Root>
 *       <Dialog.Trigger>
 *         <button>설정 열기</button>
 *       </Dialog.Trigger>
 *
 *       <Dialog.Content variant="complete">
 *         <div>
 *           <h2>설정</h2>
 *           <SettingsForm />
 *           <DialogActions />
 *         </div>
 *       </Dialog.Content>
 *     </Dialog.Root>
 *   );
 * }
 *
 * // Dialog 내부에서 액션 사용
 * function DialogActions() {
 *   const { close } = useDialogActions();
 *
 *   return (
 *     <Dialog.Footer variant="complete">
 *       <button onClick={close}>확인</button>
 *     </Dialog.Footer>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // 취소/확인 Dialog
 * <Dialog.Root>
 *   <Dialog.Trigger>
 *     <button className="btn-danger">계정 삭제</button>
 *   </Dialog.Trigger>
 *
 *   <Dialog.Content variant="cancel">
 *     <div className="text-center">
 *       <h2>정말 계정을 삭제하시겠습니까?</h2>
 *       <p>이 작업은 되돌릴 수 없습니다.</p>
 *
 *       <Dialog.Footer variant="cancel">
 *         <CancelButton />
 *         <ConfirmButton />
 *       </Dialog.Footer>
 *     </div>
 *   </Dialog.Content>
 * </Dialog.Root>
 * ```
 *
 * @example
 * ```tsx
 * // 수동 ID 지정 (특수한 경우)
 * <Dialog.Root modalId="user-profile-dialog">
 *   <Dialog.Trigger>
 *     <Avatar onClick={() => {}} />
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
   * Dialog 시스템의 컨텍스트를 제공하고 modalId를 관리합니다.
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

/**
 * Dialog 액션 훅
 *
 * Dialog 내부에서 open/close 액션을 쉽게 사용할 수 있게 해주는 편의 훅입니다.
 * modalId를 자동으로 바인딩하여 수동 ID 관리의 번거로움을 제거합니다.
 *
 * **주요 장점:**
 * - 자동 modalId 바인딩으로 오타나 잘못된 ID 사용 방지
 * - 간결하고 직관적인 API
 * - TypeScript 완전 지원
 *
 * @see {@link useDialogActions}
 *
 * @example
 * ```tsx
 * function DialogContent() {
 *   const { close, open, modalId } = useDialogActions();
 *
 *   return (
 *     <div>
 *       <h2>제목</h2>
 *       <p>내용...</p>
 *       <button onClick={close}>닫기</button>
 *       <button onClick={open}>다시 열기</button>
 *       <span>Dialog ID: {modalId}</span>
 *     </div>
 *   );
 * }
 * ```
 */
export { useDialogActions };
