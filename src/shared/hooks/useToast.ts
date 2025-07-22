import { useRoamReadyStore } from '../store';

/**
 * @description
 * Zustand 스토어와 연결된 토스트 알림을 쉽게 제어하기 위한 커스텀 훅입니다.
 *
 * @feature
 * - `useRoamReadyStore`의 `addToast`, `removeToast` 액션을 감싸는 편리한 인터페이스를 제공합니다.
 * - `showSuccess`, `showError` 등 목적에 맞는 명확한 이름의 함수를 통해 토스트를 간편하게 호출할 수 있습니다.
 *
 * @returns {object} 토스트 제어 함수 객체
 * @property {function(string): void} removeToast - ID를 이용해 특정 토스트를 제거합니다.
 * @property {function(string, number=): void} showSuccess - 성공 토스트를 표시합니다.
 * @property {function(string, number=): void} showError - 에러 토스트를 표시합니다.
 * @property {function(string, number=): void} showInfo - 정보 토스트를 표시합니다.
 * @property {function(string, number=): void} showWarning - 경고 토스트를 표시합니다.
 *
 * @example
 * ```tsx
 * const { showError } = useToast();
 *
 * const handleSubmit = () => {
 * if (!isValid) {
 * showError('입력 값이 올바르지 않습니다.');
 * }
 * };
 * ```
 */
export const useToast = () => {
  const { addToast, removeToast } = useRoamReadyStore();

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    duration?: number,
  ) => {
    addToast({ message, type, duration });
  };

  const showSuccess = (message: string, duration?: number) =>
    showToast(message, 'success', duration);
  const showError = (message: string, duration?: number) =>
    showToast(message, 'error', duration);
  const showInfo = (message: string, duration?: number) =>
    showToast(message, 'info', duration);
  const showWarning = (message: string, duration?: number) =>
    showToast(message, 'warning', duration);

  return { removeToast, showSuccess, showError, showInfo, showWarning };
};
