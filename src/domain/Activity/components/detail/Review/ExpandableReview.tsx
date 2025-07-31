'use client';

import { useEffect, useRef, useState } from 'react';

interface ExpandableReviewProps {
  text: string;
  clampLines?: number;
}

export default function ExpandableReview({
  text,
  clampLines = 5,
}: ExpandableReviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const el = contentRef.current;
      const fullHeight = el.scrollHeight;

      // 임시로 clamp 해제해서 전체 높이 계산
      el.classList.remove(`line-clamp-${clampLines}`);
      const unclampedHeight = el.scrollHeight;
      el.classList.add(`line-clamp-${clampLines}`);

      // clamp 적용 후 높이와 비교
      if (unclampedHeight > fullHeight) {
        setShowToggle(true);
      }
    }
  }, [text.length, clampLines]);

  return (
    <div className='relative w-full'>
      <p
        ref={contentRef}
        className={`font-size-16 line-height-1.5 font-medium whitespace-pre-wrap text-gray-950 transition-all duration-300 ${
          isExpanded ? '' : `line-clamp-${clampLines}`
        }`}
      >
        {text}
      </p>

      {showToggle && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className='mt-2 block text-sm text-blue-500 hover:underline'
        >
          {isExpanded ? '접기 ▲' : '더보기 ▼'}
        </button>
      )}
    </div>
  );
}
