'use client';

import { useEffect, useRef, useState } from 'react';

import TriangleArrow from '@/shared/assets/icons/TriangleArrow';

interface ExpandableReviewProps {
  text: string;
}

/**
 * ExpandableReview 컴포넌트
 *
 * 긴 리뷰 내용을 처음에는 3줄로 줄여 보여주고,
 * 사용자가 TriangleArrow를 클릭하면 전체 내용을 펼쳐볼 수 있도록 하는 컴포넌트입니다.
 *
 * - 줄 수 기준 말줄임(`-webkit-line-clamp`) 사용
 * - 텍스트가 줄 수를 초과하는 경우에만 "더보기" 버튼이 표시됨
 * - 디바이스 크기 변경 시에도 오버플로우 여부 재확인
 */
export default function ExpandableReview({ text }: ExpandableReviewProps) {
  const [isExpanded, setIsExpanded] = useState(false); // 전체 보기 여부 상태
  const [showToggle, setShowToggle] = useState(false); // 더보기 (TriangleArrow) 버튼 표시 여부
  const contentRef = useRef<HTMLParagraphElement>(null); // 텍스트 DOM 참조

  /**
   * 실제 오버플로우 여부 판단 함수
   * - clamp 상태에서 scrollHeight가 offsetHeight보다 크면 말줄임 발생
   */
  const checkOverflow = () => {
    const el = contentRef.current;
    if (!el) return;
    const isOverflowing = el.scrollHeight > el.offsetHeight;
    setShowToggle(isOverflowing);
  };

  /**
   * 컴포넌트 마운트 시와 텍스트가 변경될 때 overflow 체크
   * - DOM 렌더링 완료 후 체크하기 위해 requestAnimationFrame 사용
   */
  useEffect(() => {
    requestAnimationFrame(() => {
      checkOverflow();
    });
  }, [text]);

  /**
   * 윈도우 리사이즈 시에도 오버플로우 상태 재확인
   * - 디바이스 크기에 따라 텍스트 줄 수가 달라질 수 있기 때문
   */
  useEffect(() => {
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  return (
    <div className='relative w-full'>
      {/* 리뷰 본문 텍스트 */}
      <p
        ref={contentRef}
        className={`font-size-16 line-height-1.5 transition-height font-medium break-words whitespace-pre-line text-gray-950 duration-500 ease-in-out ${
          isExpanded ? 'clamp-none' : 'clamp-multiline'
        }`}
      >
        {text}
      </p>

      {/* 더보기 / 접기 버튼 */}
      {showToggle && (
        <div className='text-center'>
          <button
            type='button'
            onClick={() => setIsExpanded((prev) => !prev)}
            className='font-size-12 mt-10 cursor-pointer text-gray-800 underline'
          >
            {isExpanded ? (
              <TriangleArrow
                className='text-gray-300 hover:text-gray-950'
                direction='top'
              />
            ) : (
              <TriangleArrow
                className='text-gray-300 hover:text-gray-950'
                direction='bottom'
              />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
