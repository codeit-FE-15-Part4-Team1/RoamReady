'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

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
 */
export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('복사 실패:', error);
    }
  };

  return (
    <div
      className={cn(
        'relative flex max-w-882 flex-1 flex-col rounded-2xl border bg-gray-900 p-20 text-2xl text-white',
        className,
      )}
    >
      <div className='flex justify-end'>
        <button
          onClick={handleCopy}
          className='flex text-white transition-colors hover:text-gray-300'
        >
          {copied ? (
            <>
              <Check className='mr-4 h-16 w-16' />
              <span className='sr-only'>복사됨</span>

              <span>복사됨</span>
            </>
          ) : (
            <>
              <Copy className='mr-4 h-16 w-16' />
              <span className='sr-only'>복사</span>
              <span>복사</span>
            </>
          )}
        </button>
      </div>

      {/* 코드 내용 */}
      <pre className='overflow-x-auto p-4 leading-relaxed'>
        <code className='font-mono whitespace-pre'>{children}</code>
      </pre>
    </div>
  );
}
