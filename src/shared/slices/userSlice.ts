import type { StateCreator } from 'zustand';

import type { User } from '@/domain/Auth/schemas/response';

/**
 * @description 사용자 상태와 사용자 정보를 변경하는 메서드를 포함한 상태 인터페이스입니다.
 *
 * - user: 현재 로그인된 사용자 정보 (로그아웃 상태일 경우 null)
 * - setUser: 로그인 성공 시 사용자 정보를 스토어에 저장하는 메서드
 * - clearUser: 로그아웃 시 사용자 정보를 스토어에서 제거하는 메서드
 *
 * @see /src/domain/Auth/schemas/response - User type
 */
export interface UserSlice {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

/**
 * @description 사용자 정보(User)를 관리하는 Zustand 슬라이스를 생성합니다.
 *
 * 이 슬라이스는 애플리케이션의 인증된 사용자 상태를 중앙에서 관리합니다.
 *
 * ### 주요 역할
 * 1.  **사용자 데이터 보관 (The User Data Store)**
 * - `user` 상태는 현재 로그인된 사용자의 정보를 담는 전역 상태(Single Source of Truth)입니다.
 * - 로그인하지 않은 상태는 `null`로 표현하여 명확하게 구분합니다.
 *
 * 2.  **상태 변경 규칙 관리 (The Rule Manager)**
 * - `setUser(user)`: 로그인 또는 회원가입 성공 시, API로부터 받은 사용자 객체를 받아 스토어의 `user` 상태를 업데이트합니다.
 * - `clearUser()`: 사용자가 로그아웃할 때 호출되며, `user` 상태를 `null`로 초기화하여 로그인되지 않은 상태로 만듭니다.
 *
 * @returns {UserSlice} Zustand용 UserSlice 객체.
 */
export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
});
