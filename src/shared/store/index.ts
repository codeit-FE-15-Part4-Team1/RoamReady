import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { ToastSlice } from '../slices/toastSlice';
import { createToastSlice } from '../slices/toastSlice';
import type { UserSlice } from '../slices/userSlice';
import { createUserSlice } from '../slices/userSlice';

/**
 * 모든 Slice들을 통합한 전체 상태 타입
 * 이 타입을 통해 스토어의 모든 상태와 액션에 접근할 수 있습니다.
 */
export type BoundState = ToastSlice & UserSlice;

/**
 * @description
 * 애플리케이션의 전역 상태 관리를 위한 메인 Zustand 스토어입니다.
 *
 * @feature
 * - **Slice Pattern**: 상태와 액션을 기능 단위(slice)로 분리하여 관리합니다.
 * - **Persistence**: `zustand/middleware`의 `persist`를 사용하여 스토어 상태를 `localStorage`에 자동으로 저장하고 복원합니다.
 * 이를 통해 사용자가 페이지를 새로고침해도 특정 상태가 유지됩니다.
 *
 * @property {string} name - `localStorage`에 저장될 때 사용되는 키 이름입니다.
 * @property {function} partialize - `localStorage`에 저장할 상태를 선택합니다.
 */
export const useRoamReadyStore = create<BoundState>()(
  persist(
    (...args) => ({
      ...createUserSlice(...args),
      ...createToastSlice(...args),
    }),
    {
      name: 'RoamReady-storage',
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
