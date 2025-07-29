import type { StateCreator } from 'zustand';

/**
 * @description 하나의 토스트 알림 정보를 나타내는 상태 인터페이스입니다.
 *
 * - id: 각 토스트를 구분하기 위한 고유 ID
 * - message: 사용자에게 표시할 텍스트 메시지
 * - type: 토스트의 유형 ('success' | 'error' | 'info' | 'warning')
 * - duration: 토스트가 화면에 표시될 시간 (밀리초 단위)
 */
export interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration: number;
}

/**
 * @description 토스트 상태 배열과 토스트를 추가/제거하는 메서드를 포함한 상태 인터페이스입니다.
 *
 * - toasts: 현재 표시 중인 토스트 목록
 * - addToast: 새 토스트를 추가하는 메서드 (기본 type: 'info', 기본 duration: 구현에 따라)
 * - removeToast: ID를 기준으로 특정 토스트를 제거하는 메서드
 */
export interface ToastSlice {
  toasts: ToastState[];
  addToast: (
    toast: Omit<ToastState, 'id' | 'duration'> & { duration?: number },
  ) => void;
  removeToast: (id: string) => void;
}

/**
 * @description 토스트 시스템의 중앙 관제실 역할을 하는 Zustand 슬라이스를 생성합니다.
 *
 * 이 슬라이스는 토스트와 관련된 모든 전역 상태와 로직을 관리하며,
 * UI는 이 스토어에 명령만 내리면 되므로 코드 구조가 단순하고 명확해집니다.
 *
 *  ### 주요 역할
 * 1.  **데이터 중앙 보관 (The Data Store)**
 * - `toasts` 배열은 현재 화면에 표시되어야 할 모든 토스트의 목록을 보관하는 전역 상태(Single Source of Truth)입니다.
 *
 * 2.  **상태 변경 규칙 관리 (The Rule Manager)**
 *    - `addToast(message, type, duration?)`:
 *      - 새로운 토스트를 추가합니다.
 *      - `type`의 기본값은 `'info'`, `duration`의 기본값은 `3000ms`입니다.
 *      - 내부적으로 `crypto.randomUUID()`를 통해 고유한 ID를 생성하며,
 *        ID 충돌 없이 일관된 데이터 구조를 유지합니다.
 *
 *    - `removeToast(id)`:
 *      - 특정 토스트 ID를 기준으로 해당 토스트를 상태에서 제거합니다.
 *
 * 3.  **생명주기 자동 관리 (The Lifecycle Manager)**
 * - `addToast`가 호출되면, 지정된 `duration` 후에 스스로 `removeToast`를 호출하는
 * 타이머(`setTimeout`)를 설정합니다.
 * 이를 통해 토스트의 생성부터 소멸까지의 전체 생명주기를 자동으로 관리합니다.
 *
 * @param {object} toast - 추가할 토스트의 정보를 담은 객체.
 * @param {string} toast.message - 사용자에게 표시될 메시지.
 * @param {('success'|'error'|'info'|'warning')} [toast.type='info'] - 토스트의 유형.
 * @param {number} [toast.duration=3000] - 토스트가 표시될 시간 (ms).
 *
 * @returns {ToastSlice} Zustand용 ToastSlice 객체.
 *
 */
export const createToastSlice: StateCreator<ToastSlice, [], [], ToastSlice> = (
  set,
  get,
) => ({
  toasts: [],
  addToast: ({ message, type = 'info', duration = 3000 }) => {
    const id = crypto.randomUUID();
    const newToast: ToastState = { id, message, type, duration };
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    setTimeout(() => {
      get().removeToast(id);
    }, duration);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
});
