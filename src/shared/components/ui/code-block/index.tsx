'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/shared/libs/cn';

interface CodeBlockProps {
  /** 코드 내용 */
  children: string;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * 코드 블럭 컴포넌트
 *
 * Syntax highlighting은 없지만 코드 블럭 스타일링과 복사 기능을 제공합니다.
 * 사용자가 코드를 클립보드에 복사할 수 있으며, 복사 성공 시 2초간 상태 피드백을 제공합니다.
 *
 * @example
 * ```tsx
 * <CodeBlock>
 *   const greeting = "Hello, World!";
 *   console.log(greeting);
 * </CodeBlock>
 * ```
 */
export function CodeBlock({ children, className }: CodeBlockProps) {
  /** 복사 완료 상태 - 2초간 체크 아이콘과 "복사됨" 텍스트를 표시하기 위함 */
  const [copied, setCopied] = useState(false);

  /**
   * 복사 완료 후 상태 초기화를 위한 타이머 ID 참조
   * 빠른 연속 클릭 시 이전 타이머를 정리하고 메모리 누수를 방지함
   */
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * 클립보드에 코드 복사 및 사용자 피드백 처리
   *
   * 동작 순서:
   * 1. 기존 타이머가 있다면 정리 (중복 실행 방지)
   * 2. 네이티브 클립보드 API로 텍스트 복사
   * 3. 복사 성공 상태로 변경 (UI 피드백)
   * 4. 2초 후 상태 자동 초기화
   *
   * @description 클립보드 API 지원하지 않는 브라우저에서는 콘솔 에러 출력
   */
  const handleCopy = async () => {
    try {
      // 이전 타이머가 실행 중이면 정리하여 중복 실행 방지
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 브라우저 클립보드 API를 사용하여 코드 텍스트 복사
      await navigator.clipboard.writeText(children);
      setCopied(true);

      // 2초 후 복사 상태 초기화를 위한 타이머 설정
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null; // 타이머 참조 정리
      }, 2000);
    } catch (error) {
      // 클립보드 접근 실패 시 (권한 거부, API 미지원 등)
      console.error('복사 실패:', error);
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

  return (
    <div
      className={cn(
        'relative flex max-w-882 flex-1 flex-col rounded-2xl border bg-gray-900 p-20 text-2xl text-white',
        className,
      )}
    >
      {/* 복사 버튼 영역 - 우측 상단에 위치 */}
      <div className='flex justify-end'>
        <button
          onClick={handleCopy}
          className='flex text-white transition-colors hover:text-gray-300'
          aria-label={copied ? '코드가 복사되었습니다' : '코드 복사하기'}
        >
          {copied ? (
            // 복사 완료 상태 - 체크 아이콘과 피드백 텍스트
            <>
              <Check className='mr-4 h-16 w-16' />
              {/* 스크린 리더를 위한 숨김 텍스트 */}
              <span className='sr-only'>복사됨</span>
              <span>복사됨</span>
            </>
          ) : (
            // 기본 상태 - 복사 아이콘과 안내 텍스트
            <>
              <Copy className='mr-4 h-16 w-16' />
              {/* 스크린 리더를 위한 숨김 텍스트 */}
              <span className='sr-only'>복사</span>
              <span>복사</span>
            </>
          )}
        </button>
      </div>

      {/* 코드 내용 표시 영역 */}
      <pre className='overflow-x-auto p-4 leading-relaxed'>
        {/* 
          monospace 폰트와 whitespace-pre로 코드 형식 유지
          스크롤 가능한 컨테이너로 긴 코드 라인 처리
        */}
        <code className='font-mono whitespace-pre'>{children}</code>
      </pre>
    </div>
  );
}
