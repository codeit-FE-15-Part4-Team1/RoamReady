import { useEffect, useRef } from 'react';

/**
 * @function useScrollLock
 * @description
 * `Dialog`, `BottomSheet` 등의 컴포넌트 활성화 여부에 따라 `document.body` 스크롤을 잠그고 해제하는 커스텀 훅입니다.
 * 스크롤바가 사라질 때 발생하는 레이아웃 점프 현상을 방지합니다.
 *
 * @param isActive - 스크롤 잠금 활성화 여부 (boolean)
 */
export function useScrollLock(isActive: boolean) {
  // 원래 body의 overflow 및 paddingRight 스타일을 저장하기 위한 useRef
  // 컴포넌트 언마운트 또는 isActive 변경 시 원래 스타일을 복원하는 데 사용됩니다.
  const originalBodyOverflowRef = useRef<string | undefined>(undefined);
  const originalBodyPaddingRightRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    // SSR 환경에서는 `window`나 `document` 객체를 참조할 수 없으므로,
    // 클라이언트 환경에서만 DOM 조작을 수행하도록 확인합니다.
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // `body`와 `documentElement`를 `document`로부터 구조분해 할당
    const { body, documentElement } = document;

    if (isActive) {
      // 1. 현재 `body`의 `overflow` 및 `paddingRight` 스타일을 저장합니다. (클린업 시 복원 목적)
      originalBodyOverflowRef.current = body.style.overflow;
      originalBodyPaddingRightRef.current = body.style.paddingRight;

      // 2. 스크롤바의 `width`를 계산합니다.
      // `viewport width`에서 `document`의 `width`를 빼면 스크롤바 `width`를 알 수 있습니다.
      const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

      // 3. body 스크롤을 비활성화합니다.
      body.style.overflow = 'hidden';

      // 4. 스크롤바 점프 현상을 방지하기 위해 `padding-right`를 추가합니다. 스크롤바가 실제로 존재할 경우에만 패딩을 적용합니다.
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      // `isActive`가 `false`가 되었을 때 또는 이펙트가 재실행될 때 (클린업 직후), 이전에 저장했던 원래 스타일로 복원합니다.
      if (originalBodyOverflowRef.current !== undefined) {
        body.style.overflow = originalBodyOverflowRef.current;
      }
      if (originalBodyPaddingRightRef.current !== undefined) {
        body.style.paddingRight = originalBodyPaddingRightRef.current;
      }
    }

    // 클린업 함수:
    // - 컴포넌트가 언마운트될 때 호출됩니다.
    // - `isActive` 값이 변경되어 이펙트가 다시 실행되기 전에 (이전 이펙트가 정리될 때) 호출됩니다.
    // 이 함수를 통해 항상 원래 스타일이 복원되도록 보장합니다.
    return () => {
      if (typeof document !== 'undefined') {
        if (originalBodyOverflowRef.current !== undefined) {
          body.style.overflow = originalBodyOverflowRef.current;
        }
        if (originalBodyPaddingRightRef.current !== undefined) {
          body.style.paddingRight = originalBodyPaddingRightRef.current;
        }
      }
    };
  }, [isActive]); // `isActive` 상태가 변경될 때마다 이 이펙트를 다시 실행합니다.
}
