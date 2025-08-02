import { useEffect, useRef, useState } from 'react';

import { useToast } from '@/shared/hooks/useToast';

/**
 * 클립보드 복사 기능을 제공하는 커스텀 훅
 *
 * 사용자는 이 훅을 통해 텍스트를 클립보드에 복사하고,
 * 복사 성공 여부에 따른 UI 피드백을 처리할 수 있습니다.
 *
 * @param duration 복사 상태 유지 시간 (기본값: 2000ms)
 * @returns 복사 상태 (`copied`)와 복사 실행 함수 (`copy`)
 *
 * @example
 * const { copied, copy } = useClipboard();
 * <button onClick={() => copy('복사할 텍스트')}>복사</button>
 * {copied && <span>복사됨!</span>}
 */
export function useClipboard(duration: number = 2000) {
  /** 복사 완료 상태 - 지정된 시간동안 true로 유지 */
  const [copied, setCopied] = useState(false);

  const { showError, showSuccess } = useToast();

  /**
   * 복사 완료 후 상태 초기화를 위한 타이머 ID 참조
   * 빠른 연속 클릭 시 이전 타이머를 정리하고 메모리 누수를 방지함
   */
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * 클립보드에 텍스트 복사 및 사용자 피드백 처리
   *
   * 동작 순서:
   * 1. 기존 타이머가 있다면 정리 (중복 실행 방지)
   * 2. 네이티브 클립보드 API로 텍스트 복사
   * 3. 복사 성공 상태로 변경 (UI 피드백)
   * 4. 지정 시간 후 상태 자동 초기화
   *
   * @description 클립보드 API 지원하지 않는 브라우저에서는 콘솔 에러 출력
   */
  const copy = async (text: string) => {
    try {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      await navigator.clipboard.writeText(text);
      setCopied(true);
      showSuccess('복사되었습니다!');

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null; // 타이머 참조 정리
      }, duration);
    } catch (error) {
      // 클립보드 접근 실패 시 (권한 거부, API 미지원 등)
      console.error('복사 실패:', error);
      showError('복사에 실패했습니다.');
    }
  };

  /**
   * 컴포넌트 정리 시 실행 중인 타이머 정리
   * 메모리 누수 방지 및 언마운트 후 상태 변경 시도 방지
   */
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { copied, copy };
}
